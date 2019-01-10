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
            array: null,
            head: null,
            answered: null
        }
    }
    async componentDidMount() {
        await this.props.dispatch(fetchProtectedData(this.props.userId, this.props.location.state.category));
        await this.props.dispatch(fetchHead(this.props.userId));
        this.setState({
            array: this.props.protectedData,
            head: this.props.head,
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
        console.log('clicked');
        if (this.state.answered) {
            this.nextWord(category);
            return;
        }
        if (this.input.value === this.state.array[category][this.state.head[category]].esperantoAnswer) {
            this.setState({
                answered: "Correct"
            });
        } else {
            this.setState({
                answered: "Wrong, Correct answer was " + this.state.array[category][this.state.head[category]].esperantoAnswer
            });
        }
    }

    async logOut(e) {
        await this.props.dispatch(logOut())

        this.props.history.push({
            pathname: '/'
        });



    }

    render() {
        console.log(this.props)
        let category = this.props.location.state.category;
        let word, answer, position;
        let logoutButton = (<button onClick={e => this.logOut(e)}>Logout</button>);
        if (this.state.array && this.state.head) {
            position = this.state.head[category];
            word = this.state.array[category][position].esperantoWord;
            answer = this.state.array[category][position].esperantoAnswer;
        }
        let questionField;

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
                <h3 className="welcome">{category}</h3>
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
