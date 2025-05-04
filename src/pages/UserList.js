import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
        <Link to="/users/new" className="btn btn-success">
          + Add User
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <Link
                    to={`/users/${user.id}`}
                    className="btn btn-sm btn-info me-1"
                  >
                    View
                  </Link>
                  <Link
                    to={`/users/${user.id}/edit`}
                    className="btn btn-sm btn-warning me-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-sm btn-danger"
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
  );
}

export default UserList;
