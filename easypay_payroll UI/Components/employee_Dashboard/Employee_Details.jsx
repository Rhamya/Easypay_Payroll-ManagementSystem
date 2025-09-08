import React, { useState, useEffect } from "react";
import { getLoggedInEmployee, updateById } from "../../service/employeeService";
import dashboardBg from "../../assets/login.png";

const Employee_Details = () => {
  const [activeSection, setActiveSection] = useState("Personal Info");
  const [employee, setEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch logged-in employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getLoggedInEmployee();
        console.log(res);
        setEmployee(res.data);
        setFormData(res.data); // preload form
      } catch (err) {
        console.error(err);
        setError("Failed to load employee details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateById(employee.id, formData); // ✅ send correct ID and updated data
      setEmployee(formData); // update UI
      setEditMode(false);
      alert("Employee updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update employee.");
    }
  };

  if (loading) return <p>Loading employee details...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div
      className="employee-details-container"
      style={{
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container mt-4" style={{ maxWidth: "700px" }}>
        <div
          className="card shadow-sm rounded-4 p-4"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          {activeSection === "Personal Info" && employee && (
            <ul className="list-group list-group-flush">
              {[
                { label: "Employee ID", key: "id" },
                { label: "Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
                { label: "DOB", key: "dob" },
                { label: "Joining Date", key: "dateOfJoining" },
                { label: "Department", key: "department" },
                { label: "Designation", key: "designation" },
                { label: "Manager ID", key: "managerId" },
              ].map(({ label, key }) => (
                <li key={key} className="list-group-item d-flex justify-content-between py-1">
                  <strong>{label}:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleChange}
                      className="form-control form-control-sm w-50"
                    />
                  ) : (
                    employee[key] || "N/A"
                  )}
                </li>
              ))}
            </ul>
          )}

          <div className="d-flex justify-content-end mt-3">
            {editMode ? (
              <>
                <button className="btn btn-success me-2" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee_Details;
