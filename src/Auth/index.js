import React, { Component } from 'react';

import axios from 'axios';

import {  Link, withRouter } from 'react-router-dom';

class Auth extends Component {
    constructor(props){
        super(props)

        this.state = {
            emailLogin: '',
            passwordLogin: '',
            emailCreate: '',
            nameCreate: '',
            lastNameCreate: '',
            passwordCreate: '',
            msg: ''
        }

    }

    register = async () => {
        let { emailCreate, nameCreate, lastNameCreate, passwordCreate } = this.state;
    
        let response = await axios.post('http://localhost:3333/users', {
            "name": nameCreate,
            "email": emailCreate,
            "password": passwordCreate
          }
        );
    
        if(response.status != 200){
          console.log('Erro ao criar usuário');
    
          return
        }
    
        console.log(response);
        console.log('Usuário criado com sucesso!');
      }
    
    login = async () => {
        let { emailLogin, passwordLogin } = this.state;
    
        let response = await axios.post('http://localhost:3333/users/login', {
            "email": emailLogin,
            "password": passwordLogin
        }).catch(() => {
            this.setState({msg: 'User or password invalid'})
        });
    
        if(!response || response.status != 200){
          this.setState({msg: 'User or password invalid'})
          return
        }

        window.localStorage.setItem('user', JSON.stringify(response.data.user))
        this.props.history.push("/survey");
    }

    render(){
          return(
            <div style={{paddingLeft: 20, display: 'flex', justifyContent: 'space-between', width: '500px'}}>
            <div>
              <h2>Register</h2> 
              <input type="text" placeholder="Name" name="name" value={this.state.nameCreate} 
                onChange={(e) => this.setState({nameCreate: e.currentTarget.value})}/>
              <br/><br/>
              <input type="text" placeholder="Last Name" name="last_name" value={this.state.lastNameCreate} 
                onChange={(e) => this.setState({lastNameCreate: e.currentTarget.value})}/>
              <br/><br/>
              <input type="email" placeholder="Email" name="email" value={this.state.emailCreate} 
                onChange={(e) => this.setState({emailCreate: e.currentTarget.value})}/>
              <br/><br/>
              <input type="password" placeholder="Password" value={this.state.passwordCreate} name="password"
                onChange={(e) => this.setState({passwordCreate: e.currentTarget.value})}/>
              <br/><br/>
              <button style={{width: '100%', height: '35px'}} onClick={this.register}>Register</button>
            </div>

            <div>
                <h2>Login</h2>
                <input type="text" placeholder="email" name="email" value={this.state.emailLogin} onChange={(e) => {
                  this.setState({emailLogin: e.currentTarget.value})
                }}/>
                <br/><br/>
                <input type="password" placeholder="Password" name="password" value={this.state.passwordLogin} onChange={(e) => {
                  this.setState({passwordLogin: e.currentTarget.value})
                }}/>
                <br/><br/>
                <button style={{width: '100%', height: '35px'}} onClick={this.login}>Login</button>
                <br/><br/>
                <div>{this.state.msg}</div>
              </div>
            </div>
        )
    }
}

export default withRouter(Auth);