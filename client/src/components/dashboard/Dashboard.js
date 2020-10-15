import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  deleteAccount,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
    <div className="my-1 py-1"></div>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead text-white">
        <i className="fas fa-user"></i>{' '}
        Welcome<span className="text-primary"> {user && user.name}</span>
      </p>
      {profile === null || profile.msg === "Bad Request" ? (
        <Fragment>
          <p>You have not yet setup a profile. Please Add some info</p>
          <NavLink to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </NavLink>
        </Fragment>
      ) : (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      )}
      {/* {profile != null ? (
        <Fragment>Has Profile</Fragment>
      ) : (
        <Fragment>No Profile</Fragment>
      )} */}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
