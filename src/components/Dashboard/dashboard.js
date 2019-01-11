import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchProtectedData } from '../../actions/protected-data';
import LinkedList from '../../algorithms/linkedList';
import '../../index.css';
import './dashboard.css';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: undefined,
            correct: false
        }
    }
    linkedList = new LinkedList();
    componentDidMount() {
    }
    
    startLearning(e) {
        this.props.history.push({
            pathname: '/learning',
            state: {
                category: e.target.value,
                userId: this.props.userId
            }
        });
    }

    render() {
        // let submitButton = ();
        return (
            <div>
                <h3 className="welcome">Welcome: {this.props.username}</h3>
                <div className="dashboard">
                    <button className="topicButton" value="animals" onClick={(e) => this.startLearning(e)}>Animals</button>
                    <button className="topicButton" value="animalsTwo" onClick={(e) => this.startLearning(e)}>Animals Two</button>

                    <button className="topicButton" value="food" onClick={(e) => this.startLearning(e)}>Food</button>
                    <button className="topicButton" value="places" onClick={(e) => this.startLearning(e)}>Places</button>

                    <button className="topicButton" value="technology" onClick={(e) => this.startLearning(e)}>Technology</button>
                    <button className="topicButton" value="locations" onClick={(e) => this.startLearning(e)}>Locations</button>

                    <button className="topicButton" value="Directions" onClick={(e) => this.startLearning(e)}>Directions</button>
                    <button className="topicButton" value="phrases" onClick={(e) => this.startLearning(e)}>Phrases</button>

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
        userId: currentUser._id,
        category: state.protectedData.category
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
