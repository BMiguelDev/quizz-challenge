import React, { useEffect, useState } from 'react'
import { nanoid } from "nanoid"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import styles from './Question.module.scss';


export default function Question(props) {

  // Variable that holds an array with the answers scrambled (random order)
  const [scrambledAnswers, setScrambledAnswers] = useState([]);

  // Function that decodes strange characters in the question string
  function decodeQuestionString(string) {
    var text = document.createElement("textarea");
    text.innerHTML = string;
    return text.value;
  }

  // On first component mount, create array with all answers in a scrambled order and store it in <scrambledAnswers> variable
  useEffect(() => {
    if (scrambledAnswers.length === 0) {
      const newAnswersArray = props.questionData.incorrect_answers.slice();
      newAnswersArray.push(props.questionData.correct_answer);
      setScrambledAnswers(newAnswersArray.sort((a, b) => 0.5 - Math.random()));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // Function that decides className property of answer for correct coloring when quizz ends
  function getAnswerClassName(answer) {
    const isShowResults = props.isShowResults;
    if (isShowResults) {
      return answer === props.questionData.correct_answer ?
        (answer === props.questionData.answerSelected ? `${styles.answer} ${styles.answer_selected} ${styles.answer_correct}` : `${styles.answer} ${styles.answer_correct}`) :
        (answer === props.questionData.answerSelected ? `${styles.answer} ${styles.answer_incorrect} ${styles.answer_selected}` : `${styles.answer} ${styles.answer_dimmed}`)

    } else {
      return props.questionData.answerSelected === answer ? `${styles.answer} ${styles.answer_selected}` : styles.answer
    }
  }


  return (
    <div className={styles.question_container}>
      <h3 className={styles.question}>{decodeQuestionString(props.questionData.question)}</h3>
      <div className={styles.answers_container}>
        {
          scrambledAnswers.map(answer => (
            <div key={nanoid()} className={styles.answer_container}>
              <p
                className={getAnswerClassName(answer)}
                onClick={() => props.handleSelectAnswer(props.questionIndex, answer)}
              >
                {decodeQuestionString(answer)}
              </p>
              {getAnswerClassName(answer)===`${styles.answer} ${styles.answer_selected} ${styles.answer_correct}` && <FontAwesomeIcon icon={faCheck} /> /*<i className="fa-solid fa-check"></i>*/}
            </div>
          ))
        }
      </div>
      <hr className={styles.question_separator} />
    </div>
  )
}
