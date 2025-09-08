import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveApproval from './LeaveApproval';
import PayrollAccess from './PayrollAccess';
import salary from '../../assets/salary.png'; // logo path
import bgImage from '../../assets/login.png'; // background image

const App = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('empName');
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('empId');
    localStorage.removeItem('empName');
    navigate('/');
  };

  const pages = {
    Dashboard: <Dashboard goTo={setActivePage} userName={userName} />,
    Payroll: <PayrollAccess />,
    'Leave Approval': <LeaveApproval />,
    Notifications: <Notifications />,
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="easypay-nav d-flex justify-content-between align-items-center p-3 bg-dark shadow-sm rounded-3 mb-4 w-100">
        <div className="d-flex align-items-center">
          <img src={salary} alt="Payroll Logo" className="me-2" style={{ width: 32, height: 32 }} />
          <div className="easypay-logo fs-4 fw-bold text-white">easypay</div>
        </div>

        {/* Navigation Links */}
       <ul className="easypay-menu d-flex list-unstyled mb-0">
  {['Dashboard', 'Payroll', 'Leave Approval'].map((page) => (
    <li key={page} className="mx-3">
      <button
        className={`btn btn-link text-white ${activePage === page ? 'fw-bold text-decoration-underline' : ''}`}
        onClick={() => setActivePage(page)}
        style={{
          fontSize: '18px',     // ✅ increase font size
          fontWeight: '600',    // ✅ bolder look
          letterSpacing: '0.5px',
        }}
      >
        {page}
      </button>
    </li>
  ))}
</ul>


        {/* Logout Button */}
        <div>
          <button className="btn btn-danger rounded-pill px-4" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-100">
        <div
          className="card shadow-sm rounded-4 p-4"
          style={{
            minHeight: '90vh',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            paddingBottom: '50px',
          }}
        >
          {pages[activePage] || <p>Page not found</p>}
        </div>
      </div>
    </div>
  );
};

// Dashboard Component

const Dashboard = ({ goTo, userName }) => {
  const cardStyle = {
    backgroundColor: 'rgba(0,0,0,0.6)',
    boxShadow: '0 8px 20px rgba(255, 255, 255, 0.3)',
    fontWeight: '700',
    color: '#ffffff',
    minHeight: '200px',
    maxWidth: '500px',   // ✅ narrower width
    margin: '0 auto',    // ✅ center the card
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
  };

  return (
    <div>
      <h2 className="fs-1 fw-bold mb-2 text-white">Welcome, {userName || 'Manager'}!</h2>
      <p className="fs-5 text-light text-center">
        Here’s what you can do today to manage your team effectively:
      </p>
      <div className="row g-4 mt-4 justify-content-center">
        <div className="col-md-4 col-sm-6 d-flex justify-content-center">
          <div
            className="card p-4 text-center rounded-4"
            style={cardStyle}
            onClick={() => goTo('Leave Approval')}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h3 className="fs-5 fw-bold mb-2">Approve Leaves</h3>
            <p className="fs-6">Review and approve pending leave requests from your team.</p>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 d-flex justify-content-center">
          <div
            className="card p-4 text-center rounded-4"
            style={cardStyle}
            onClick={() => goTo('Payroll')}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h3 className="fs-5 fw-bold mb-2">Manage Payroll</h3>
            <p className="fs-6">Check and process payroll to ensure timely payments.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// Placeholder Notifications Component
const Notifications = () => {
  return <p className="text-center text-light mt-4">No notifications yet.</p>;
};

export default App;
