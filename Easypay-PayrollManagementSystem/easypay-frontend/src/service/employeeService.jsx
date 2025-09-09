import axios from "axios";

// ✅ Base URLs
const API_URL_EMPLOYEE = "http://localhost:8080/api/employees";
const API_URL_LEAVE = "http://localhost:8080/api/leaverequest";
const API_URL_PAYROLL = "http://localhost:8080/api/payrolls";

// ✅ Function to get auth headers
const authHeaders = () => {
  const token = localStorage.getItem("jwt"); // Use consistent key "jwt"
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// =========================
// Employee APIs
// =========================

// Get logged-in employee
export const getLoggedInEmployee = () =>
  axios.get(`${API_URL_EMPLOYEE}/me`, authHeaders());

// Get employee by ID
export const getEmployeeById = (id) =>
  axios.get(`${API_URL_EMPLOYEE}/getById/${id}`, authHeaders());

// Get employee by email
export const getEmployeeByEmail = (email) =>
  axios.get(`${API_URL_EMPLOYEE}/getByEmail/${email}`, authHeaders());

// export const updateById = (id, employeeData) =>
//   axios.put(`${API_URL_EMPLOYEE}/update/${id}`, employeeData, authHeaders());


export const updateById = (id, data) =>
  axios.put(`${API_URL_EMPLOYEE}/update/${id}`, data, authHeaders());


// =========================
// Leave APIs
// =========================
export const getAllLeaves = () =>
  axios.get(`${API_URL_LEAVE}/getAll`, authHeaders());

export const createLeave = (leave) =>
  axios.post(`${API_URL_LEAVE}/create`, leave, authHeaders());

export const updateLeave = (id, leave) =>
  axios.put(`${API_URL_LEAVE}/updateById/${id}`, leave, authHeaders());

export const deleteLeave = (id) =>
  axios.delete(`${API_URL_LEAVE}/deleteById/${id}`, authHeaders());

export const getLeaveById = (id) =>
  axios.get(`${API_URL_LEAVE}/getById/${id}`, authHeaders());

export const getLeaveByRole = (role) =>
  axios.get(`${API_URL_LEAVE}/getByRole/${role}`, authHeaders());

// export const getLeavesByEmployee = () =>
//   axios.get(`${API_URL_LEAVE}/me`, authHeaders());
// Get leaves by employee ID
export const getLeavesByEmployeeId = (empId) =>
  axios.get(`${API_URL_LEAVE}/getByEmployeeId/${empId}`, authHeaders());


// =========================
// Payroll APIs
// =========================

// Get payrolls of logged-in employee
//  export const getMyPayrolls = () =>
//   axios.get(`${API_URL_PAYROLL}/me`, authHeaders());
// Payroll APIs
// employeeService.jsx

export const getMyPayrolls = () => {
  const empId = localStorage.getItem("empId");
  if (!empId) {
    return Promise.reject(new Error("Employee ID not found in localStorage"));
  }
  return axios.get(`${API_URL_PAYROLL}/me?empId=${empId}`, authHeaders());
};
