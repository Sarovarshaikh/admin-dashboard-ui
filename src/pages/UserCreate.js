import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function UserCreate() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/users", form);
      navigate("/users");
    } catch (err) {
      setError(err.response?.data?.message || "User creation failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>Create New User</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            name="role"
            className="form-control"
            onChange={handleChange}
            value={form.role}
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Create
        </button>
      </form>
    </div>
  );
}

export default UserCreate;
