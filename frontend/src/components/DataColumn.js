import React, { useState } from 'react';
import styles from './DataColumn.module.css';


/**This component renders a column based on the data that is passed in */
function DataColumn({q1,q2,q3,q4,q5,q6,q7,q8,q9,q10})
{
    return(
        <>
        <tr>
        <td width="150px">Date</td> 
        <td className={styles.row}>{q1}</td>
        <td className = {q2 < 4 ? styles.rowa  : q2 > 7 ? styles.rowg : styles.roway}>{q2}</td>
        <td className = {q3 < 4 ? styles.rowa  : q3 > 7 ? styles.rowg : styles.roway}>{q3}</td>
        <td className = {q4 == "No" ? styles.rowa : styles.rowg}>{q4}</td>
        <td className = {q5 < 4 ? styles.rowa  : q5 > 7 ? styles.rowg : styles.roway}>{q5}</td>
        <td className = {q6 < 4 ? styles.rowa  : q6 > 7 ? styles.rowg : styles.roway}>{q6}</td>
        <td className = {q7 == "No" ? styles.rowa : styles.rowg}>{q7}</td>
        <td className = {q8 == "No" ? styles.rowa : styles.rowg}>{q8}</td>
        <td className={q9 == "No" ? styles.rowa : styles.rowg}>{q9}</td>
        <td className = {q10 == "No" ? styles.rowa : styles.rowg}>{q10}</td>
        </tr>
        </>
    )
}

export default DataColumn;