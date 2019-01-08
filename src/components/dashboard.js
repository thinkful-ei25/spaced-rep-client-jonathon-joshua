import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }
    setFilter(e){
        console.log(e);
    }
    showCats(){
        let animalButton = (<li><button onClick={e => this.setFilter(e)}>Animals</button></li>);
        let foodButton = (<li><button>Food</button></li>);
        let list = (<ul>{animalButton}{foodButton}</ul>)
        return (list);
    }

    render() {
        console.log(this.props.protectedData)
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Welcome: {this.props.username}
                </div>
                <div className="dashboard-protected-data">
                    Select a category: {this.showCats()}


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
        protectedData: state.protectedData.data,
        categories: state.protectedData.categories
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
