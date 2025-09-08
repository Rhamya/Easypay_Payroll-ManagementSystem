import React, { useState, useEffect } from "react";
import { getLoggedInEmployee, getLeavesByEmployeeId, createLeave } from "../../service/employeeService";
import dashboardBg from "../../assets/login.png";

const Employee_Leave = () => {
  const [leaveView, setLeaveView] = useState("list");
  const [leaveData, setLeaveData] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    managerId: "",  // ← added managerId
    leaveType: "Sick",
    status: "Pending",
    startDate: "",
    endDate: ""
  });
  const [loading, setLoading] = useState(false);

  // Load employee info and leaves
  useEffect(() => {
    const loadEmployeeAndLeaves = async () => {
      try {
        const empRes = await getLoggedInEmployee();

        // include managerId in formData
        setFormData(prev => ({
          ...prev,
          employeeId: empRes.data.id,
          employeeName: empRes.data.name,
          managerId: empRes.data.managerId  // ← get managerId from personal info
        }));

        const leavesRes = await getLeavesByEmployeeId(empRes.data.id);
        setLeaveData(leavesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadEmployeeAndLeaves();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createLeave(formData);  // managerId is now included
      alert("Leave request created successfully!");
      resetForm();
      setLeaveView("list");

      const leavesRes = await getLeavesByEmployeeId(formData.employeeId);
      setLeaveData(leavesRes.data);
    } catch (error) {
      console.error("Error creating leave:", error);
      alert("Failed to submit leave request.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(prev => ({
      ...prev,
      leaveType: "Sick",
      status: "Pending",
      startDate: "",
      endDate: ""
    }));
  };

  return (
    <div className="p-4" style={{
      backgroundImage: `url(${dashboardBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h5 className="text-white">Submit and view your leave requests.</h5>

      {/* Controls */}
      <div className="mt-4 mb-4 d-flex gap-3 ">
        <button
          className={`btn btn-sm ${leaveView === "list" ? "btn-primary" : "btn-outline-light"}`}
          onClick={() => setLeaveView("list")}
        >
          View Leave Requests
        </button>
        <button
          className={`btn btn-sm ${leaveView === "add" ? "btn-success" : "btn-outline-light"}`}
          onClick={() => { setLeaveView("add"); resetForm(); }}
        >
          Add Leave Request
        </button>
      </div>

      {/* List view */}
      {leaveView === "list" && (
        <div className="card shadow-sm rounded-3 p-4 mt-4">
          <h3 className="fs-5 fw-bold mb-3">My Leave Requests</h3>
          {leaveData.length === 0 ? (
            <p className="text-center text-muted">No leave requests found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center" style={{ backgroundColor: "#e6f0fa" }}>
                <thead style={{ backgroundColor: "#0d6efd", color: "white" }}>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.employeeId}</td>
                      <td>{item.employeeName}</td>
                      <td>{item.leaveType}</td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add view */}
      {leaveView === "add" && (
        <div className="card shadow-sm rounded-3 p-4 mt-4">
          <h3 className="fs-5 fw-bold mb-3">Submit New Leave</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Employee ID */}
              <div className="col-md-6">
                <label htmlFor="employeeId" className="form-label">Employee ID</label>
                <input type="number" id="employeeId" className="form-control rounded-pill" value={formData.employeeId} readOnly />
              </div>

              {/* Employee Name */}
              <div className="col-md-6">
                <label htmlFor="employeeName" className="form-label">Employee Name</label>
                <input type="text" id="employeeName" className="form-control rounded-pill" value={formData.employeeName} readOnly />
              </div>

              {/* Leave Type */}
              <div className="col-md-6">
                <label htmlFor="leaveType" className="form-label">Leave Type</label>
                <select id="leaveType" className="form-select rounded-pill" value={formData.leaveType} onChange={handleInputChange} required>
                  <option>Sick</option>
                  <option>Casual</option>
                  <option>Earned</option>
                  <option>Maternity</option>
                  <option>Paternity</option>
                </select>
              </div>

              {/* Start Date */}
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">Start Date</label>
                <input type="date" id="startDate" className="form-control rounded-pill" value={formData.startDate} onChange={handleInputChange} required />
              </div>

              {/* End Date */}
              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">End Date</label>
                <input type="date" id="endDate" className="form-control rounded-pill" value={formData.endDate} onChange={handleInputChange} required />
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label htmlFor="status" className="form-label">Status</label>
                <select id="status" className="form-select rounded-pill" value={formData.status} onChange={handleInputChange} required>
                  <option>Pending</option>
                </select>
              </div>

              <div className="col-12 mt-4 d-flex gap-3">
                <button type="submit" className="btn btn-success rounded-pill px-4" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
                <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setLeaveView("list")}>
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

export default Employee_Leave;
