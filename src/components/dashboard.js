import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    // listCategories() {
    //     let returnString = '<li>'
    //     for(let i = 0; i < this.props.protectedData.length; i++){
    //         console.log(this.props.protectedData[i]);
    //         returnString += this.props.protectedData[i].category;
    //         returnString += '</li>';
    //     }
    //     return returnString;
    // }

    render() {
        console.log(this.props.protectedData)
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Welcome: {this.props.username}
                </div>
                <div className="dashboard-protected-data">
                    {/* Select a category: <ul>{this.listCategories()}</ul> */}


                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
