import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';
import './landing.css';


export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    const greetingH1 = (<h1>Learn Esperanto</h1>);
    const greetingH2 = (<h2>Esperanto is a constructed auxiliary language. Its creator was
        Ludovic Lazarus Zamenhof, a Polish eye doctor. He created the
        language to make international communication easier. His goal was
        to design Esperanto in such a way that people can learn it much
        more easily than any other national language.
    </h2>);
    const greetingP = (< p > With "Lesperanto" you can learn to speak the international language
        Esperanto in a step by step spaced repition
        pattern!
        </p >);
    const regButton = (<button>Register</button>);
    const login = (<LoginForm />);
    const greeting = (<div className="greeting">{greetingH1}<hr></hr> {greetingH2} {greetingP}</div>);
    const register = (<div className="register"><Link to="/register">{regButton}</Link></div>);
    const greetBox = (<div className="greetBox">{greeting}{login}{register}</div>);

    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <main className="splash-page">
            {greetBox}
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);