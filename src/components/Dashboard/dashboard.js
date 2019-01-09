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
        this.props.dispatch(fetchProtectedData());
    }
    
    startLearning(e) {
        this.props.history.push({
            pathname: '/learning',
            state: {
                category: e.target.value
            }
        });
        console.log(e.target.value);
    }

    render() {
        // let submitButton = ();
        return (
            <div>
                <h3 className="welcome">Welcome: {this.props.username}</h3>
                <div className="dashboard">
                    <button className="topicButton" value="animals" onClick={(e) => this.startLearning(e)}>Animals</button>
                    <button disabled={true} className="topicButton" value="Animals Two" onClick={(e) => this.startLearning(e)}>Animals Two</button>

                    <button disabled={true} className="topicButton" value="Food" onClick={(e) => this.startLearning(e)}>Food</button>
                    <button disabled={true} className="topicButton" value="Places" onClick={(e) => this.startLearning(e)}>Places</button>

                    <button disabled={true} className="topicButton" value="Phrases" onClick={(e) => this.startLearning(e)}>Phrases</button>
                    <button disabled={true} className="topicButton" value="Locations" onClick={(e) => this.startLearning(e)}>Locations</button>

                    <button disabled={true} className="topicButton" value="Directions" onClick={(e) => this.startLearning(e)}>Directions</button>
                    <button disabled={true} className="topicButton" value="Destinations" onClick={(e) => this.startLearning(e)}>Destinations</button>

                    <button disabled={true} className="topicButton" value="Descriptions" onClick={(e) => this.startLearning(e)}>Descriptions</button>
                    <button disabled={true} className="topicButton" value="Technology" onClick={(e) => this.startLearning(e)}>Technology</button>
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
