import React from 'react';
import PropTypes from 'prop-types';
// When calling an action or getting state implement connect to interact with Redux store
import { connect } from 'react-redux';

// Map through alerts and output a <div> with alert message
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

// Map Redux state to prop in this component for access to it via alert reducer
const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
