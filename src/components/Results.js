import React, { Component } from 'react';
import { base, app } from '../base'


class Results extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: null
        }
        this.updateScores = this.updateScores.bind(this)
        this.checkResults = this.checkResults.bind(this)
    }
    componentDidMount() {
        var results = this.checkResults()
        this.updateScores(results)

    }
    checkResults() {
        var playerOneChoice = this.props.playerChoices[0].selection
        var playerTwoChoice = this.props.playerChoices[1].selection
        var playerOneName = this.props.playerChoices[0].name
        var playerTwoName = this.props.playerChoices[1].name
        var playerOneId = this.props.playerChoices[0].id
        var playerTwoId = this.props.playerChoices[1].id
        var playerOneWins = this.props.playerChoices[0].currentWins
        var playerOneLosses = this.props.playerChoices[0].currentLosses
        var playerTwoWins = this.props.playerChoices[1].currentWins
        var playerTwoLosses = this.props.playerChoices[1].currentLosses

        // possibilities resulting in wins for playerOne
        var playerOneWinCombos = ['rs', 'pr', 'sp']
        // map letters to words they represent
        var choiceMap = { r: 'rock', p: 'paper', s: 'scissors' }

        console.log(playerOneName + " choice " + playerOneChoice)
        console.log(playerTwoName + " choice " + playerTwoChoice)

        if (playerOneChoice === playerTwoChoice) {
            return { tie: true }
        } else if (playerOneWinCombos.includes(playerOneChoice + playerTwoChoice)) {
            return {
                tie: false,
                winnerChoice: choiceMap[playerOneChoice],
                winnerName: playerOneName,
                winnerId: playerOneId,
                winnerWins: playerOneWins,
                loserId: playerTwoId,
                loserLosses: playerTwoLosses
            }
        } else {
            return {
                tie: false,
                winnerChoice: choiceMap[playerTwoChoice],
                winnerName: playerTwoName,
                winnerId: playerTwoId,
                winnerWins: playerTwoWins,
                loserId: playerOneId,
                loserLosses: playerOneLosses
            }
        }
    }
    updateScores(results) {
        console.log("winner id " + results.winnerId)
        console.log("loser id " + results.loserId)
        var playerOneId = this.props.playerChoices[0].id
        var playerTwoId = this.props.playerChoices[1].id
        console.log(results.winnerId)
        console.log(results.loserId)

        if (results.tie == true) {
            this.setState({
                message: "The result was a tie!"
            })
            setTimeout(function () {
                base.remove(`/game/playerChoices/`)
                base.update(`game/users/${playerOneId}`, {
                    data: { selectionMade: false },
                });
                base.update(`game/users/${playerTwoId}`, {
                    data: { selectionMade: false },
                });
            }, 3000)

        } else {
            this.setState({
                message: `${results.winnerName} won with ${results.winnerChoice}!`
            })
            setTimeout(function () {
                base.remove(`/game/playerChoices/`)
                base.update(`game/users/${results.loserId}`, {
                    data: { losses: (results.loserLosses + 1), selectionMade: false },
                });
                base.update(`game/users/${results.winnerId}`, {
                    data: { wins: (results.winnerWins + 1), selectionMade: false },
                });

            }, 3000)
        }

    }
    render() {
        return (
            <div>
                <h1>The Results Are In!</h1>
                <div>{this.state.message}</div>
            </div>
        );
    }
}

export default Results;