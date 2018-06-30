import React, { Component } from 'react';
import { base, app } from '../base'


class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages: []
        }
    }
    componentWillMount(){
        base.syncState(`game/messages`, {
            context: this,
            state: 'messages',
            asArray: true
        });
    }
    componentWillUnmount(){
        base.remove('game/messages', function(){
            console.log("removed")
          });
    }

    addMessage(e){
        e.preventDefault()
        var message = this.inputEl.value 
        base.push('game/messages', {
            data: {message: message}
        });
        this.inputEl.value = ''
    }
    
    render() {
        return (
            <div>
                <div>
                    <div>
                        <h4>Messages</h4>
                        <div style={{border: "1px solid black", width: "250px", height: "200px"}}>
                            {this.state.messages.map(function(message){
                                return (<p key={message.key}>{message.message}</p>)
                            })}
                        </div>
                        <div style={{border: "1px solid black", width: "200px", height: "70px"}}>
                            Enter Message:
                            <form onSubmit={this.addMessage.bind(this)}>
                                <input type="text" ref={ el => this.inputEl = el }/>
                                <input type="submit"/>
                            </form>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;