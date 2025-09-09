import { useNavigate } from "react-router-dom";
import salary from "../../assets/salary.png";
import '../../Home.css';

const Navbar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm p-3">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div className="d-flex align-items-center">
          <img
            src={salary}
            alt="Payroll Logo"
            style={{ width: "32px", height: "32px" }}
            className="me-2"
          />
          <span className="navbar-brand fw-bold text-white">Easypay</span>
        </div>

        {/* Centered Links */}
       
         {/* Centered Links */}
<div className="d-flex mx-auto">
  <span
    className={`nav-link-custom ${activePage === "Dashboard" ? "active" : ""}`}
    onClick={() => setActivePage("Dashboard")}
  >
    Dashboard
  </span>
  <span
    className={`nav-link-custom ${activePage === "Payroll Management" ? "active" : ""}`}
    onClick={() => setActivePage("Payroll Management")}
  >
    Payroll Management
  </span>
</div>

        {/* Username + Logout */}
        <div className="d-flex align-items-center">
          <span className="text-white me-3 fw-semibold">WELCOME {username.toUpperCase()}</span>
          <button className="btn btn-outline-light rounded-pill" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
