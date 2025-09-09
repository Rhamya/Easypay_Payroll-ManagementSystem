import React, { useState, useEffect } from 'react';
import Employee_Leave from './Employee_Leave';
import Employee_Details from './Employee_Details';
import EmployeePayroll from './EmployeePayroll';  // ✅ new import
import { useNavigate } from 'react-router-dom';
import salary from '../../assets/salary.png';
import '../../Home.css';
import { getLoggedInEmployee } from '../../service/employeeService';


const App = () => {
  const [activePage, setActivePage] = useState('Employee Details');
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const res = await getLoggedInEmployee();
        setEmployee(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load employee details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Employee Details':
        return <Employee_Details />;
      case 'Leave Management':
        return <Employee_Leave />;
      case 'Payroll Details':  // ✅ added case
        return <EmployeePayroll />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex bg-light min-vh-100 flex-column">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img src={salary} alt="Payroll Logo" className="me-2" style={{ width: "32px", height: "32px" }} />
            <div className="easypay-logo fs-4 fw-bold">easypay</div>
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex flex-row">
              <li className="nav-item">
                <a className={`nav-link px-3 py-2 ${activePage === 'Employee Details' ? 'active' : ''}`}
                   href="#" onClick={() => setActivePage('Employee Details')}>
                  Employee Details
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link px-3 py-2 ${activePage === 'Leave Management' ? 'active' : ''}`}
                   href="#" onClick={() => setActivePage('Leave Management')}>
                  Leave Management
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link px-3 py-2 ${activePage === 'Payroll Details' ? 'active' : ''}`}
                   href="#" onClick={() => setActivePage('Payroll Details')}>
                  Payroll Details
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              {loading ? (
                <span className="text-white-50 me-3">Loading...</span>
              ) : error ? (
                <span className="text-danger me-3">{error}</span>
              ) : (
                <span className="me-3 text-white">Welcome, {employee?.name || "Employee"}</span>
              )}
              <button className="btn btn-danger rounded-pill px-4" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 p-4 p-md-5 overflow-auto">
        <header className="card shadow-sm rounded-4 p-4 mb-4 d-flex justify-content-between">
          <span className="fs-4 fw-bold text-dark">{activePage}</span>
        </header>
        <div className="card shadow-sm rounded-4 p-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
