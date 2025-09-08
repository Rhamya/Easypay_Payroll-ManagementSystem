import axios from 'axios';

const API_URL_LEAVEREQUEST = 'http://localhost:8080/api/leaverequest';
const API_URL_PAYROLLS = 'http://localhost:8080/api/payrolls';

// Helper: attach JWT from localStorage
const authHeaders = () => {
  const token = localStorage.getItem("jwt");
  const user_id=localStorage.getItem("userId");
  
  return { headers: { Authorization: `Bearer ${token}` } };
};

// ----------------- Leave Requests -----------------
export const getAllLeaves = () =>
  axios.get(`${API_URL_LEAVEREQUEST}/getAll`, authHeaders());

export const createLeave = (leave) =>
  axios.post(`${API_URL_LEAVEREQUEST}/create`, leave, authHeaders());

export const updateLeave = (id, leave) =>
  axios.put(`${API_URL_LEAVEREQUEST}/updateById/${id}`, leave, authHeaders());

export const deleteLeave = (id) =>
  axios.delete(`${API_URL_LEAVEREQUEST}/deleteById/${id}`, authHeaders());

export const getLeaveById = (id) =>
  axios.get(`${API_URL_LEAVEREQUEST}/getById/${id}`, authHeaders());

export const getLeaveByRole = (role) =>
  axios.get(`${API_URL_LEAVEREQUEST}/getByRole/${role}`, authHeaders());

export const getLeavesByManager = (managerId) =>
  axios.get(`${API_URL_LEAVEREQUEST}/leaves/${managerId}`, authHeaders());


// ----------------- Payrolls -----------------
export const getAllPayrolls = () =>
  axios.get(`${API_URL_PAYROLLS}/getAll`, authHeaders());

export const createPayroll = (payroll) =>
  axios.post(`${API_URL_PAYROLLS}/create`, payroll, authHeaders());

export const updatePayroll = (id, payroll) =>
  axios.put(`${API_URL_PAYROLLS}/update/${id}`, payroll, authHeaders());

export const deletePayroll = (id) =>
  axios.delete(`${API_URL_PAYROLLS}/deleteById/${id}`, authHeaders());

export const getPayrollById = (id) =>
  axios.get(`${API_URL_PAYROLLS}/getById/${id}`, authHeaders());


export const getPayrollsByManager = (managerId) =>
  axios.get(`${API_URL_PAYROLLS}/manager/${managerId}`, authHeaders());
