import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import UserCreate from "./pages/UserCreate";
import UserEdit from "./pages/UserEdit";
import UserView from "./pages/UserView";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={token ? <UserList /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/new"
          element={token ? <UserCreate /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/:id/edit"
          element={token ? <UserEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/:id"
          element={token ? <UserView /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
