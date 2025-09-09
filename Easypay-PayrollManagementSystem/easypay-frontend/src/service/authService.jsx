import axios from 'axios';
import * as jwtDecode from 'jwt-decode';

const API_URL = "http://localhost:8080/api/users"; // your backend URL

// Login function
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.jwt) {
      localStorage.setItem("jwt", response.data.jwt);
      localStorage.setItem("userId", response.data.userId); // correct
  localStorage.setItem("role", response.data.role);

  console.log(localStorage.getItem("userId")); // should print a number

      // localStorage.setItem("empId", response.data.empId);
      

      
      
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Register function
const register = async (username, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { 
      username,   // display name
      email,      // used for login
      password,
      role 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};


// Logout function
const logout = () => {
  localStorage.removeItem("jwt");
};

// Get current logged-in user
const getCurrentUser = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  const decoded = jwtDecode(token);
  // console.log("Decoded JWT:", decoded);
  return {
    email: decoded.sub,
    roles: decoded.roles,
  };
};

const resetPassword = async (email, newPassword) => {
  try {
    const response = await axios.put(`${API_URL}/reset-password`, { email, newPassword });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to reset password" };
  }
};


export default {
  login,
  register, // <-- updated register function
  resetPassword,
  logout,
  getCurrentUser,
};


export const getManagerId = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
  const decoded = jwtDecode(token);
  // console.log("Decoded JWT:", decoded);
}
  if (!token) return null;
  // const decoded = jwtDecode(token);
  // Example: if JWT has `id` or `empId`
  return decoded.id || decoded.empId || null;
};

 