import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../service/authService"; 
import salary from "../../assets/salary.png"; 
import bgImage from "../../assets/login.png"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // ✅ backend should handle reset with email + new password
      await authService.resetPassword(email, newPassword);

      setMessage("Password updated successfully!");
      setMessageType("success");
      setEmail("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to reset password");
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
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat" 
      }}
    >
      {/* ✅ Navbar */}
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

        {/* ✅ Back to Home */}
        <div>
          <Link to="/" className="btn btn-outline-light rounded-pill">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* ✅ White strip below navbar */}
      <div style={{ backgroundColor: "white", padding: "1px" }}></div>

      {/* ✅ Reset Password Form */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div 
          className="card shadow-lg p-4 rounded-4" 
          style={{ 
            maxWidth: "400px", 
            width: "100%", 
            background: "rgba(0, 2, 31, 0.7)", 
            backdropFilter: "blur(8px)",
            color: "white",
            border: "5px solid rgba(255, 255, 255, 0.4)", 
            boxShadow: "0 0 25px rgba(255, 255, 255, 0.8)"
          }}
        >
          <h2 className="text-center mb-4">Reset Password</h2>

          {message && (
            <div className={`alert alert-${messageType} alert-dismissible fade show`} role="alert">
              {message}
              <button type="button" className="btn-close" onClick={handleCloseMessage}></button>
            </div>
          )}

          <form onSubmit={handleResetPassword}>
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
              <label className="form-label text-dark">New Password</label>
              <input
                type="password"
                className="form-control border-dark"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Update Password
            </button>

            <div className="mt-3 text-center text-dark">
              <p>
                Remembered your password?{" "}
                <Link to="/login" className="text-primary fw-bold">
                  Back to Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
