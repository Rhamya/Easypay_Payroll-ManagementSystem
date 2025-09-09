import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPayrollById, updatePayroll } from "../../service/payrollService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import salary from "../../assets/salary.png";
import PayrollManagement from './PayrollManagement';
import Dashboard from './Dashboard';

// 🔹 Labels mapping
const labels = {
  payrollId: "PAYROLL ID",
  employeeId: "EMPLOYEE ID",
  employeeName: "EMPLOYEE NAME",
  managerId: "MANAGER ID",
  month: "MONTH",
  year: "YEAR",
  updatedAt: "LAST UPDATED",
  ctc: "CTC",
  basic: "BASIC SALARY",
  da: "DEARNESS ALLOWANCE",
  hra: "HRA",
  pf: "PF",
  otherAllowances: "OTHER ALLOWANCES",
  otherDeductions: "OTHER DEDUCTIONS",
  gross: "GROSS SALARY",
  tax: "TAX",
  net: "NET SALARY",
  paymentStatus: "PAYMENT STATUS",
};

// 🔹 Function to recalculate payroll
const recalculatePayroll = (data) => {
  const ctcAnnual = Number(data.ctc) || 0;
  const ctcMonthly = ctcAnnual / 12;

  const basic = ctcMonthly * 0.5;
  const hra = basic * 0.5;
  const da = basic * 0.1;
  const pf = basic * 0.12;
  const otherAllowances = ctcMonthly - (basic + hra + da); // PF not included

  const gross = basic + hra + da + otherAllowances;
  const annualTax = ctcAnnual > 500000 ? (ctcAnnual - 500000) * 0.05 : 0;
  const tax = annualTax / 12;
  const otherDed = Number(data.otherDeductions) || 0;
  const net = gross - pf - tax - otherDed;

  return { basic, hra, da, pf, otherAllowances, gross, tax, net };
};

