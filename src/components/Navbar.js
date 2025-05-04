import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/users">
          Admin Dashboard
        </Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-light">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
