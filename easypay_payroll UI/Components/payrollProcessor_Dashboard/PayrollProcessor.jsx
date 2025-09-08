import React, { useState } from 'react';
import Navbar from './Navbar';
import PayrollManagement from './PayrollManagement';
import Dashboard from './Dashboard';
import '../../Home.css';

const App = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const username = localStorage.getItem("username") || "User"; // Example: fetch from storage

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Payroll Management':
        return <PayrollManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} username={username} />

      {/* Page Header */}
      <header className="card shadow-sm rounded-4 p-4 m-4">
        <span className="fs-4 fw-bold text-dark">{activePage}</span>
      </header>

      {/* Main Content */}
      <div className="card shadow-sm rounded-4 p-4 m-4" style={{ minHeight: 'calc(100vh - 250px)' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
