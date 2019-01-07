import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import './navbar.css';
import { Link } from "react-router-dom";


export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }



    render() {
        const logOutButton = (<button onClick={() => this.logOut()}>Log out</button>);
        const logoLink = (<Link to='/' className="left" >Logo</Link>);
        // Only render the log out button if we are logged in
        const navBar = (<nav className="navbar">

            <h1><ul>
                <li className="logo">{logoLink}</li>
            </ul>
            </h1>
        </nav>);
        if (this.props.loggedIn) {
            const navBar = (<nav className="navbar">

                <h1><ul>
                    <li className="logo">logo</li>
                    <li>{logOutButton}</li>
                </ul>
                </h1>
            </nav>);
        }
        return (
            <main>{navBar}</main>

        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
