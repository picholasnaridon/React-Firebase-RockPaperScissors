import React, { Component } from 'react';
import { base, app } from '../base'
import PlayerList from './PlayerList'
import Results from './Results'
import AddUser from './AddUser'
import Chat from './Chat'

class Board extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            playerChoices: [],
            gameOver: false
        }
        this.addUserHandler = this.addUserHandler.bind(this)
        this.renderPlayersJoining = this.renderPlayersJoining.bind(this)
        this.renderOutcome = this.renderOutcome.bind(this)
        this.renderChat = this.renderChat.bind(this)
    }

    componentDidMount() {
        app.auth().signInAnonymously()
        app.auth().onAuthStateChanged(user => {
            user
                ? this.setState(() => ({ currentId: user.uid }))
                : this.setState(() => ({ currentId: null }));
        }).bind(this)
    }

    componentWillMount() {
        base.bindToState(`game/users/`, {
            context: this,
            state: 'users',
            asArray: true
        });
        base.syncState(`game/playerChoices/`, {
            context: this,
            state: 'playerChoices',
            asArray: true
        });
    }

    addUserHandler(newUserName, newUserId) {
        base.post(`game/users/${newUserId}`, {
            data: { name: `${newUserName}`, wins: 0, losses: 0, selectionMade: false, id: `${newUserId}` },
        });
    }

    renderOutcome() {
        if (this.state.playerChoices.length >= 2) {
            return (
                <Results playerChoices={this.state.playerChoices} />
            )
        }

    }

    renderChat() {
        if (this.state.users.length == 2) {
            return (
                <Chat users={this.state.users} />
            )
        }
    }

    renderPlayersJoining() {
        var foundPlayer = false;
        for (var i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id == this.state.currentId) {
                foundPlayer = true;
                break;
            }
        }


        if ((this.state.users.length == 1) && (foundPlayer)) {
            return (
                <h1>Waiting For Player to join </h1>
            )
        } else if (this.state.users.length >= 2) {
            return (<div>
                <h1>Game In Progress</h1>
                <PlayerList users={this.state.users} />
            </div>)
        } else {
            return (
                <AddUser addUserHandler={this.addUserHandler} />
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderPlayersJoining()}
                {this.renderOutcome()}
                {this.renderChat()}
            </div>
        );
    }
}


export default Board;

