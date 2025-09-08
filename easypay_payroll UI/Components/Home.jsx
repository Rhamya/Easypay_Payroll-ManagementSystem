import React from 'react';
import '../Home.css';
import easypayWoman from '../assets/payroll1.png';
import salary from '../assets/salary.png';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="easypay-container">
      <header className="easypay-header bg-dark text-white py-3 shadow">
  <nav className="easypay-nav container d-flex justify-content-between align-items-center">
    
    {/* Logo with payroll icon */}
    <div className="d-flex align-items-center">
      {/* <a href="https://www.flaticon.com/free-icons/salary" title="salary icons">Salary icons created by Freepik - Flaticon</a> */}
      <img 
        src={salary}   // ✅ Replace with your payroll-related favicon path
        alt="Payroll Logo" 
        className="me-2" 
        style={{ width: "32px", height: "32px" }}
      />
      <div className="easypay-logo fs-4 fw-bold">easypay</div>
    </div>

   

    {/* Auth Buttons */}
    <div className="d-flex">
      <Link to="/login" className="btn btn-outline-light rounded-pill px-4 me-2">
        Log In
      </Link>
      <Link to="/register" className="btn btn-primary rounded-pill px-4">
        Register
      </Link>
    </div>
  </nav>
</header>


      <main className="easypay-main">
  <div className="easypay-hero-image-container">
    <img 
      src={easypayWoman} 
      alt="Businesswoman representing EasyPay payroll solution" 
      className="easypay-hero-image" 
    />
    <div className="easypay-hero-content">
      <h1>Simplify your payroll.</h1>
      <p>EasyPay is a easy-to-use payroll solution for XYZ Company</p>
      <Link to="/login" >
         <button className="easypay-login">GET STARTED</button>
      </Link>
     
    </div>
  </div>
</main>

    </div>
  );
}

export default Home;