import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchProtectedData } from '../../actions/protected-data';
import LinkedList from '../../algorithms/linkedList';
import './learning.css';

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
    setFilter(e) {
        console.log(e);
    }

    guessedWrong() {

        console.log('Wrong');
    }

    guessedRight() {
        console.log('Right');
    }

    submitAnswer(e) {
        e.preventDefault();
        if (this.input.value === this.state.word.esperantoAnswer) {
            let anything = Object.assign({}, this.state.word);
            anything.score = 1;
            this.setState({
                word: anything,
                correct: true
            });
            console.log(anything);
        } else {
            let anything = Object.assign({}, this.state.word);
            anything.score = anything.score * 2;
            this.setState({
                word: anything,
                correct: false
            });
            console.log(anything);
        }
    }

    initiateQuestionDatabase() {
        if (this.props.protectedData.length < 2) {
            console.log('returning');
            return;
        }
        console.log(this.props.protectedData.length);
        for (let i = 0; i < this.props.protectedData.length; i++) {
            this.linkedList.push(this.props.protectedData[i]);
            console.log('pushed ' + this.props.protectedData[i])
        }
        this.setState({
            word: this.linkedList.pop()
        })
    }

    nextWord() {
        this.linkedList.push(this.state.word);
        this.setState({
            word: this.linkedList.pop()
        })
    }

    render() {
        /*
        if (!this.linkedList.head) {
            this.initiateQuestionDatabase()
        }
        */
        let entry = (<form onSubmit={e => this.submitAnswer(e)}>
            <label>
                Answer:
              <input type="text" name="name" ref={node => (this.input = node)} />
            </label>
            <input type="submit" value="Submit" />
        </form>);
        let nextButton = '';
        let gotRight = '';
        if(this.state.correct){
            gotRight = (<p>You got it right!</p>);
            nextButton = (<button onClick={() => this.nextWord()}>Next</button>);
        }
        // let submitButton = ();
        let guessField;
        if(this.state.correct){
            guessField = (<div><button onClick={() => this.nextWord()}>next</button></div>)
        }
        else{
            guessField = (<div >{this.state.word ? this.state.word.esperantoWord : ''}{entry}</div>);
        }
        return (
            <div>
                <h3 className="welcome">Welcome: {this.props.username}</h3>
                <div className="dashboard">
                    <div className="dashboard-username">
                    </div>
                    <div className="dashboard-protected-data">
                        {/* Select a category: {this.showCats()} */}
                        {guessField}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        /*
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        categories: state.protectedData.categories
        */
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
