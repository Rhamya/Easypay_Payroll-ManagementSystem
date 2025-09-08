import React, { useEffect, useState } from "react";
import { getPayrollsByManager, deletePayroll } from "../../service/managerService";
import bgImage from "../../assets/login.png";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../../Home.css";


const PayrollAccess = ({ goToDashboard }) => {
  const [payrollData, setPayrollData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPayrolls();
  }, []);

  const loadPayrolls = async () => {
    setLoading(true);
    setError(null);
    try {
      const managerId = localStorage.getItem("userId");
      const response = await getPayrollsByManager(managerId);
      setPayrollData(response.data || []);
      setFilteredData(response.data || []);
    } catch (err) {
      setError("Failed to fetch payroll data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (payrollId) => {
    if (!window.confirm("Are you sure you want to delete this payroll?")) return;
    try {
      await deletePayroll(payrollId);
      loadPayrolls();
    } catch (err) {
      setError("Failed to delete payroll.");
      console.error(err);
    }
  };

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = payrollData.filter(
      (p) =>
        (p.empId && p.empId.toString().toLowerCase().includes(term)) ||
        (p.managerId && p.managerId.toString().toLowerCase().includes(term)) ||
        (p.ctc && p.ctc.toString().toLowerCase().includes(term)) ||
        (p.paymentStatus && p.paymentStatus.toLowerCase().includes(term)) ||
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.month && p.month.toLowerCase().includes(term))
    );
    setFilteredData(filtered);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredData(payrollData);
  };

  const downloadExcel = () => {
  const ws = XLSX.utils.json_to_sheet(payrollData.map(p => ({
    "Payroll ID": p.payrollId,
    "Employee ID": p.empId,
    "Manager ID": p.managerId,
    "Name": p.name,
    "Month": p.month,
    "Year": p.year,
    "CTC": p.ctc,
    "Basic Pay": p.basicPay,
    "Allowances": p.allowances,
    "Deductions": p.deductions,
    "Gross Pay": p.grossSalary,
    "Net Pay": p.netSalary,
    "Status": p.paymentStatus
  })));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Payrolls");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "AllPayrollData.xlsx");
};


  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="text-secondary mt-2">Loading...</p>
      </div>
    );

  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div
      className="p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        minHeight: "100vh"
      }}
    >
      <h5 className="text-light mb-3">Manage payroll records for your employees.</h5>

      {/* Search & Download */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className="d-flex gap-2">
          <input
  type="text"
  className="form-control form-control-sm rounded-pill search-input"
  placeholder="Search by Employee ID, Manager ID, CTC, Status, Month"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>


          <button className="btn btn-sm btn-primary rounded-pill" onClick={handleSearch}>
            Search
          </button>
          <button className="btn btn-sm btn-secondary rounded-pill" onClick={handleResetSearch}>
            Reset
          </button>
        </div>
        <button className="btn btn-sm btn-success rounded-pill" onClick={downloadExcel}>
          Download Excel
        </button>
      </div>

      {/* Payroll Table */}
      <div className="table-responsive card shadow-sm rounded-3 p-3">
        <table className="table table-striped table-hover align-middle" style={{ minWidth: "900px" }}>
          <thead>
            <tr>
              <th>Payroll ID</th>
              <th>Employee ID</th>
              <th>Manager ID</th>
              <th>Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>CTC</th>
              <th>Gross Pay</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center text-muted">
                  No payroll records found.
                </td>
              </tr>
            ) : (
              filteredData.map((p) => (
                <tr key={p.payrollId}>
                  <td>{p.payrollId}</td>
                  <td>{p.empId}</td>
                  <td>{p.managerId}</td>
                  <td>{p.name}</td>
                  <td>{p.month}</td>
                  <td>{p.year}</td>
                  <td>₹{p.ctc?.toFixed(2)}</td>
                  <td>₹{p.grossSalary?.toFixed(2)}</td>
                  <td>₹{p.netSalary?.toFixed(2)}</td>
                  <td>{p.paymentStatus}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p.payrollId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollAccess;
