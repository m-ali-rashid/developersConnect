import React from "react";
import { NavLink } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <NavLink to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </NavLink>
      <NavLink to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </NavLink>
      <NavLink to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </NavLink>
    </div>
  );
};

export default DashboardActions;
