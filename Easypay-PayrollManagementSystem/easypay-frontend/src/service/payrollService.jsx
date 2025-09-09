import axios from "axios";

// ✅ Base URL for payroll API
const API_URL = "http://localhost:8080/api/payrolls";

// ✅ Function to get auth headers with JWT
const authHeaders = () => {
  const token = localStorage.getItem("jwt"); // Must match your token key
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};

// ✅ Get all payrolls
export const getAllPayrolls = () => {
  return axios.get(`${API_URL}/getAll`, authHeaders());
};

// ✅ Create a new payroll
export const createPayroll = (payrollData) => {
  return axios.post(`${API_URL}/create`, payrollData, authHeaders());
};

// ✅ Update payroll by ID
export const updatePayroll = (payrollId, payrollData) => {
  return axios.put(`${API_URL}/update/${payrollId}`, payrollData, authHeaders());
};

// ✅ Delete payroll by ID
export const deletePayroll = (payrollId) => {
  return axios.delete(`${API_URL}/delete/${payrollId}`, authHeaders());
};

// ✅ Get payroll by ID
export const getPayrollById = (payrollId) => {
  return axios.get(`${API_URL}/getById/${payrollId}`, authHeaders());
};

// ✅ Get payrolls by employee ID
export const getPayrollsByEmployeeId = (empId) => {
  return axios.get(`${API_URL}/getByEmployee/${empId}`, authHeaders());
};
