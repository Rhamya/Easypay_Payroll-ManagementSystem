import React, { useState } from 'react';
import EmployeeManagement from './EmployeeManagement';
import PayrollManagement from '../payrollProcessor_Dashboard/PayrollManagement';
import LeaveManagement from './LeaveManagement';
import UserManagement from './UserManagement';
import { useNavigate } from 'react-router-dom';
import salary from '../../assets/salary.png';
import '../../Home.css';
import bgImage from '../../assets/login.png'; // ✅ add your background image here

const Admin = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (activePage) {
    case 'Dashboard':
  const cardStyle = {
    backgroundColor: 'rgba(0,0,0,0.6)',
    boxShadow: '0 8px 20px rgba(255, 255, 255, 0.3)',
    fontWeight: '700',
    color: '#ffffff',
    minHeight: '200px',
    maxWidth: '350px',   // smaller width for 3 in a row
    margin: '0 auto',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
    borderRadius: '16px',
    textAlign: 'center',
    padding: '24px',
  };

  return (
    <div className="p-4 bg-transparent rounded-4">
      <h2 className="fs-2 fw-bold text-light mb-4 text-center">Welcome, Admin!</h2>
      <p className="fs-5 fw-semibold text-light text-center">
        Here’s what you can do today to manage the Easypay Payroll System:
      </p>

      <div className="row g-4 mt-4 justify-content-center">
        {[
          { title: 'Manage Employees', desc: 'View, add, or remove employees in the system.' },
          { title: 'Process Payroll', desc: 'Check and process payroll to ensure timely payments.' },
          { title: 'Add Manager Users', desc: 'Create new manager accounts to assign system responsibilities.' },
        ].map((item, index) => (
          <div className="col-md-4 d-flex justify-content-center" key={index}>
            <div
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,255,255,0.3)';
              }}
            >
              <h3 className="fs-5 fw-bold mb-2">{item.title}</h3>
              <p className="fs-6">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


      case 'Employee Management':
        return <EmployeeManagement />;
      case 'Payroll':
        return <PayrollManagement />;
      // case 'Leave Approval':
      //   return <LeaveManagement />;
      case 'User Management':
        return <UserManagement />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <style>
        {`
          .easypay-menu button {
            text-decoration: none !important;
            transition: all 0.2s ease-in-out;
          }
          .easypay-menu button:hover {
            text-decoration: underline !important;
          }
        `}
      </style>

      {/* 🔹 Top Navbar */}
      <nav className="easypay-nav d-flex justify-content-between align-items-center p-3 bg-dark bg-opacity-75 shadow-sm rounded-3 mb-4 w-100">
        {/* Logo */}
        <div className="d-flex align-items-center">
          <img
            src={salary}
            alt="Payroll Logo"
            className="me-2"
            style={{ width: 32, height: 32 }}
          />
          <div className="easypay-logo fs-4 fw-bold text-white">easypay</div>
        </div>

        {/* Navigation Links */}
        <ul className="easypay-menu d-flex list-unstyled mb-0">
          {['Dashboard', 'Payroll',  'Employee Management', 'User Management'].map(
            (page) => (
              <li key={page} className="mx-3">
                <button
                  className={`btn btn-link text-white ${
                    activePage === page ? 'fw-bold' : ''
                  }`}
                  onClick={() => setActivePage(page)}
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                  }}
                >
                  {page}
                </button>
              </li>
            )
          )}
        </ul>

        {/* Logout Button */}
        <div>
          <button
            className="btn btn-danger rounded-pill px-4 fw-semibold shadow-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* <div style={{ padding: "2px", backgroundColor: "#ffffff" }}></div> */}

      {/* 🔹 Content */}
      <main className="flex-grow-1 p-4">
       <div
  className="card shadow-sm rounded-4 p-4"
  style={{ background: "transparent", boxShadow: "none" }}
>
  {renderContent()}
</div>

      </main>
    </div>
  );
};

export default Admin;
