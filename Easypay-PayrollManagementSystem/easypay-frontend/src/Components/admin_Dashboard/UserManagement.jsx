import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../service/adminService";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("list"); // 'list' or 'add'
  const [form, setForm] = useState({ username: "", password: "", role: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessageType("danger");
      setMessage("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.username.trim()) return "Username is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Invalid email format.";
    if (!editing && !/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(form.password)) return "Password must be at least 8 characters, include one uppercase letter and one special character.";
    if (!form.role) return "Role is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setMessageType("danger");
      setMessage(validationError);
      return;
    }

    try {
      if (editing) {
        const payload = { ...form };
        if (!form.password) delete payload.password;
        await updateUser(editId, payload);
        setMessageType("success");
        setMessage("User updated successfully!");
      } else {
        await createUser(form);
        setMessageType("success");
        setMessage("User added successfully!");
      }
      setForm({ username: "", password: "", role: "", email: "" });
      setEditing(false);
      setEditId(null);
      setView("list"); // Go back to list view after adding
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessageType("danger");
      setMessage("Operation failed.");
    }
  };

  const handleEdit = (user) => {
    setForm({ username: user.username, password: "", role: user.role, email: user.email });
    setEditing(true);
    setEditId(user.userId);
    setView("add"); // edit uses same form page
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers();
        setMessageType("success");
        setMessage("User deleted successfully!");
      } catch (err) {
        console.error(err);
        setMessageType("danger");
        setMessage("Delete failed.");
      }
    }
  };

  // Excel export without password
  const downloadExcel = () => {
    const dataToExport = users.map(({ userId, username, role, email }) => ({
      userId,
      username,
      role,
      email,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "Users.xlsx");
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-light">User Management</h2>

      {message && <div className={`alert alert-${messageType}`}>{message}</div>}

      {view === "list" && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-light">Users List</h5>
            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={downloadExcel}
              >
                ⬇ Download Excel
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setView("add")}>
                ➕ Add User
              </button>
            </div>
          </div>

          <table className="table table-bordered table-striped bg-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Email</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {view === "add" && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
              <h5 className="mb-3">{editing ? "Edit User" : "Add User"}</h5>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="form-control mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="form-control mb-2"
              />
              <input
                type="password"
                name="password"
                placeholder={editing ? "Leave blank to keep current password" : "Password"}
                value={form.password}
                onChange={handleChange}
                className="form-control mb-2"
                required={!editing}
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="form-control mb-2"
              >
                <option value="">Select Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="PAYROLL_PROCESSOR">PAYROLL_PROCESSOR</option>
              </select>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary w-100">
                  {editing ? "Update User" : "Add User"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={() => {
                    setView("list");
                    setEditing(false);
                    setForm({ username: "", password: "", role: "", email: "" });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
