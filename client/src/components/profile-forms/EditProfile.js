import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'; // withRouter necessary to use history
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    profession: '',
    website: '',
    blog: '',
    location: '',
    status: '',
    bio: '',
    background: '',
    beliefs: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      profession: loading || !profile.profession ? '' : profile.profession,
      website: loading || !profile.website ? '' : profile.website,
      blog: loading || !profile.blog ? '' : profile.blog,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      bio: loading || !profile.bio ? '' : profile.bio,
      background: loading || !profile.background ? '' : profile.background,
      beliefs: loading || !profile.beliefs ? '' : profile.beliefs,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

  // Destructure
  const {
    profession,
    website,
    blog,
    location,
    status,
    bio,
    background,
    beliefs,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  // Whatever the value is of the text field will be put into the state of the form data
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Complete this form with as much quality
        detail as possible to make your profile stand out!
      </p>
      <p>
        Note: For now, if you want a profile photo, create a Gravatar by signing
        up and adding a profile photo at{' '}
        <Link to='https://en.gravatar.com/' target='_blank'>
          this link{' '}
        </Link>
        and it will automagically show up on your BPC profile. However, be sure
        to sign up for Gravatar with the same email address that you used to
        sign up for your BPC account or else the magic won't work!
      </p>
      <br />
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={e => onChange(e)}>
            <option value='0'>* Select Your Religion</option>
            <option value='Christian'>Christian</option>
            <option value='Christian-Catholic'>Christian-Catholic</option>
            <option value='Christian-Protestantism'>
              Christian-Protestantism
            </option>
            <option value='Christian-Other'>Christian-Other</option>
            <option value='Islam'>Islam</option>
            <option value='Secular/Nonreligious/Agnostic/Atheist'>
              Unaffiliated: Secular/Nonreligious/Agnostic/Atheist
            </option>
            <option value='Hinduism'>Hinduism</option>
            <option value='Buddhism'>Buddhism</option>
            <option value='Folk Religion'>Folk Religion</option>
            <option value='Judaism'>Judaism</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of how you most identify religiously
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Profession'
            name='profession'
            value={profession}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Could be your vocation or avocation
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Blog'
            name='blog'
            value={blog}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company blog
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Orlando, FL)
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className='form-text'>
            Tell us a little about yourself (200 characters or less suggested)
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A brief summary of your background'
            name='background'
            value={background}
            onChange={e => onChange(e)}
          ></textarea>
          <small className='form-text'>
            Tell us a little about your experiences in the world that you think
            make you who you are
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short summary of your beliefs'
            name='beliefs'
            value={beliefs}
            onChange={e => onChange(e)}
          ></textarea>
          <small className='form-text'>
            Tell us a little about your beliefs
          </small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

// Wrapping CreateProfile necessary to enable use of history object
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
