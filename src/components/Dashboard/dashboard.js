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
        const welcomeBanner = (<div className="hello"><h3>Welcome: {this.props.username}</h3>
        <h2>Select a Category to Learn!</h2></div>)
        const animals = (<button className="topicButton" value="animals"
            onClick={(e) => this.startLearning(e)}>Animals</button>
        );
        const animalsTwo = (<button className="topicButton" value="animalsTwo"
            onClick={(e) => this.startLearning(e)}>Animals Two</button>
        );
        const food = (<button className="topicButton" value="food"
            onClick={(e) => this.startLearning(e)}>Food</button>
        );
        const places = (<button className="topicButton" value="places"
            onClick={(e) => this.startLearning(e)}>Places</button>
        );
        const technology = (<button className="topicButton" value="technology"
            onClick={(e) => this.startLearning(e)}>Technology</button>
        );
        const locations = (<button className="topicButton" value="locations"
            onClick={(e) => this.startLearning(e)}>Locations</button>
        );
        const directions = (<button className="topicButton" value="directions"
            onClick={(e) => this.startLearning(e)}>Directions</button>
        );
        const phrases = (<button className="topicButton" value="phrases"
            onClick={(e) => this.startLearning(e)}>Phrases</button>
        );
        const dash = (<div className="selector">{animals}{animalsTwo}{food}{places}
            {technology}{locations}{directions}{phrases}</div>)
        return (
            <main className="mainDashboard">
                {welcomeBanner}
                {dash}
            </main>
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
