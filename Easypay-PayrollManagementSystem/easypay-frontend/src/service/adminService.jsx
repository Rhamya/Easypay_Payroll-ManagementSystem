import axios from 'axios';

const API_URL_USER = 'http://localhost:8080/api/users';
const API_URL_employee = 'http://localhost:8080/api/employees';
const API_URL_leaverequest = 'http://localhost:8080/api/leaverequest';
const API_URL_payrolls = 'http://localhost:8080/api/payrolls';

// Helper: get headers with JWT
const authHeaders = () => {
  const token = localStorage.getItem('jwt');
  if (!token) console.warn("JWT missing! Login first.");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// --import axios from "axios";


// ✅ User CRUD APIs
export const getAllUsers = () => axios.get(API_URL_USER, authHeaders());

export const getUserById = (id) =>
  axios.get(`${API_URL_USER}/${id}`, authHeaders());

export const createUser = (user) =>
  axios.post(API_URL_USER, user, authHeaders());

export const updateUser = (id, user) =>
  axios.put(`${API_URL_USER}/${id}`, user, authHeaders());

export const deleteUser = (id) =>
  axios.delete(`${API_URL_USER}/${id}`, authHeaders());

// ----------------- Employees -----------------
export const getAllEmployees = () => axios.get(`${API_URL_employee}/getAll`, authHeaders());
export const createEmployee = (employee) => axios.post(`${API_URL_employee}/create`, employee, authHeaders());
export const updateEmployee = (id, employee) => axios.put(`${API_URL_employee}/update/${id}`, employee, authHeaders());
export const deleteEmployee = (id) => axios.delete(`${API_URL_employee}/deleteById/${id}`, authHeaders());
export const getEmployeeById = (id) => axios.get(`${API_URL_employee}/getById/${id}`, authHeaders());
export const getEmployeesByRole = (role) => axios.get(`${API_URL_employee}/getByRole/${role}`, authHeaders());

// ----------------- Payrolls -----------------
export const getAllPayrolls = () => axios.get(`${API_URL_payrolls}/getAll`, authHeaders());
export const createPayroll = (payroll) => axios.post(`${API_URL_payrolls}/create`, payroll, authHeaders());
export const updatePayroll = (id, payroll) => axios.put(`${API_URL_payrolls}/update/${id}`, payroll, authHeaders());
export const deletePayroll = (id) => axios.delete(`${API_URL_payrolls}/deleteById/${id}`, authHeaders());
export const getPayrollById = (id) => axios.get(`${API_URL_payrolls}/getById/${id}`, authHeaders());

// ----------------- Leave Requests -----------------
export const getAllLeaves = () => axios.get(`${API_URL_leaverequest}/getAll`, authHeaders());
export const createLeave = (leave) => axios.post(`${API_URL_leaverequest}/create`, leave, authHeaders());
export const updateLeave= (id, leave) => axios.put(`${API_URL_leaverequest}/updateById/${id}`, leave, authHeaders());
export const deleteLeave = (id) => axios.delete(`${API_URL_leaverequest}/deleteById/${id}`, authHeaders());
export const getLeaveById = (id) => axios.get(`${API_URL_leaverequest}/getById/${id}`, authHeaders());
export const getLeaveByRole = (role) => axios.get(`${API_URL_leaverequest}/getByRole/${role}`, authHeaders());
