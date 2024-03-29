import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSpark } from '../../actions/spark';

const SparkForm = ({ addSpark }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>
          A Spark is a conversation starter! Post one now to "spark" a
          conversation.
        </h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addSpark({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a spark'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

SparkForm.propTypes = {
  addSpark: PropTypes.func.isRequired
};

export default connect(
  null,
  { addSpark }
)(SparkForm);
