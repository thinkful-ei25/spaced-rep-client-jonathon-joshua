import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchProtectedData } from '../../actions/protected-data';
import LinkedList from '../../algorithms/linkedList';
import './learning.css';

export class Learning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: undefined,
            answered: null
        }
    }
    linkedList = new LinkedList();
    componentDidMount() {
        this.props.dispatch(fetchProtectedData(this.props.location.state.category));
    }

    submitAnswer(e) {
        e.preventDefault();
        if (this.input.value === this.state.word.esperantoAnswer) {
            let pointsUpdate = Object.assign({}, this.state.word);
            pointsUpdate.score = pointsUpdate.score * 2;
            this.setState({
                word: pointsUpdate,
                answered: "Correct"
            });
            this.linkedList.push(this.state.word);
        } else {
            let pointsUpdate = Object.assign({}, this.state.word);
            let tempScore = pointsUpdate.score;
            pointsUpdate.score = 1;
            this.setState({
                word: pointsUpdate,
                answered: "Wrong, Correct answer was " + this.state.word.esperantoAnswer
            });
            this.linkedList.spacedRepitition(this.state.word, tempScore);
        }
        console.log(this.linkedList.print());
    }

    initiateQuestionDatabase() {
        if (this.props.protectedData.length < 2) {
            return;
        }
        for (let i = 0; i < this.props.protectedData.length; i++) {
            this.linkedList.push(this.props.protectedData[i]);
        }
        this.setState({
            word: this.linkedList.pop()
        })
    }

    nextWord() {
        this.setState({
            word: this.linkedList.pop(),
            answered: null
        })
    }



    render() {
        if (!this.linkedList.head) {
            this.initiateQuestionDatabase()
        }
        let questionField;
        if (this.state.answered) {
            questionField = (<h3>{this.state.answered}</h3>)
        }
        else {
            questionField = (<h3>{this.state.word ? this.state.word.esperantoWord : ''}</h3>);
        }
        let buttonField;
        this.state.answered ? buttonField = (<button className="questionButton" onClick={e => this.nextWord(e)}>next</button>) : buttonField = (<button className="questionButton" onClick={e => this.submitAnswer(e)}>Submit</button>);

        return (
            <div>
                <h3 className="welcome">{this.props.location.state.category}</h3>
                <div className="dashboard">
                    <div className="question">
                        {questionField}
                    </div>
                    <label>
                        <input type="text" className="questionInput" placeholder="type your answer here" ref={node => (this.input = node)}></input>
                    </label>
                    {buttonField}
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

export default requiresLogin()(connect(mapStateToProps)(Learning));
