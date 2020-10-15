import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from '../auth/Login'


const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
    <div className="my-2 py-1"></div>
      <div className="dark-overlay">
        <div className="landing-inner">
          <div style={{textAlign: "left"}}>
            <h1 className="x-large">Developers' <br/> <span style={{color:"#ffbf5e"}}>Connect</span> </h1>
            <p className="lead">
              An online Platform to meet new Developers
            </p>
          </div>
          <div className="loginForm">
            <Login/>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
