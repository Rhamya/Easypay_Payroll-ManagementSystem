import React, { useEffect, useState } from "react";
import {
  getAllLeaves,
  createLeave,
  updateLeave,
  deleteLeave
} from "../../service/adminService";

const LeaveManagement = () => {
  const [leaveView, setLeaveView] = useState("list");
  const [leaveData, setLeaveData] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    leaveType: "Sick leave",
    status: "Pending",
    startDate: "",
    endDate: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const response = await getAllLeaves();
      setLeaveData(response.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const handleDelete = async (id) => {
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
      leaveType: item.leaveType,
      status: item.status,
      startDate: item.startDate,
      endDate: item.endDate
    });
    setEditMode(true);
    setEditId(item.id); // Use backend ID field
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
    const payload = { ...formData };
    if (!editMode) delete payload.id; // Remove ID for creation

    if (editMode) {
      await updateLeave(editId, payload);
      alert("Leave request updated successfully!");
    } else {
      await createLeave(payload);
      alert("Leave request created successfully!");
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
      leaveType: "Sick leave",
      status: "Pending",
      startDate: "",
      endDate: ""
    });
  };

  return (
    <div className="p-4">
      <h5 className="text-secondary">View, approve, or deny employee leave requests.</h5>
     
      <div className="mt-4 mb-4 d-flex gap-3">
        <button
          className={`btn btn-sm ${leaveView === "list" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setLeaveView("list")}>
          View Leave Requests
        </button>

        <button
          className={`btn btn-sm ${leaveView === "add" && !editMode ? "btn-success" : "btn-outline-success"}`}
          onClick={() => { setLeaveView("add");setEditMode(false);resetForm();}}>
          Add Leave Request
        </button>
      </div>

      {/* List view */}
      {leaveView === "list" && (
        <div className="card shadow-sm rounded-3 p-4 mt-4">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.employeeId}</td>
                    <td>{item.employeeName}</td>
                    <td>{item.leaveType}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.status}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit view */}
      {leaveView === "add" && (
        <div className="card shadow-sm rounded-3 p-4 mt-4">
          <h3 className="fs-5 fw-bold mb-3">{editMode ? "Edit Leave Request" : "Add New Leave Request"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="employeeId" className="form-label">Employee ID</label>
                <input type="number" id="employeeId" className="form-control rounded-pill" value={formData.employeeId} onChange={handleInputChange} required/>
              </div>

              <div className="col-md-6">
                <label htmlFor="employeeName" className="form-label">Employee Name</label>
                <input type="text"id="employeeName" className="form-control rounded-pill" value={formData.employeeName} onChange={handleInputChange} required/>
              </div>

              <div className="col-md-6">
                <label htmlFor="leaveType" className="form-label">Leave Type</label>
                <select id="leaveType" className="form-select rounded-pill" value={formData.leaveType} onChange={handleInputChange} required>   
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Earned Leave</option>
                  <option>Maternity Leave</option>
                  <option>Paternity Leave</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">Start Date</label>
                <input type="date" id="startDate" className="form-control rounded-pill" value={formData.startDate} onChange={handleInputChange}required/>
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">End Date</label>
                <input type="date" id="endDate" className="form-control rounded-pill" value={formData.endDate} onChange={handleInputChange} required/>
              </div>

              <div className="col-md-6">
                <label htmlFor="status" className="form-label">Status</label>
                <select id="status" className="form-select rounded-pill" value={formData.status} onChange={handleInputChange} required>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Denied</option>
                </select>
              </div>

              <div className="col-12 mt-4 d-flex gap-3">
                <button type="submit" className="btn btn-success rounded-pill px-4">
                  {editMode ? "Update Request" : "Submit Request"}
                </button>
                {editMode && (
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
