import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "./authSlice";

import "./App.css";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import UserRegistration from "./components/Registration";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link to="/registration">Registration</Link>
              </li>
            )}

            {!isAuthenticated && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<UserRegistration />} />

          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
