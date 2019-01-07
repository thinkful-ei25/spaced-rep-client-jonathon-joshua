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
    const aboutBox = (<div className="about"><h1>Learn Esperanto:</h1>
        <h2>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
            excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
            officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum
            quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
             nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
             placeat facere possimus, omnis voluptas assumenda est, omnis dolor
             repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
             necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae
             non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut
             reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus
             asperiores repellat."

</h2>
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
