import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import Admin from "./Components/admin_Dashboard/Admin";
import Employee from "./Components/employee_Dashboard/Employee";
import Manager from "./Components/manager_Dashboard/Manager";
import PayrollProcessor from "./Components/payrollProcessor_Dashboard/PayrollProcessor";
import ViewPayroll from "./Components/payrollProcessor_Dashboard/ViewPayroll"; // adjust path
import PayrollManagement from "./Components/payrollProcessor_Dashboard/PayrollManagement"; 
import ForgotPassword from "./Components/auth/ForgotPassword";
import PayrollAccess from "./Components/manager_Dashboard/PayrollAccess";
import Navbar from "./Components/payrollProcessor_Dashboard/Navbar";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/Manager" element={<Manager />} />
         <Route path="/PayrollProcessor" element={<PayrollProcessor />} />
           <Route path="/PayrollAccess" element={<PayrollAccess />} />
         <Route path="/ViewPayroll/:payrollId" element={<ViewPayroll />} />
          <Route path="/PayrollManagement" element={<PayrollManagement />} />
          <Route path="/Navbar" element={<Navbar />} />

      </Routes>
    </Router>
  );
}

export default App;