const ViewPayroll = () => {
  const { payrollId } = useParams();
  const navigate = useNavigate();
  const [payroll, setPayroll] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [updatedAt, setUpdatedAt] = useState(null);
  const [view, setView] = useState("list");

  // Fetch payroll on mount
  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const response = await getPayrollById(payrollId);
        const data = response.data || response;
        const recalculated = recalculatePayroll(data);
        const mergedData = { ...data, ...recalculated };
        setPayroll(mergedData);
        setFormData(mergedData);
        setUpdatedAt(data?.updatedAt || data?.paymentDate);
      } catch (err) {
        console.error("Failed to fetch payroll:", err);
      }
    };
    fetchPayroll();
  }, [payrollId]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;

    let updated = { ...formData, [id]: value };

    // Recalculate numeric fields
    if (id === "ctc" || id === "otherDeductions") {
      const numericData = {
        ...updated,
        ctc: Number(updated.ctc) || 0,
        otherDeductions: Number(updated.otherDeductions) || 0,
      };
      const recalculated = recalculatePayroll(numericData);
      updated = { ...updated, ...recalculated };
    }

    setFormData(updated);
  };

  // Save changes
  const handleSave = async () => {
    try {
      // Send editable fields including managerId
      const payload = {
        ctc: Number(formData.ctc) || 0,
        otherDeductions: Number(formData.otherDeductions) || 0,
        paymentStatus: formData.paymentStatus || "Pending",
        managerId: Number(formData.managerId) || null,
      };

      const response = await updatePayroll(payrollId, payload);

      // Merge backend-calculated values
      const updatedData = {
        ...formData,
        ...response,
        updatedAt: new Date().toISOString(),
      };

      setPayroll(updatedData);
      setFormData(updatedData);
      setEditMode(false);
      alert("✅ Payroll updated successfully!");
    } catch (err) {
      console.error("Failed to update payroll:", err);
      alert("❌ Failed to save changes.");
    }
  };

  // Download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Payroll Details", 14, 20);

    const tableData = Object.entries(formData).map(([key, value]) => [
      labels[key] || key,
      value != null
        ? typeof value === "number"
          ? value.toFixed(2)
          : value.toString()
        : "-",
    ]);

    autoTable(doc, {
      head: [["Field", "Value"]],
      body: tableData,
      startY: 30,
    });

    doc.save(`Payroll_${payrollId}.pdf`);
  };

  // Check if any changes were made
  const isModified = useMemo(() => JSON.stringify(payroll) !== JSON.stringify(formData), [payroll, formData]);

  if (!payroll) return <p className="text-center mt-5">Loading payroll details...</p>;

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm p-3">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img src={salary} alt="Payroll Logo" style={{ width: "32px", height: "32px" }} className="me-2" />
            <span className="navbar-brand fw-bold text-white">Easypay</span>
          </div>
          <button className="btn btn-outline-light" onClick={() => navigate("/")}>Logout</button>
        </div>
      </nav>

      <button
        className="btn btn-secondary rounded-pill position-absolute"
        style={{ top: "100px", right: "40px", width: "100px" }}
        onClick={() => setView("list")}
      >
        Back
      </button>

      {/* Main Content */}
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold text-center flex-grow-1">Payroll Details</h3>
          <div style={{ width: "80px" }}></div>
        </div>

        <div className="card shadow-sm rounded-3 p-4 mx-auto" style={{ maxWidth: "1000px" }}>
          {/* Column 1: Employee Info */}
          <div className="row mb-4">
            {["payrollId", "employeeId", "employeeName", "managerId", "month", "year", "updatedAt"].map((key) => (
              <div className="col-md-4 mb-3" key={key}>
                <label className="fw-bold">{labels[key]}</label>
                {editMode && key === "managerId" ? (
                  <input
                    id="managerId"
                    type="number"
                    value={formData.managerId ?? ""}
                    onChange={handleChange}
                    className="form-control rounded-pill mt-1"
                  />
                ) : (
                  <p className="mt-1 text-muted">
                    {key === "updatedAt" && updatedAt
                      ? new Date(updatedAt).toLocaleString()
                      : formData[key] != null ? formData[key].toString() : "-"}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Column 2: Salary Details */}
          <h5 className="fw-bold mb-3">Salary Components</h5>
          <div className="row mb-4">
            {["ctc", "basic", "da", "hra", "pf", "otherAllowances", "otherDeductions", "gross", "tax", "net"].map((key) => (
              <div className="col-md-4 mb-3" key={key}>
                <label className="fw-bold">{labels[key]}</label>
                {editMode && (key === "ctc" || key === "otherDeductions") ? (
                  <input
                    id={key}
                    type="number"
                    value={formData[key] ?? ""}
                    onChange={handleChange}
                    className="form-control rounded-pill mt-1"
                  />
                ) : (
                  <p className="mt-1 text-muted">
                    {formData[key] != null
                      ? typeof formData[key] === "number"
                        ? formData[key].toFixed(2)
                        : formData[key]
                      : "-"}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Column 3: Payment Status */}
          <h5 className="fw-bold mb-3">Payment Status</h5>
          <div className="row mb-4">
            <div className="col-md-4">
              <label className="fw-bold">{labels.paymentStatus}</label>
              {editMode ? (
                <select
                  id="paymentStatus"
                  value={formData.paymentStatus || "Pending"}
                  onChange={handleChange}
                  className="form-control rounded-pill mt-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              ) : (
                <p className="mt-1 text-muted">{formData.paymentStatus || "-"}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 text-center">
            {editMode ? (
              <>
                <button
                  className="btn btn-success rounded-pill me-3 px-4"
                  onClick={handleSave}
                  disabled={!isModified}
                >
                  💾 Save
                </button>
                <button
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => { setFormData(payroll); setEditMode(false); }}
                >
                  ✖ Cancel
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-primary rounded-pill me-3 px-4" onClick={() => setEditMode(true)}>✏️ Edit</button>
                <button className="btn btn-danger rounded-pill px-4" onClick={handleDownloadPDF}>⬇ Download PDF</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPayroll;
