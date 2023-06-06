import React from 'react'
import propTypes from "prop-types"

import styles from './StartQuizzMenu.module.scss';


/**
 * Element containing a menu for starting a quizz with specific settings
 */
export default function StartQuizzMenu({ quizzCategoriesArray, quizzOptions, handleQuizzStart, handleQuizzOptionChange }) {
    return (
        <div className={styles.unstarted_quizz_container}>
            <h2 className={styles.unstarted_quizz_title}>Quizz Challenge</h2>
            <p className={styles.unstarted_quizz_text}>
                Choose random trivia questions and <br />
                answer as many as you can!
            </p>
            <form onSubmit={handleQuizzStart}>
                <div className={styles.unstarted_quizz_inputs_container}>
                    <label>
                        Category
                        <br />
                        <select onChange={handleQuizzOptionChange} name="category" value={quizzOptions.category}>
                            <option value="">Any</option>
                            {quizzCategoriesArray.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>
                    </label>
                    <label>
                        Difficulty
                        <br />
                        <select onChange={handleQuizzOptionChange} name="difficulty" value={quizzOptions.difficulty}>
                            <option value="">Any</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                </div>
                <button type="submit" className={styles.unstarted_quizz_button}>Start Quizz</button>
            </form>
        </div>
    );
}

StartQuizzMenu.propTypes = {
    /**
     * Array of question categories
     */
    quizzCategoriesArray: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        name: propTypes.string
    })),
    /**
     * Quizz options, including:
     * - category
     * - difficulty
     * - URL used for API request
     */
    quizzOptions: propTypes.shape({
        category: propTypes.string,
        difficulty: propTypes.string,
        urlUsed: propTypes.string
    }),
    /**
     * Handler to start quizz
     */
    handleQuizzStart: propTypes.func,
    /**
     * Handler to change quizz options
     */
    handleQuizzOptionChange: propTypes.func
}
