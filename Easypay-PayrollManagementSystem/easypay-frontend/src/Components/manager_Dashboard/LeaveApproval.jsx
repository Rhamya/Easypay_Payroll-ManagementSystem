import React, { useEffect, useState } from "react";
import {
  updateLeave,
  deleteLeave,
  getLeavesByManager
} from "../../service/managerService";
import bgImage from "../../assets/login.png";

const LeaveApproval = () => {
  const [leaveView, setLeaveView] = useState("list");
  const [leaveData, setLeaveData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    reason: "Sick Leave",
    status: "Pending",
    fromDate: "",
    toDate: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const managerId = localStorage.getItem("userId");
      console.log("ManagerId from localStorage:", managerId);
      const response = await getLeavesByManager(managerId);
      console.log(response.data);
      setLeaveData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave request?")) return;
    try {
      await deleteLeave(id);
      loadLeaves();
    } catch (error) {
      console.error("Error deleting leave:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      employeeId: item.employeeId,
      employeeName: item.employeeName,
      reason: item.reason,
      fromDate: item.fromDate,
      toDate: item.toDate,
      status: item.status
    });
    setEditMode(true);
    setEditId(item.leaveId);
    setLeaveView("add");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { status: formData.status }; // ✅ only update status
      if (editMode && editId) {
        await updateLeave(editId, payload);
        alert("Leave request updated successfully!");
      }
      handleCancel();
      loadLeaves();
    } catch (error) {
      console.error("Error saving leave request:", error);
    }
  };

  const handleCancel = () => {
    setLeaveView("list");
    setEditMode(false);
    setEditId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      employeeId: "",
      employeeName: "",
      reason: "Sick Leave",
      status: "Pending",
      fromDate: "",
      toDate: ""
    });
  };

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = leaveData.filter(
      (item) =>
        (item.managerId && item.managerId.toString().includes(term)) ||
        (item.employeeName && item.employeeName.toLowerCase().includes(term)) ||
        (item.reason && item.reason.toLowerCase().includes(term))
    );
    setFilteredData(filtered);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredData(leaveData);
  };

  return (
    <div
      className="p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        minHeight: "100vh"
      }}
    >
      <h5 className="text-white">View, approve, or deny employee leave requests.</h5>

      {/* Controls */}
      <div className="mt-4 mb-4 d-flex gap-2 align-items-center">
        <input
          type="text"
          className="form-control form-control-sm rounded-pill"
          placeholder="Search by Manager ID, Employee Name, Reason"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "400px" }}
        />
        <button
          className="btn btn-sm btn-primary rounded-pill"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="btn btn-sm btn-secondary rounded-pill"
          onClick={handleResetSearch}
        >
          Reset
        </button>
      </div>

      {/* List View */}
      {leaveView === "list" && (
        <div className="card shadow-sm rounded-3 p-4 mt-4" style={{ overflowX: "auto" }}>
          <table className="table table-striped table-hover align-middle" style={{ minWidth: "800px" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Reason</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.leaveId}>
                    <td>{item.leaveId}</td>
                    <td>{item.employeeId}</td>
                    <td>{item.employeeName}</td>
                    <td>{item.reason}</td>
                    <td>{item.fromDate}</td>
                    <td>{item.toDate}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item.leaveId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit View */}
      {leaveView === "add" && (
        <div className="card shadow-sm rounded-3 p-4 mt-4">
          <h3 className="fs-5 fw-bold mb-3">Update Leave Status</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="employeeId" className="form-label">Employee ID</label>
                <input
                  type="number"
                  id="employeeId"
                  className="form-control rounded-pill"
                  value={formData.employeeId}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="employeeName" className="form-label">Employee Name</label>
                <input
                  type="text"
                  id="employeeName"
                  className="form-control rounded-pill"
                  value={formData.employeeName}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="reason" className="form-label">Reason</label>
                <select
                  id="reason"
                  className="form-select rounded-pill"
                  value={formData.reason || "Sick Leave"}
                  disabled
                >
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Earned Leave</option>
                  <option>Maternity Leave</option>
                  <option>Paternity Leave</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="fromDate" className="form-label">Start Date</label>
                <input
                  type="date"
                  id="fromDate"
                  className="form-control rounded-pill"
                  value={formData.fromDate}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="toDate" className="form-label">End Date</label>
                <input
                  type="date"
                  id="toDate"
                  className="form-control rounded-pill"
                  value={formData.toDate}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  id="status"
                  className="form-select rounded-pill"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Denied</option>
                </select>
              </div>

              <div className="col-12 mt-4 d-flex gap-3">
                <button type="submit" className="btn btn-success rounded-pill px-4">
                  Update Status
                </button>
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill px-4"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LeaveApproval;
