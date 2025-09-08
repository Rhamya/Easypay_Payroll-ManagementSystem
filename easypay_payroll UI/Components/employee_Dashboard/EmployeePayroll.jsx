import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLoggedInEmployee } from "../../service/employeeService";
import '../../Home.css';
import dashboardBg from "../../assets/login.png";
const EmployeePayroll = () => {
  const [employee, setEmployee] = useState(null);
  const [payrolls, setPayrolls] = useState([]);
  const [loadingPayroll, setLoadingPayroll] = useState(false);
  const [error, setError] = useState(null);

  const jwt = localStorage.getItem("jwt");

  // Fetch employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getLoggedInEmployee();
        setEmployee(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load employee details.");
      }
    };
    fetchEmployee();
  }, []);

  // Fetch payrolls when employee is loaded
  useEffect(() => {
    if (employee) {
      const fetchPayrolls = async () => {
        try {
          setLoadingPayroll(true);
          const res = await axios.get(
            `http://localhost:8080/api/payrolls/me?empId=${employee.id}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          setPayrolls(res.data);
        } catch (err) {
          console.error(err);
          setError("Failed to load payroll details.");
        } finally {
          setLoadingPayroll(false);
        }
      };

      fetchPayrolls();
    }
  }, [employee, jwt]);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4" style={{
                    backgroundImage: `url(${dashboardBg})`,// 🔹 replace with your image path
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "100vh",
                  padding: "20px"
                }}>
       <h5 className="text-white">View your payrolls</h5>
      {/* <h3 className="mb-4">Payroll Details</h3> */}
      {loadingPayroll ? (
        <p>Loading payrolls...</p>
      ) : payrolls.length === 0 ? (
        <p>No payroll records found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center payroll-table">
            <thead className="table table-dark ">
              <tr>
                <th style={{ width: "80px" }}>Payroll ID</th>
                <th style={{ width: "80px" }}>Month</th>
                <th style={{ width: "80px" }}>Year</th>
                <th style={{ width: "100px" }}>CTC</th>
                <th style={{ width: "100px" }}>Gross Pay</th>
                <th style={{ width: "100px" }}>Deductions</th>
                <th style={{ width: "100px" }}>Net Pay</th>
                <th style={{ width: "100px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((p) => (
                <tr key={p.payrollId}>
                  <td>{p.payrollId}</td>
                  <td>{p.month}</td>
                  <td>{p.year}</td>
                  <td>{p.ctc}</td>
                  <td>{p.grossSalary}</td>
                  <td>{p.otherDeductions}</td>
                  <td>{p.netSalary}</td>
                  <td>{p.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeePayroll;
