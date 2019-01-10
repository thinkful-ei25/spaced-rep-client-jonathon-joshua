import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchProtectedData, fetchHead } from '../../actions/protected-data';
import { logOut } from '../../actions/auth';
import './learning.css';

export class Learning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: null,
        }
    }
    async componentDidMount() {
        await this.props.dispatch(fetchProtectedData(this.props.userId, this.props.location.state.category));
        this.setState({
            question: this.props.protectedData
        })
    }


    nextWord(category) {
        let newHead = Object.assign({}, this.state.head);
        newHead[category] += 1;
        this.setState({
            head: newHead,
            answered: null
        })
    }
    submitAnswer(e) {
        e.preventDefault();
        let category = this.props.location.state.category;
        if (this.state.answered) {
            this.nextWord(category);
            return;
        }
        let arrayElement = this.state.array[category][this.state.head[category]];
        if (this.input.value === arrayElement.esperantoAnswer) {
            arrayElement.score *= 2;
            this.setState({
                answered: "Correct"
            });
        } else {
            this.setState({
                answered: "Wrong, Correct answer was " + arrayElement.esperantoAnswer
            });
        }
    }

    logOut(e) {

        this.props.dispatch(logOut())
    }

    render() {
        console.log(this.state.question)
        console.log(this.props.protectedData);
        let logoutButton = (<button onClick={e => this.logOut(e)}>Logout</button>);
        let questionField;
        if (this.state.answered) {
            questionField = (<h3>{this.state.answered}</h3>)
        }
        else {
            questionField = (<h3>test</h3>);
        }
        let buttonField;
        this.state.answered ? buttonField = (<button className="questionButton">next</button>) : buttonField = (<button className="questionButton">Submit</button>);

        return (
            <div>
                <h3 className="welcome">test</h3>
                <div className="dashboard">
                    <div className="question">
                        {questionField}
                    </div>
                    <form onSubmit={e => this.submitAnswer(e)}>
                        <label>
                            <input type="text" className="questionInput" placeholder="type your answer here" ref={node => (this.input = node)}></input>
                            {buttonField}
                        </label>
                    </form>
                </div>
                {logoutButton}
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
        categories: state.protectedData.categories,
        userId: currentUser._id,
        head: state.protectedData.head,
        token: state.auth
    };
};

export default requiresLogin()(connect(mapStateToProps)(Learning));
