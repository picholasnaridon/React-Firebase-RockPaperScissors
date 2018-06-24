import React, { Component } from 'react';
import { base, app } from '../base'

class AddUser extends Component {
    constructor(props){
        super(props)
            this.state = {
                currentID: null
        }
        this.addUser = this.addUser.bind(this)
    }
    componentDidMount(){
        app.auth().signInAnonymously()
        app.auth().onAuthStateChanged(user => {
          user
            ? this.setState(() => ({currentId: user.uid }))
            : this.setState(() => ({ currentId: null }));
        }).bind(this)
    }

    addUser(e){
        e.preventDefault()
        var name = this.inputEl.value 
        this.props.addUserHandler(name, this.state.currentId)   
        this.inputEl.value = ''; 
    }
    render() {
        return (
            <div>
                <div>
                    <h1>Welcome, please enter your name</h1>
                    <div>
                        Enter Name:
                        <form onSubmit={this.addUser.bind(this)}>
                            <input type="text" ref={ el => this.inputEl = el }/>
                            <input type="submit"/>
                        </form>
                    </div> 
                </div>
            </div>
        );
    }
}

export default AddUser;