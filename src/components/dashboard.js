import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';
import LinkedList from '../algorithms/linkedList';


export class Dashboard extends React.Component {
    linkedList = new LinkedList();
    state = {word: undefined};
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }
    setFilter(e) {
        console.log(e);
    }
    showCats() {
        let animalButton = (<li><button onClick={e => this.setFilter(e)}>Animals</button></li>);
        let foodButton = (<li><button>Food</button></li>);
        let list = (<ul>{animalButton}{foodButton}</ul>)
        return (list);
    }

    guessedWrong() {

        console.log('Wrong');
    }

    guessedRight() {
        console.log('Right');
    }

    submitAnswer(e) {
        e.preventDefault();
        if (this.input.value === this.props.protectedData[0].esperantoAnswer) {
            this.guessedRight();
        } else
            this.guessedWrong();
        console.log(this.input.value);

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
            word : this.linkedList.pop()
        })
    }

    nextWord() {
        this.linkedList.push(this.state.word);
        this.setState({
            word : this.linkedList.pop()
        })
    }

    render() {
        if (!this.linkedList.head) {
            this.initiateQuestionDatabase()
            console.log('rendering linked list');
        }
        let entry = (<form onSubmit={e => this.submitAnswer(e)}>
            <label>
                Answer:
              <input type="text" name="name" ref={node => (this.input = node)} />
            </label>
            <input type="submit" value="Submit" />
        </form>);

        // let submitButton = ();
        let guessField = (<div >{this.state.word ? this.state.word.esperantoWord : ''}{entry}</div>);
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Welcome: {this.props.username}
                </div>
                <div className="dashboard-protected-data">
                    {/* Select a category: {this.showCats()} */}
                    {guessField}
                    <button onClick={() => this.nextWord()}>Next</button>
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
