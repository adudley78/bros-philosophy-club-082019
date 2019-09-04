import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    background,
    beliefs,
    user: { name }
  }
}) => (
  <div className='profile-about bg-light p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
    {background && (
      <Fragment>
        <h2 className='text-primary'>Background</h2>
        <p>{background}</p>
        <div className='line' />
      </Fragment>
    )}
    {beliefs && (
      <Fragment>
        <h2 className='text-primary'>Beliefs</h2>
        <p>{beliefs}</p>
        <div className='line' />
      </Fragment>
    )}
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
