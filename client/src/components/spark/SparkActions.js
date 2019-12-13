import React from 'react';
import { Link } from 'react-router-dom';

const SparkActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-spark' className='btn btn-light'>
        <i className='fas fa-edit text-primary'></i> Edit Spark
      </Link>
    </div>
  );
};

export default SparkActions;
