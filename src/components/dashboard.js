import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';
import LinkedList from '../algorithms/linkedList';

export class Dashboard extends React.Component {
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

    guessedWrong(){
        
        console.log('Wrong');
    }

    guessedRight(){
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

    initiateQuestionDatabase(){
        console.log('--------------------');
        console.log(this.props.protectedData);
        console.log('--------------------');
        if(this.props.protectedData.length < 2){
            console.log('returning');
            return;
        }

        const linkedList = new LinkedList();
        console.log(this.props.protectedData.length);
        for(let i = 0; i < this.props.protectedData.length; i++){
            linkedList.push(this.props.protectedData[i]);
            console.log('pushing: ' + this.props.protectedData[i]);
        }
        console.log(linkedList.print());
    }

    render() {
        console.log(this.props.protectedData[0].esperantoWord);
        if(!this.props.questionDatabase){
            this.initiateQuestionDatabase();
        }
        let word = (this.props.protectedData[0].esperantoWord);
        let entry = (<form onSubmit={e => this.submitAnswer(e)}>
            <label>
                Answer:
              <input type="text" name="name" ref={node => (this.input = node)} />
            </label>
            <input type="submit" value="Submit" />
        </form>);
        // let submitButton = ();
        let guessField = (<div >{word}{entry}</div>);
        console.log(this.props.protectedData)
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Welcome: {this.props.username}
                </div>
                <div className="dashboard-protected-data">
                    {/* Select a category: {this.showCats()} */}
                    {guessField}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        questionDatabase: null,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        categories: state.protectedData.categories
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
