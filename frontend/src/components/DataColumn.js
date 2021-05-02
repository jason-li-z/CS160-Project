import React, { useState } from 'react';
import styles from './DataColumn.module.css';

/**This component renders a column based on the data that is passed in */
function DataColumn({ q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, date }) {
  //let d = new Date(date);
  let d = new Date(date).toISOString().substring(0, 10);
  console.log(d);
  return (
    <>
      <tr>
        <td width="150px">{d}</td>
        <td className={styles.row}>{q1}</td>
        <td className={q2 < 4 ? styles.rowa : q2 > 7 ? styles.rowg : styles.roway}>{q2}</td>
        <td className={q3 < 4 ? styles.rowa : q3 > 7 ? styles.rowg : styles.roway}>{q3}</td>
        <td className={!q4 ? styles.rowa : styles.rowg}>{q4 ? 'Yes' : 'No'}</td>
        <td className={q5 < 4 ? styles.rowa : q5 > 7 ? styles.rowg : styles.roway}>{q5}</td>
        <td className={q6 < 4 ? styles.rowa : q6 > 7 ? styles.rowg : styles.roway}>{q6}</td>
        <td className={!q7 ? styles.rowa : styles.rowg}>{q7 ? 'Yes' : 'No'}</td>
        <td className={!q8 ? styles.rowa : styles.rowg}>{q8 ? 'Yes' : 'No'}</td>
        <td className={!q9 ? styles.rowa : styles.rowg}>{q9 ? 'Yes' : 'No'}</td>
        <td className={!q10 ? styles.rowa : styles.rowg}>{q10 ? 'Yes' : 'No'}</td>
      </tr>
    </>
  );
}

export default DataColumn;
