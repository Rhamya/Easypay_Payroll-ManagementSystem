import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import authService from "../../service/authService";
import salary from "../../assets/salary.png"; // ✅ Make sure this path is correct
import bgImage from "../../assets/login.png";
import { useNavigate } from 'react-router-dom';

// Message component
const Message = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show rounded-3 shadow-sm mb-4`}
      role="alert"
    >
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

//  const navigate = useNavigate();

// RegisterPage component
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE"); // ✅ default role uppercase
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(username, email, password, role);
      setMessage("Registered successfully!");
      setMessageType("success");
      //  navigate('/login');

      // Clear form fields
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("EMPLOYEE");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
      setMessageType("danger");
    }
  };

  const handleCloseMessage = () => {
    setMessage("");
    setMessageType("");
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${bgImage})`, // ✅ background image  
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#000",
      }}
    >
      {/* ✅ New Navbar */}
      <nav className="easypay-nav container-fluid d-flex justify-content-between align-items-center px-4 py-3 bg-dark shadow-sm">
        <div className="d-flex align-items-center">
          <img
            src={salary}
            alt="Payroll Logo"
            className="me-2"
            style={{ width: "32px", height: "32px" }}
          />
          <div className="easypay-logo fs-4 fw-bold text-white">easypay</div>
        </div>

        {/* ✅ Back to Home (top right corner) */}
        <div>
          <Link to="/" className="btn btn-outline-light rounded-pill">
            ← Back to Home
          </Link>
        </div>
      </nav>

       <div style={{ backgroundColor: "white", padding: "1px" }}></div>
       
      {/* ✅ Register Form */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="card shadow-lg p-4 rounded-4"
          style={{
            // maxWidth: "450px",
            // width: "100%",
            // background: "rgba(0, 73, 119, 0.7)", // ✅ semi-transparent
            // border: "1px solid #444",
            // color: "white",
            // boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)", // ✅ white glow


             maxWidth: "450px", 
          width: "100%", 
          background: "rgba(0, 2, 31, 0.7)", // ✅ darker transparent
          backdropFilter: "blur(8px)",
          color: "white",
          border: "5px solid rgba(255, 255, 255, 0.4)", // ✅ subtle white border
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.8)" 
          }}
        >
          <h2 className="text-center mb-4 text-light">Register</h2>
          <Message
            message={message}
            type={messageType}
            onClose={handleCloseMessage}
          />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-dark">Username</label>
              <input
                type="text"
                className="form-control border-dark"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Email</label>
              <input
                type="email"
                className="form-control border-dark"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Password</label>
              <input
                type="password"
                className="form-control border-dark"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-dark">Role</label>
              <select
                className="form-select border-dark"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="MANAGER">MANAGER</option>
                <option value="PAYROLL_PROCESSOR">PAYROLL PROCESSOR</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100 ">
              Register
            </button>
             <div className="mt-3 text-center text-dark">
                          <p>
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary fw-bold">
                              Login
                            </Link>
                          </p>
                        </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
