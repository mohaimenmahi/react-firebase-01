import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyCCfE5wr2uYIibur2gAb0lVh8FKKnewpGU",
    authDomain: "u-survey-87257.firebaseapp.com",
    databaseURL: "https://u-survey-87257.firebaseio.com",
    projectId: "u-survey-87257",
    storageBucket: "u-survey-87257.appspot.com",
    messagingSenderId: "47991753384"
  };
firebase.initializeApp(config);

class Usurvey extends Component {
  nameSubmit(event) {
    var studentName = this.refs.name.value; // rfs.name.value comes from event
    this.setState({studentName: studentName});
  }

  answerSelected(event) {
    var answers = this.state.answers;

    if(event.target.name === 'answer1') {
      answers.answer1 = event.target.value;
    } else if(event.target.name === 'answer2') {
      answers.answer2 = event.target.value;
    } else if(event.target.name === 'answer3') {
      answers.answer3 = event.target.value;
    }

    this.setState({answers: answers});
  }

  questionSubmitted() {
    firebase.database().ref('uSurvey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});
  }

  constructor(props){
    super(props);
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmitted = this.questionSubmitted.bind(this);
    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };
  }
  render(){
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName = <div>
        <h3>Please let us know your name: </h3>
        <form onSubmit={this.nameSubmit}>
          <input className="name-box" type="text" placeholder="Enter your name" ref="name" />
        </form>
      </div>;
      questions = '';
    } else if(this.state.studentName !== '' && this.state.isSubmitted === false) {
      studentName = <h3>Welcome {this.state.studentName}!</h3>
      questions = <div>
        <h4>Here is your Questions: </h4>
        <form onSubmit={this.questionSubmitted}>
          <div className="card">
            <label>What kind of courses do you like most: </label> <br />
            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} />Technology
            <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design
            <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} />Marketing
          </div>
          <div className="card">
            <label>You are a: </label> <br />
            <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} />Student
            <input type="radio" name="answer2" value="Professional" onChange={this.answerSelected} />Professional
            <input type="radio" name="answer2" value="Other" onChange={this.answerSelected} />Other
          </div>
          <div className="card">
            <label>Is online learning helpful: </label> <br />
            <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} />Yes
            <input type="radio" name="answer3" value="No" onChange={this.answerSelected} />No
            <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected} />Maybe
          </div>
          <input className="feedback-button" type="submit" value="submit" />
        </form>
      </div>
    } else if(this.state.studentName !== '' && this.state.isSubmitted === true) {
      studentName = <h3>Thanks, {this.state.studentName}</h3>
    }
    return(
      <div>
        {studentName}
        --------------------------------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
