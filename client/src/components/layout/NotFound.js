import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle'></i> Page Not Found
      </h1>
      <p className='large'>
        Sorry, this page does not exist. Click <Link to='/'>here</Link> to go
        home.
      </p>
    </Fragment>
  );
};

export default NotFound;
