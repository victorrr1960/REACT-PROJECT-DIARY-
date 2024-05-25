import React from "react";
import { useSelector } from "react-redux";
import Entries from "./entries/Entries";

function Dashboard() {
  const username = useSelector((state) => state.auth.username);

  return (
    <div className="dashboard-container">
      <div className="main">
        <h2>Dashboard</h2>
        {username && <p>Welcome, {username}</p>}
        <Entries />
      </div>
    </div>
  );
}

export default Dashboard;
