import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';
import './main.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    const aboutBox = (<div className="about"><h1>Learn Esperanto</h1>
        <h2>Esperanto is a constructed auxiliary language. Its creator was
            Ludovic Lazarus Zamenhof, a Polish eye doctor. He created the
            language to make international communication easier. His goal was
            to design Esperanto in such a way that people can learn it much
            more easily than any other national language.
        </h2>
        <p>With "Lesperanto" you can learn to speak the international language 
            Esperanto in a step by step spaced repition
            pattern!
        </p>
        <p>Learn to communicate globally!</p>

    </div>)
    const login = (<LoginForm />);
    const regButton = (<button>Register</button>);
    const register = (<div className="register"><Link to="/register">{regButton}</Link></div>);
    const wrapped = (<div className="wrapper">{aboutBox}{login}{register}</div>);
            return (
        <main className="splash-page">
                {wrapped}
            </main>
            );
        }
        
const mapStateToProps = state => ({
                loggedIn: state.auth.currentUser !== null
        });
        
        export default connect(mapStateToProps)(LandingPage);
