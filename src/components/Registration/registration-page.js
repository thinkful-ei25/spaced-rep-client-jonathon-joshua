import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';
import './registration.css';
export function RegistrationPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  const loginButton = <button>Return to Login</button>;
  const loginLink = (
    <Link to="/" className="login-link">
      {loginButton}
    </Link>
  );
  const title = <h2 className="login-title">Sign up to learn!</h2>;
  const wrapped = (
    <div className="reg-comp">
      {title}
      <RegistrationForm />
      {loginLink}
    </div>
  );
  return <main className="registration">{wrapped}</main>;
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(RegistrationPage);
