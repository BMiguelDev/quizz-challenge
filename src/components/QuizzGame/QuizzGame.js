import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Question from '../Question/Question';
import propTypes from "prop-types";

import styles from './QuizzGame.module.scss';

/**
 * Element containing a set of questions and a results area, along with buttons for checking results and restarting the quizz
 */
export default function QuizzGame({ isLoading, quizzQuestions, handleSelectAnswer, quizzResults, handleCheckResults, handleQuizzReset }) {

    // Constant holding the completion bar filling styles, which varry based on the number of correct answers
    const borderFillingStyles = {
        width: quizzResults[1] > 0 ? quizzResults[1] * 20 + "%" : "10%",
        padding: quizzResults[1] > 0 ? ".7rem" : "0.7rem .2rem",
        border: quizzResults[1] === 0 && "none",
        left: quizzResults[1] === 0 && "0%",
    }

    return (
        <div className={styles.quizz_container}>
            {
                isLoading ?
                    <div className={styles.loading_container}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </div> :
                    <div className={styles.questions_container} aria-label='questions_container'>
                        {quizzQuestions.map((questionData, index) =>
                            <Question
                                key={index}
                                questionData={questionData}
                                questionIndex={index}
                                handleSelectAnswer={handleSelectAnswer}
                                isShowResults={quizzResults[0]} />)}
                    </div>
            }
            <div className={styles.results_container}>
                <div className={quizzResults[0] === false ? `${styles.results_description} ${styles.results_description_hide}` : styles.results_description} aria-label="results_description">
                    <h3 className={styles.results_correct_answers}>You scored {quizzResults[1]}/5 correct answers</h3>
                    <span className={styles.completion_bar_frame}><span style={borderFillingStyles} className={styles.completion_bar_filling}></span></span>
                </div>
                <div className={styles.results_buttons_container}>
                    <button className={styles.quizz_action_button} onClick={handleCheckResults}>{quizzResults[0] === true ? "Play Again" : "Check Answers"}</button>
                    <button className={styles.quizz_reset_button} onClick={handleQuizzReset}>Reset Quizz</button>
                </div>
            </div>
        </div>
    );
}

QuizzGame.propTypes = {
    /**
     * Flag indicating if the quizz is loading the question data
     */
    isLoading: propTypes.bool,
    /**
     * Array holding each question's data
     */
    quizzQuestions: propTypes.arrayOf(propTypes.shape({
        category: propTypes.string,
        type: propTypes.string,
        difficulty: propTypes.string,
        question: propTypes.string,
        correct_answer: propTypes.string,
        incorrect_answers: propTypes.arrayOf(propTypes.string),
        answerSelected: propTypes.string
    })),
    /**
     * Array containing quizz results in the format [isResultsShown, counterCorrectAnswers]
     */
    quizzResults: propTypes.arrayOf(propTypes.oneOfType([propTypes.bool, propTypes.number])),
    /**
     * Click handler for the answers
     */
    handleSelectAnswer: propTypes.func,
    /**
     * Click handler for checking results
     */
    handleCheckResults: propTypes.func,
    /**
     * Click handler for restarting quizz
     */
    handleQuizzReset: propTypes.func
}
