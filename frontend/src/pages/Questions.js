import React, { useState } from 'react';
import * as Survey from 'survey-react';
//import './Questions.css';
import styles from './Questions.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import reactDom from 'react-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'blue',
  },
});

function Questions()
{


Survey.StylesManager.applyTheme("modern");

var json = {
    title: "Daily Check In",
    pages: [
        {
            title: "How are you feeling",
            questions: [
                {
                    type: "rating",
                    name: "feeling",
                    title: "How are you feelng today",
        
                }

            ]
        }, 
        {
            title: "How are you feeling",
            questions: [
                {
                    type: "rating",
                    name: "feeling",
                    title: "How arae you feelng today",
        
                }

            ]
        }, 
    ]
};

var model = new Survey.Model(json);
model.onUpdateQuestionCssClasses
.add(function (result)
{
    document.querySelector("testresult").textContent = "Result JSON:\n";
})

//ReactDOM.render(<Survey.Survey model={model}/>, document.getElementById("test"));
return (


    <div id="test"></div>
)
} 

export default Questions