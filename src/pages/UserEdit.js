import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function UserEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "editor",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((res) => {
        setForm({ ...res.data, password: "" }); // Don’t prefill password
      })
      .catch(() => setError("User not found"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const updateData = {
        name: form.name,
        email: form.email,
        role: form.role,
      };
      if (form.password) updateData.password = form.password;

      await api.put(`/users/${id}`, updateData);
      navigate("/users");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>Edit User</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>New Password (optional)</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            name="role"
            className="form-control"
            value={form.role}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <button type="submit" className="btn btn-warning w-100">
          Update
        </button>
      </form>
    </div>
  );
}

export default UserEdit;
