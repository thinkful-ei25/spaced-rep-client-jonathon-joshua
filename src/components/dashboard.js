import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }
    setFilter(e){
        console.log(e);
    }
    showCats(){
        let animalButton = (<li><button onClick={e => this.setFilter(e)}>Animals</button></li>);
        let foodButton = (<li><button>Food</button></li>);
        let list = (<ul>{animalButton}{foodButton}</ul>)
        return (list);
    }

    submitAnswer(e){
        e.preventDefault();
        console.log(e.value);
    }

    render() {
        console.log(this.props.protectedData[0].esperantoWord);
        let word = (this.props.protectedData[0].esperantoWord);
        let entry = (<form onSubmit={e => this.submitAnswer(e)}>
            <label>
              Answer:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>);
        // let submitButton = ();
        let guessField = (<div>{word}{entry}</div>);
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
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        categories: state.protectedData.categories
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
