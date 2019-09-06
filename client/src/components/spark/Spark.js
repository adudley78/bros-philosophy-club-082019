import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import SparkItem from '../sparks/SparkItem';
import { getSpark } from '../../actions/spark';

const Spark = ({ getSpark, spark: { spark, loading }, match }) => {
  useEffect(() => {
    getSpark(match.params.id);
  }, [getSpark]);

  return loading || spark === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/sparks' className='btn'>
        Back to Sparks
      </Link>
      <SparkItem spark={spark} showActions={false} />
    </Fragment>
  );
};

Spark.propTypes = {
  getSpark: PropTypes.func.isRequired,
  spark: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  spark: state.spark
});

export default connect(
  mapStateToProps,
  { getSpark }
)(Spark);
