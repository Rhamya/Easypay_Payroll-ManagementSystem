import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../service/adminService";

const EmployeeManagement = () => {
  const [view, setView] = useState("list");
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    dateOfJoining: "",
    department: "",
    designation: "",
    managerId: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (err) {
      setError("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  setLoading(true);
  setError(null);
  try {
    const response = await deleteEmployee(id);
    if (response.status === 200) {
      alert("Employee deleted successfully!");
      // Remove from local state
      setEmployees(employees.filter((emp) => emp.empId !== id));
    } else {
      setError("Failed to delete employee.");
    }
  } catch (err) {
    console.error(err);
    setError("Failed to delete employee. Check permissions.");
  } finally {
    setLoading(false);
  }
};


  const handleEdit = (employee) => {
    setFormData({
      name: employee.name || "",
      email: employee.email || "",
      phone: employee.phone || "",
      dob: employee.dob || "",
      dateOfJoining: employee.dateOfJoining || "",
      department: employee.department || "",
      designation: employee.designation || "",
      managerId: employee.managerId || "",
    });
    setEditMode(true);
    setEditId(employee.empId);
    setView("add");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

 const validateForm = () => {
  if (!formData.name.trim()) return "Name is required.";
  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Invalid email address.";

  // Check email uniqueness
  if (employees.some(emp => emp.email === formData.email && emp.empId !== editId)) {
    return "Email already exists!";
  }

  if (!/^\d{10}$/.test(formData.phone)) return "Phone number must be 10 digits.";

  // Check phone uniqueness
  if (employees.some(emp => emp.phone === formData.phone && emp.empId !== editId)) {
    return "Phone number already exists!";
  }

  if (!formData.dob) return "Date of Birth is required.";

  // DOB age check
  const dobDate = new Date(formData.dob);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  const dayDiff = today.getDate() - dobDate.getDate();
  const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

  if (actualAge < 21 || actualAge > 60) return "Employee age must be between 21 and 60.";

  if (!formData.dateOfJoining) return "Joining Date is required.";

  const dojDate = new Date(formData.dateOfJoining);
  if (dojDate < dobDate) return "Joining Date cannot be before Date of Birth.";
  if (dojDate > today) return "Joining Date cannot be in the future.";

  if (!formData.department.trim()) return "Department is required.";
  if (!formData.designation.trim()) return "Designation is required.";
  if (!formData.managerId) return "Manager ID is required.";

  return null;
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationError = validateForm();
  if (validationError) {
    alert(validationError);
    return;
  }

  setLoading(true);
  setError(null);

  try {
    if (editMode) {
      const response = await updateEmployee(editId, formData);
      if (response.status === 200) {
        alert("Employee updated successfully!");
      } else {
        setError("Failed to update employee.");
      }
    } else {
      const response = await createEmployee(formData);
      if (response.status === 201) {
        alert("Employee created successfully!");
      } else {
        setError("Failed to create employee.");
      }
    }

    handleCancel(); // Reset form
    loadEmployees(); // Reload employees from server
  } catch (err) {
    console.error(err);
    setError("Failed to save employee. Check permissions.");
  } finally {
    setLoading(false);
  }
};


  const handleCancel = () => {
    resetForm();
    setEditMode(false);
    setEditId(null);
    setView("list");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      dob: "",
      dateOfJoining: "",
      department: "",
      designation: "",
      managerId: "",
    });
  };

  // Excel download
  const downloadExcel = () => {
    const dataToExport = employees.map(
      ({ empId, name, email, phone, dob, dateOfJoining, department, designation, managerId }) => ({
        empId,
        name,
        email,
        phone,
        dob,
        dateOfJoining,
        department,
        designation,
        managerId,
      })
    );
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "Employees.xlsx");
  };

  // Search handlers
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = employees.filter(
      (emp) =>
        emp.name?.toLowerCase().includes(query) ||
        emp.department?.toLowerCase().includes(query) ||
        // emp.designation?.toLowerCase().includes(query) ||
        emp.managerId?.toString().includes(query)
    );
    setEmployees(filtered);
  };

  const handleReset = () => {
    setSearchQuery("");
    loadEmployees();
  };

  return (
    <div className="p-4">
      <h5 className="text-white">Add, view, edit, or delete employees.</h5>

      {/* Buttons and search */}
      <div className="mt-4 mb-4 d-flex align-items-center gap-3">
        {/* View & Add */}
        <div className="d-flex gap-2">
          <button
            className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-outline-light"}`}
            onClick={() => setView("list")}
          >
            View Employees
          </button>

          <button
            className={`btn btn-sm ${view === "add" && !editMode ? "btn-success" : "btn-outline-light"}`}
            onClick={() => {
              setView("add");
              setEditMode(false);
              resetForm();
            }}
          >
            Add Employee
          </button>
        </div>

        {/* Search input */}
        <div className="d-flex gap-2 flex-grow-1">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search by Name, Dept, Desig, ManagerID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
             style={{ maxWidth: "400px" }}
          />
          <button className="btn btn-sm btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button className="btn btn-sm btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* Excel */}
        <button className="btn btn-sm btn-success ms-auto" onClick={downloadExcel}>
          ⬇ Download Excel
        </button>
      </div>

      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* List View */}
      {view === "list" && (
        <div className="card shadow-sm rounded-3 p-4 mt-4">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Joining Date</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Manager ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.empId}>
                    <td>{emp.empId}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.dob}</td>
                    <td>{emp.dateOfJoining}</td>
                    <td>{emp.department || "-"}</td>
                    <td>{emp.designation || "-"}</td>
                    <td>{emp.managerId || "-"}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(emp)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.empId)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit View */}
      {view === "add" && (
        <div className="card shadow-sm rounded-3 p-4 mt-4">
          <h3 className="fs-5 fw-bold mb-3">{editMode ? "Edit Employee" : "Add New Employee"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {[
                { id: "name", label: "Name" },
                { id: "email", label: "Email", type: "email" },
                { id: "phone", label: "Phone", type: "tel" },
                { id: "dob", label: "Date of Birth", type: "date" },
                { id: "dateOfJoining", label: "Joining Date", type: "date" },
                { id: "department", label: "Department" },
                { id: "designation", label: "Designation" },
                { id: "managerId", label: "Manager ID", type: "number" },
              ].map(({ id, label, type = "text" }) => (
                <div className="col-md-6" key={id}>
                  <label htmlFor={id} className="form-label">{label}</label>
                  <input
                    type={type}
                    className="form-control rounded-pill"
                    id={id}
                    value={formData[id]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
              <div className="col-12 mt-4 d-flex gap-3">
                <button type="submit" className="btn btn-success rounded-pill px-4">
                  {editMode ? "Update Employee" : "Save Employee"}
                </button>
                {editMode && (
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={handleCancel}
                  >
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

export default EmployeeManagement;
