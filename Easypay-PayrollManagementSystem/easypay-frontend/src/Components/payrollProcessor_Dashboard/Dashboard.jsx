// src/components/dashboard/Dashboard.jsx
import React from "react";
import dashboardBg from "../../assets/login.png"; // add your bg image in assets

const Dashboard = () => (
  <div
    className="dashboard-container min-vh-100 d-flex flex-column align-items-center"
    style={{
      backgroundImage: `url(${dashboardBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding: "2rem",
    }}
  >
    <div className="row g-4 w-100 justify-content-center mt-5">
      <div className="col-md-5"> {/* slightly smaller column for larger cards */}
        <div
          className="card p-5 text-center shadow-sm rounded-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            boxShadow: "0 8px 20px rgba(255, 255, 255, 0.3)",
            fontWeight: "700",
            color: "#ffffff",
            minHeight: "220px", // adjust height
          }}
        >
          <h3 className="fs-4 mb-3">Process Payroll</h3>
          <p className="fs-6">Calculate salaries and process payroll for employees on time.</p>
        </div>
      </div>
      <div className="col-md-5">
        <div
          className="card p-5 text-center shadow-sm rounded-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            boxShadow: "0 8px 20px rgba(255, 255, 255, 0.3)",
            fontWeight: "700",
            color: "#ffffff",
            minHeight: "220px", // adjust height
          }}
        >
          <h3 className="fs-4 mb-3">Generate Payslips</h3>
          <p className="fs-6">Create and download payslips for employees for the current month.</p>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
