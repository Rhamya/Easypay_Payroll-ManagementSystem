import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPayroll, getAllPayrolls, deletePayroll } from "../../service/payrollService";
import salary from "../../assets/salary.png";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dashboardBg from "../../assets/login.png"; 

const PayrollManagement = () => {
  const [view, setView] = useState("list");
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
  empId: "",
  name: "",
  month: "",
  year: "",
  ctc: "",
  managerId: "",   // <-- Added managerId
  otherDeductions: 0,
  otherAllowances: 0,
  basic: 0,
  hra: 0,
  da: 0,
  pf: 0,
  gross: 0,
  tax: 0,
  net: 0,
  status: "Pending",
  managerId: "",
});

  const navigate = useNavigate();

  // Load payrolls on mount
  useEffect(() => {
    loadPayrolls();
  }, []);

  // Recalculate salary components whenever CTC or deductions change
  useEffect(() => {
    const ctcAnnual = Number(formData.ctc) || 0;
    const ctcMonthly = ctcAnnual / 12;

    const basic = ctcMonthly * 0.5;
    const hra = basic * 0.5;
    const da = basic * 0.1;
    const pf = basic * 0.12;

    const otherAllowances = ctcMonthly - (basic + hra + da + pf);
    const gross = basic + hra + da + otherAllowances;

    const annualTax = calculateIncomeTax(ctcAnnual);
    const tax = annualTax / 12;

    const otherDed = Number(formData.otherDeductions) || 0;
    const net = gross - pf - tax - otherDed;

    setFormData((prev) => ({
      ...prev,
      basic,
      hra,
      da,
      pf,
      gross,
      tax,
      net,
      otherAllowances,
    }));
  }, [formData.ctc, formData.otherDeductions]);

  const calculateIncomeTax = (ctc) => {
    let tax = 0;
    if (ctc <= 400000) tax = 0;
    else if (ctc <= 800000) tax = (ctc - 400000) * 0.05;
    else if (ctc <= 1200000) tax = 20000 + (ctc - 800000) * 0.1;
    else if (ctc <= 1600000) tax = 60000 + (ctc - 1200000) * 0.15;
    else if (ctc <= 2000000) tax = 120000 + (ctc - 1600000) * 0.2;
    else if (ctc <= 2400000) tax = 200000 + (ctc - 2000000) * 0.25;
    else tax = 300000 + (ctc - 2400000) * 0.3;
    return tax;
  };

  const loadPayrolls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllPayrolls();
      console.log(response.data); 
      setPayrolls(response.data);
    } catch (err) {
      setError("Failed to fetch payrolls.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payroll?")) return;
    setLoading(true);
    try {
      await deletePayroll(id);
      setPayrolls(payrolls.filter((p) => p.payrollId !== id));
    } catch {
      setError("Failed to delete payroll.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Validations ---
    if (!formData.empId) { alert("Employee ID is required"); return; }
    if (!formData.name.trim()) { alert("Employee name is required"); return; }
    if (!formData.ctc) { alert("CTC is required"); return; }
    if (!formData.month) { alert("Month is required"); return; }
    if (!formData.year) { alert("Year is required"); return; }

    // Prevent future month/year
    const today = new Date();
    const selectedDate = new Date(formData.year, new Date(`${formData.month} 1`).getMonth());
    if (selectedDate > today) {
      alert("Cannot create payroll for future month/year");
      return;
    }

    // Check duplicate payroll
    const duplicate = payrolls.find(
      (p) =>
        p.empId === Number(formData.empId) &&
        p.month === formData.month &&
        p.year === Number(formData.year)
    );
    if (duplicate) {
      alert("Payroll for this employee for the selected month already exists");
      return;
    }

    // --- Create payroll ---
    setLoading(true);
    setError(null);
    try {
      const managerId = 123; // Replace with logged-in manager ID
     const payload = {
  employeeId: Number(formData.empId),
  employeeName: formData.name,
  month: formData.month,
  year: Number(formData.year),
  ctc: Number(formData.ctc),
  grossSalary: Number(formData.gross.toFixed(2)),
  netSalary: Number(formData.net.toFixed(2)),
  otherDeductions: Number(formData.otherDeductions),
  paymentStatus: formData.status.toUpperCase(),
  paymentDate: new Date().toISOString(),
  managerId: Number(formData.managerId),  // <-- Send editable managerId
};
      await createPayroll(payload);
      alert("Payroll created successfully!");
      resetForm();
      setView("list");
      loadPayrolls();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save payroll.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      empId: "",
      name: "",
      month: "",
      year: "",
      ctc: "",
      otherDeductions: 0,
      otherAllowances: 0,
      basic: 0,
      hra: 0,
      da: 0,
      pf: 0,
      gross: 0,
      tax: 0,
      net: 0,
      status: "Pending",
    });
  };

  const handleView = (id) => {
    navigate(`/ViewPayroll/${id}`);
  };

  const handleExportExcel = () => {
    if (!payrolls || payrolls.length === 0) {
      alert("No payroll data to export!");
      return;
    }

    const dataForExcel = payrolls.map((p) => ({
      "Payroll ID": p.payrollId,
      "Employee ID": p.empId,
      "Employee Name": p.name,
      "Month": p.month,
      "Year": p.year,
      "CTC": p.ctc?.toFixed(2),
      "Basic": p.basic?.toFixed(2),
      "HRA": p.hra?.toFixed(2),
      "DA": p.da?.toFixed(2),
      "PF": p.pf?.toFixed(2),
      "Other Allowances": p.otherAllowances?.toFixed(2),
      "Other Deductions": p.otherDeductions?.toFixed(2),
      "Gross Salary": p.grossSalary?.toFixed(2),
      "Tax": p.tax?.toFixed(2),
      "Net Salary": p.netSalary?.toFixed(2),
      "Payment Status": p.paymentStatus,
      "Payment Date": p.paymentDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payrolls");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Payrolls_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-2">
            <button
              className="btn btn-success rounded-pill px-4"
              onClick={() => { setView("add"); resetForm(); }}
            >
              Add Payroll
            </button>
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={handleExportExcel}
            >
              Download Excel
            </button>
          </div>
        </div>

        {loading && <div className="alert alert-info">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* List View */}
        {view === "list" && (
          <div className="card shadow-sm rounded-3 p-4 mx-auto" style={{ maxWidth: "1500px" }}>
            <div className="table-responsive">
              <table className="table table-striped table-hover text-center">
                <thead className="table">
                  <tr>
                    <th>ID</th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>CTC</th>
                    <th>Gross</th>
                    <th>Net</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.map((p) => (
                    <tr key={p.payrollId}>
                      <td>{p.payrollId}</td>
                      <td>{p.empId}</td>
                      <td>{p.name}</td>
                      <td>{p.month}</td>
                      <td>{p.year}</td>
                      <td>₹{p.ctc?.toFixed(2)}</td>
                      <td>₹{p.grossSalary?.toFixed(2)}</td>
                      <td>₹{p.netSalary?.toFixed(2)}</td>
                      <td>{p.paymentStatus}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-1" onClick={() => handleView(p.payrollId)}>View</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.payrollId)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Payroll Form */}
        {view === "add" && (
          <div className="card shadow-sm rounded-3 p-4 mx-auto" style={{ maxWidth: "900px" }}>
            <h3 className="fs-5 fw-bold mb-3 text-center">Add New Payroll</h3>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="empId" className="form-label">Employee ID</label>
                  <input type="number" className="form-control rounded-pill" id="empId" value={formData.empId} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Employee Name</label>
                  <input type="text" className="form-control rounded-pill" id="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
  <label htmlFor="managerId" className="form-label">Manager ID</label>
  <input 
    type="number" 
    className="form-control rounded-pill" 
    id="managerId" 
    value={formData.managerId} 
    onChange={handleInputChange} 
    required 
  />
</div>
                <div className="col-md-3">
                  <label htmlFor="month" className="form-label">Month</label>
                  <select id="month" className="form-select rounded-pill" value={formData.month} onChange={handleInputChange} required>
                    <option value="">Select</option>
                    {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="year" className="form-label">Year</label>
                  <input type="number" className="form-control rounded-pill" id="year" value={formData.year} onChange={handleInputChange} required />
                </div>
                <div className="col-md-3">
                  <label htmlFor="ctc" className="form-label">CTC</label>
                  <input type="number" className="form-control rounded-pill" id="ctc" value={formData.ctc} onChange={handleInputChange} required />
                </div>
                <div className="col-md-3">
                  <label htmlFor="otherDeductions" className="form-label">Other Deductions</label>
                  <input type="number" className="form-control rounded-pill" id="otherDeductions" value={formData.otherDeductions} onChange={handleInputChange} />
                </div>

                {/* Calculated Fields */}
                {["basic","hra","da","pf","gross","tax","net"].map(field => (
                  <div className="col-md-3" key={field}>
                    <label className="form-label">{field.toUpperCase()}</label>
                    <input type="number" className="form-control rounded-pill" value={formData[field].toFixed(2)} readOnly />
                  </div>
                ))}

                <div className="col-md-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select id="status" className="form-select rounded-pill" value={formData.status} onChange={handleInputChange}>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Processed">Processed</option>
                  </select>
                </div>

                <div className="col-12 mt-4 text-center">
                  <button type="submit" className="btn btn-success rounded-pill px-4">Save Payroll</button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollManagement;
