import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function UserView() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => setError("User not found"));
  }, [id]);

  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (!user) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>User Details</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>ID:</strong> {user.id}
        </li>
        <li className="list-group-item">
          <strong>Name:</strong> {user.name}
        </li>
        <li className="list-group-item">
          <strong>Email:</strong> {user.email}
        </li>
        <li className="list-group-item">
          <strong>Role:</strong> {user.role}
        </li>
        <li className="list-group-item">
          <strong>Created At:</strong>{" "}
          {new Date(user.createdAt).toLocaleString()}
        </li>
      </ul>
    </div>
  );
}

export default UserView;
