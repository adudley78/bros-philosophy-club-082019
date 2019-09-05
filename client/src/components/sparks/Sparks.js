import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import SparkItem from './SparkItem';
import { getSparks } from '../../actions/spark';

const Sparks = ({ getSparks, spark: { sparks, loading } }) => {
  useEffect(() => {
    getSparks();
  }, [getSparks]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Sparks</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      {/* PostForm */}
      <div className='posts'>
        {sparks.map(spark => (
          <SparkItem key={spark._id} spark={spark} />
        ))}
      </div>
    </Fragment>
  );
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
