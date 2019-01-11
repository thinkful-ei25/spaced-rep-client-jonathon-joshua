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

    async getNextQuestion(){
        await this.props.dispatch(updateDatabase(this.props.userId, this.props.location.state.category, this.state.question,  this.state.answered));
        await this.props.dispatch(fetchProtectedData(this.props.userId, this.props.location.state.category));
        this.setState({
            question: this.props.protectedData
        })
    }

    submitAnswer(e) {
        e.preventDefault();
        if (this.state.answered !== null) {
            console.log('calling update');
            this.setState({
                answered: null,
            })
            return;
        }
        if (this.input.value === this.state.question.esperantoAnswer) {
            this.setState({
                answered: true
            });
        } else {
            this.setState({
                answered: false
            });
        }
        this.getNextQuestion();
    }

    logOut(e) {

        this.props.dispatch(logOut())
    }

    render() {
        if(this.state.question){
            word = this.state.question.esperantoWord;
        }
        let logoutButton = (<button onClick={e => this.logOut(e)}>Logout</button>);
        let questionField;
        let word = '';
        if(this.state.question){
            word = this.state.question.esperantoWord;
        }

        if (this.state.answered !== null) {
            questionField = (<h3>{this.state.answered ? 'Correct!' : 'Wrong'}</h3>)
        }
        else {
            questionField = (<h3>{word}</h3>);
        }
        let buttonField;
        this.state.answered !== null ? buttonField = (<button className="questionButton">next</button>) : buttonField = (<button className="questionButton">Submit</button>);

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
