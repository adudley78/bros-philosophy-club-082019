import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import About from '../layout/About';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Sparks from '../sparks/Sparks';
import Spark from '../spark/Spark';
import EditSpark from '../spark-forms/EditSpark';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/about' component={About} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/sparks' component={Sparks} />
        <PrivateRoute exact path='/sparks/:id' component={Spark} />
        <PrivateRoute exact path='/edit-spark' component={EditSpark} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
