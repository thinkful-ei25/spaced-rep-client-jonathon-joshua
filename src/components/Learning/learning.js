import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchProtectedData, updateDatabase } from '../../actions/protected-data';
import { logOut } from '../../actions/auth';
import './learning.css';


export class Learning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answered: null,
            guesses: 0,
            right: 0
        }
    }

    async componentDidMount() {
        await this.props.dispatch(fetchProtectedData(this.props.userId, this.props.location.state.category));
    }

    getNextQuestion(answered) {
        this.props.dispatch(updateDatabase(this.props.userId, this.props.location.state.category, this.props.protectedData, answered));
    }

    calculateScore() {
        return (`score: ${this.state.right}/${this.state.guesses}`);
    }
    submitAnswer(e) {
        e.preventDefault();
        let guess = this.input.value.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        let answer = this.props.protectedData.esperantoAnswer.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        guess = guess.toLowerCase();
        answer = answer.toLowerCase();
        guess = guess.replace(/\s+/g, '');
        answer = answer.replace(/\s+/g, '');
        this.props.dispatch(fetchProtectedData(this.props.userId, this.props.location.state.category));
        if (this.state.answered !== null) {
            this.setState({
                answered: null,
            })
            return;
        }
        if (guess === answer) {
            let newGuesses = this.state.guesses += 1;
            let newRight = this.state.right += 1;
            this.setState({
                answered: true,
                guesses: newGuesses,
                right: newRight
            });
        } else {
            let newGuesses = this.state.guesses += 1;
            this.setState({
                answered: false,
                guesses: newGuesses
            });
        }
        this.getNextQuestion(this.input.value === this.props.protectedData.esperantoAnswer);
    }

    logOut(e) {

        this.props.dispatch(logOut())
    }

    render() {
        if (this.props.protectedData) {
            word = this.props.protectedData.esperantoWord;
        }
        let questionField;
        let word = '';
        if (this.props.protectedData) {
            word = this.props.protectedData.esperantoWord;
        }

        if (this.state.answered !== null) {
            questionField = (<h3>{this.state.answered ? 'Correct!' : `Wrong, the correct answer 
            was ${this.props.protectedData.esperantoAnswer}`}</h3>)
        }
        else {
            questionField = (<h3 className="questionWord">{word}</h3>);
        }
        let buttonField;
        this.state.answered !== null ? buttonField = (<button className="questionButton">next</button>) : buttonField = (<button className="questionButton">Submit</button>);
        const welcomeField = (<div className="learningGreet">You are Learning: {this.props.location.state.category}</div>);
        const score = (<h2 className="score">{this.calculateScore()}</h2>);
        const answer = (<form onSubmit={e => this.submitAnswer(e)}>

            <label>
                <input type="text" className="questionInput" placeholder="type your answer here" ref={node => (this.input = node)}></input>
                {buttonField}
            </label>
        </form>);
        let logoutButton = (<button className="logout" onClick={e => this.logOut(e)}>Logout</button>);

        const learningField = (<div className="questionArea"> {score}{questionField}{answer}</div>);
        return (
            <main className="training">
                {welcomeField}
                {learningField}
                {logoutButton}
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
        categories: state.protectedData.categories,
        userId: currentUser._id,
        head: state.protectedData.head,
        token: state.auth
    };
};

export default requiresLogin()(connect(mapStateToProps)(Learning));
