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
            answered: null
        }
    }
    async componentDidMount() {
        await this.props.dispatch(fetchProtectedData(this.props.userId, this.props.location.state.category));
        this.setState({
            question: this.props.protectedData
        })
    }


    nextWord() {

        this.setState({
            head: null,
            answered: null
        })
    }
    submitAnswer(e) {
        e.preventDefault();
        if (this.state.answered) {
<<<<<<< HEAD
            this.nextWord();
            return;
        }
        if (this.input.value === this.state.question.esperantoAnswer) {
=======
            this.setState({
                answered: null
            })
            return;
        }

        if (this.input.value === arrayElement.esperantoAnswer) {
            arrayElement.score *= 2;
>>>>>>> f3cb4779f024f861ad1756f2917147ef2bd109c2
            this.setState({
                answered: "Correct"
            });
        } else {
            this.setState({
                answered: "Wrong, Correct answer was " 
            });
        }
    }

    logOut(e) {

        this.props.dispatch(logOut())
    }

    render() {
        let logoutButton = (<button onClick={e => this.logOut(e)}>Logout</button>);
        let questionField;
        let word = '';
        if(this.state.question){
            word = this.state.question.esperantoWord;
        }

        if (this.state.answered) {
            questionField = (<h3>{this.state.answered}</h3>)
        }
        else {
            questionField = (<h3>{word}</h3>);
        }
        let buttonField;
        this.state.answered ? buttonField = (<button className="questionButton">next</button>) : buttonField = (<button className="questionButton">Submit</button>);

        return (
            <div>
                <h3 className="welcome">{this.props.location.state.category}</h3>
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
