import React, { Component } from 'react';


import {  Link, withRouter } from 'react-router-dom';

import './style.scss';

import axios from 'axios';


class Survey extends Component {
    constructor(props){
        super(props)
        this.state = {
            survey: false,
            questions: [],
            duration: '',
            result: ''
        }
    }

    componentDidMount(){
        let user = window.localStorage.getItem('user');
        if(!user)
            this.props.history.push("/");
    }

    emailAbandoned = async () => {
        let email = JSON.parse(localStorage.getItem('user')).email;
        let response = await axios.post('https://trumanappbackend.herokuapp.com/email/abandoned', {"email" : email});

        if(response.status != 204){
            return console.error('Error to send email abandoned.')
        }

        console.log('Email abandoned sent');
    }

    countDown = () => {
        let minutes = 5;
        let seconds = parseInt(minutes * 60);
        
        this.intervalCount = setInterval(() => {
            seconds--;

            if(seconds == 0){
                this.emailAbandoned()
                return clearInterval(this.intervalCount)
            }

            this.setState({duration:
            `${parseInt(seconds / 60)}:${seconds % 60 < 10 ? `0` : ''}${(seconds % 60)}`})
        }, 1000)
    }

    surveySubmit = async (event) => {
        event.preventDefault();

        /*
            question_1, // Do you like technology ?  
            question_2, // Do you consider yourself outgoing ? 
            question_3, // Are you introverted ?
            question_4, // Do you like sports ?
            question_5, // Do you consider yourself a comedian ? 
        */

        let question_1 = event.target[0].value
        let question_2 = event.target[1].value
        let question_3 = event.target[2].value
        let question_4 = event.target[3].value
        let question_5 = event.target[4].value
        let id_user = JSON.parse(localStorage.getItem('user')).id
        let email = JSON.parse(localStorage.getItem('user')).email


        let response = await axios.post('https://trumanappbackend.herokuapp.com/surveys', {
            question_1,
            question_2,
            question_3,
            question_4,
            question_5,
            id_user,
            email
        });

        if(response.status != 200){
            console.error('Error, contact the support');
            return
        }

        this.setState({result: response.data.result.avenger}, () => clearInterval(this.intervalCount))
    }


    
    render(){
        return (
            <div className="survey">
                <h1>Survey {this.state.duration && `(${this.state.duration})`}</h1>
                <button onClick={() => {
                    this.setState({survey: true}, () => {
                        this.countDown()
                    })
                }}>Start</button>
                <form onSubmit={(e) => this.surveySubmit(e)} className={!this.state.survey ? 'survey__form hidden' : 'survey__form'}>
                    <label>Do you like technology ?</label><br/>
                    <select name="question_1">
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                    <br />
                    <label> Do you consider yourself outgoing ?</label><br/>
                    <select name="question_2">
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                    <br />
                    <label>Are you introverted ?</label><br/>
                    <select name="question_3">
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                    <br />
                    <label>Do you like sports ?</label><br/>
                    <select name="question_4">
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                    <br />
                    <label>Do you consider yourself a comedian ?</label><br/>
                    <select name="question_5">
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                    <br /><br />
                    <button type="submit">
                        Send
                    </button>
                    <div style={{marginTop: '20px'}}>{this.state.result}</div>
                </form> 
            </div>
        )
    }
}


export default withRouter(Survey);