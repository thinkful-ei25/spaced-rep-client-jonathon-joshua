import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchProtectedData, fetchHead } from '../../actions/protected-data';
import './learning.css';

export class Learning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: undefined,
            answered: null
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchProtectedData(this.props.userId, this.props.location.state.category));
        this.props.dispatch(fetchHead(this.props.userId))
    }

    submitAnswer(e) {
        e.preventDefault();
        console.log('clicked');
        if(this.state.answered){
            this.nextWord();
            return;
        }
        if (this.input.value === this.state.word.esperantoAnswer) {
            let pointsUpdate = Object.assign({}, this.state.word);
            pointsUpdate.score = pointsUpdate.score * 2;
            this.setState({
                word: pointsUpdate,
                answered: "Correct"
            });
        } else {
            let pointsUpdate = Object.assign({}, this.state.word);
            let tempScore = pointsUpdate.score;
            pointsUpdate.score = 1;
            this.setState({
                word: pointsUpdate,
                answered: "Wrong, Correct answer was " + this.state.word.esperantoAnswer
            });
        }
    }

    render() {
        let category = this.props.location.state.category;
        console.log(this.props.protectedData[category]);
        console.log(this.props.head);
        let questionField;
        if (this.state.answered) {
            questionField = (<h3>{this.state.answered}</h3>)
        }
        else {
            questionField = (<h3>{this.state.word ? this.state.word.esperantoWord : ''}</h3>);
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
        head: state.protectedData.head
    };
};

export default requiresLogin()(connect(mapStateToProps)(Learning));
