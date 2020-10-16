import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>{
  return (
    <Fragment>
    {alerts != null && alerts.length > 0 && (
      <div className="my-2 py-1"></div>
    )}
      {
          alerts != null &&
          alerts.length > 0 &&
          alerts.map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              {alert.msg}
            </div>
          ))
      }
    </Fragment>
  )
}


Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
