import React, { Fragment, useState } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import SparkItem from './SparkItem';
// import SparkForm from '.,/sparks/SparkForm';
// import { getSparks } from '../../actions/spark';

const EditSpark = () => {
  // useEffect(() => {
  //   getSparks();
  // }, [getSparks]);
  const [text, setText] = useState('');

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Spark</h1>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Edit your spark and click save to update it.</h3>
        </div>
      </div>
      <form
        className='form my-1'
        // onSubmit={e => {
        //   e.preventDefault();
        //   addSpark({ text });
        //   setText('');
        // }}
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
        <input type='submit' className='btn btn-dark my-1' value='Save' />
      </form>
    </Fragment>
  );
};

// Sparks.propTypes = {
//   getSparks: PropTypes.func.isRequired,
//   spark: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   spark: state.spark
// });

// export default connect(mapStateToProps, { getSparks })(EditSpark);

export default EditSpark;
