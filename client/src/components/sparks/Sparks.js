// Parent
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getSparks } from '../../actions/spark';

const Sparks = ({ getSparks, spark: { sparks, loading } }) => {
  useEffect(() => {
    getSparks();
  }, [getSparks]);

  return <div></div>;
};

Sparks.propTypes = {
  getSparks: PropTypes.func.isRequired,
  spark: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  spark: state.spark
});

export default connect(
  mapStateToProps,
  { getSparks }
)(Sparks);
