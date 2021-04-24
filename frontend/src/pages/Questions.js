import React, { useState } from 'react';
import * as Survey from 'survey-react';
//import './Questions.css';
//import styles from './Questions.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import ReactDOM from 'react-dom';
import "survey-react/survey.css";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'blue',
  },
});

function Questions()
{}

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompleted: false
        };
        this.onCompleteComponent = this.onCompleteComponent.bind(this);
    }

    onCompleteComponent() {
        this.setState({
            isCompleted: true
        });
    }

    surveyValueChanged = function (sender, options) {
        var el = document.getElementById(options.name);
        if (el) {
            el.value = options.value;
        }
    };

    render() {
        var json = {
    
    pages: [
        {
            questions: [
                {
                    type: "rating",
                    name: "mood",
                    title: "How would you describe your overall mood?",
                    minRateDescription: "Rock bottom",
                    maxRateDescription: "Sky High"
                }
            ]
        }, 
        {
            questions: [
                {
                    type: "rating",
                    name: "state",
                    title: "How would you rank your mental state?",
                    minRateDescription: "Worse",
                    maxRateDescription: "Best"
                }
            ]
        }, 
        {
            questions: [
                {
                    type: "radiogroup",
                    name: "help",
                    title: "If you are feeling down, do you need mental help/support?",
                    colCount: 2,
                    choices: [
                        "Yes", "No"
                    ]
                }
            ]
        }, 
        {
            questions: [
                {
                    type: "rating",
                    name: "rate",
                    isRequired: true,
                    title: "How would you rate your overall progress/productivity for your day’s goals?",
                    minRateDescription: "Slacking",
                    maxRateDescription: "Extremely Productive"
                }
            ]
        },
        {
            questions: [
                {
                    type: "dropdown",
                    name: "goals",
                    isRequired: true,
                    title: "How many goals did you plan to achieve today?",
                    choices: [
                        "1", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "11", "12", "13", "14", "15"
                    ]
                }
            ]
        },
        {
            questions: [
                {
                    type: "dropdown",
                    name: "goals",
                    isRequired: true,
                    title: "How many goals did you achieve by the end of the day?",
                    choices: [
                        "1", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "11", "12", "13", "14", "15"
                    ]
                }
            ]
        },
        {
            questions: [
                {
                    type: "radiogroup",
                    name: "satisfaction",
                    isRequired: true,
                    title: "Are you happy with the amount of work/progress/goals you have completed?",
                    colCount: 2,
                    choices: [
                        "Yes", 
                        "No"
                    ]
                }
            ]
        },
        {
            questions: [
                {
                    type: "radiogroup",
                    name: "satisfaction",
                    title: "Did anything happen that interrupted you from completing your day’s goals?",

                    choices: [
                        "Yes", 
                        "No"
                    ]
                }
            ]
        },
        {
            questions: [
                {
                    type: "radiogroup",
                    name: "satisfaction",
                    title: "Did your mood decrease your motivation to finish your day’s tasks?",
                    colCount: 2,
                    choices: [
                        "Yes", 
                        "No"
                    ]
                }
            ]
        },
        {
            questions: [
                {
                    type: "radiogroup",
                    name: "satisfaction",
                    title: "Were you able to finish all of your most important tasks?",
                    colCount: 2,
                    choices: [
                        "Yes", 
                        "No"
                    ]
                }
            ]
        },
    ]
};

    var surveyRender = !this.state.isCompleted ? (
        <Survey.Survey
            json = {json}
            showCompletedPAge = {false}
            onComplete = {this.onCompleteComponent}
        />
    ) : null;

    var onCompletedComponent = this.state.isCompleted ? (
        <div>
            <h1>Congratulations, you have completed your daily questionnaire!</h1>
            <Button variant="contained" color="primary" >
                Back Home
            </Button>
        </div>
    ) : null;
    
    return (
        <div>
            {surveyRender}
            {onCompletedComponent}
        </div>
    );
}
}
/** 
Survey.StylesManager.applyTheme();

var model = new Survey.Model(json);
model.onUpdateQuestionCssClasses
.add(function (result)
{
    document.querySelector("testresult").textContent = "Result JSON:\n";
})
*/

function App() {
    return (

        <div className="App">
            <h1>Daily Questionnaire</h1>
            <Question />
        </div>
    );
}

const root = document.getElementById("root");
ReactDOM.render(<App onValueChanged={Questions.surveyValueChanged}/>, root);

export default Questions