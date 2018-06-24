import React, { Component } from 'react';
import {base, app,} from '../base.js'

class User extends Component {
    constructor(props){
        super(props)
        this.state = {
          currentId: null,
        }
     this.componentCleanup = this.componentCleanup.bind(this)  
     this.renderUser = this.renderUser.bind(this)
     this.handleSelection = this.handleSelection.bind(this)
    }

    componentDidMount(){
        app.auth().signInAnonymously()
        app.auth().onAuthStateChanged(user => {
          user
            ? this.setState(() => ({currentId: user.uid }))
            : this.setState(() => ({ currentId: null }));
        }).bind(this)
        window.addEventListener('beforeunload', this.componentCleanup)
    }
    componentCleanup() {
        base.remove(`/game/users/`)

    }
    componentWillUnmount() {
        base.remove(`/game/users/`)
        window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
    }

    handleSelection(selection){
        console.log(selection)
        base.update(`game/users/${this.state.currentId}`, {
            data: {selectionMade: true}, 
          });
        base.push('game/playerChoices', {
            data: {name: this.props.name, id: this.props.id, selection: selection, currentWins: this.props.wins, currentLosses: this.props.losses},
        });
    }

    renderUser(){
        if((this.state.currentId == this.props.id) && (!this.props.selectionMade)){
            return(
                <div>
                    <h1>Enter your selection</h1>
                        <button onClick={() => this.handleSelection("r")}>Rock</button>
                        <button onClick={() => this.handleSelection("p")}>Paper</button>
                        <button onClick={() => this.handleSelection("s")}>Scissors</button>
                </div>
            )
        }else if (this.state.currentId == this.props.id ){
            return(
                <div> Waiting for Opponent to pick </div>
            )
        }
    }
    renderOponent(){
        if((this.state.currentId != this.props.id) && (!this.props.selectionMade)){
            return(
                <div>
                    <h1>Your opponent {this.props.name} is currently choosing!</h1>
                       
                </div>
            )
        }else if (this.state.currentId != this.props.id ){
            return(
                <div>Your opponent {this.props.name} is waiting for you to choose!</div>
            )
        }
    }

   

    render() {
        return (
            <div>
                {this.renderUser()}
                {this.renderOponent()}
                <div>
                    <div>Name: {this.props.name}</div>
                    <div>Wins: {this.props.wins}</div>
                    <div>losses: {this.props.losses}</div>

                </div>
            </div>
        );
    }
}

export default User;

