import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addUpvote, removeUpvote, deleteSpark } from '../../actions/spark';

const SparkItem = ({
  addUpvote,
  removeUpvote,
  deleteSpark,
  auth,
  spark: { _id, text, name, avatar, user, upvotes, comments, date },
  showActions
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <button
            onClick={() => addUpvote(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{' '}
            {upvotes.length > 0 && <span>{upvotes.length}</span>}
          </button>
          <button
            onClick={() => removeUpvote(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/sparks/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          <Link to={`/edit-spark/${_id}`} className='btn btn-light'>
            <i className='fas fa-edit text-primary'></i> Edit Spark{' '}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteSpark(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

SparkItem.defaultProps = {
  showActions: true
};

SparkItem.propTypes = {
  spark: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addUpvote: PropTypes.func.isRequired,
  removeUpvote: PropTypes.func.isRequired,
  deleteSpark: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  addUpvote,
  removeUpvote,
  deleteSpark
})(SparkItem);
