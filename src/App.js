import React, { useState, useEffect, /*useRef*/ } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faSpinner } from '@fortawesome/free-solid-svg-icons';

import './App.scss';
import Question from './components/Question/Question';
import Footer from './components/Footer/Footer';

// Local storage constants
const LOCAL_STORAGE_KEY_IS_QUIZ_STARTED = "QuizzicalApp.isQuizStarted";
const LOCAL_STORAGE_KEY_QUIZZ_QUESTIONS = "QuizzicalApp.quizzQuestions";
const LOCAL_STORAGE_KEY_QUIZZ_RESULTS = "QuizzicalApp.quizzResults";
const LOCAL_STORAGE_KEY_IS_LOADING = "QuizzicalApp.isLoading";
const LOCAL_STORAGE_KEY_IS_DARK_MODE = "QuizzicalApp.isDarkMode";
const LOCAL_STORAGE_KEY_QUIZZ_CATEGORIES_ARRAY = "QuizzicalApp.quizzCategoriesArray";
const LOCAL_STORAGE_KEY_QUIZZ_OPTIONS = "QuizzicalApp.quizzOptions";


export default function App() {

  //State variables

  // Boolean variable that indicates whether the quizz has been started or not
  const [isQuizzStarted, setIsQuizzStarted] = useState(() =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_IS_QUIZ_STARTED)) || false);

  // Variable that holds the array of 5 questions of the current quizz
  const [quizzQuestions, setQuizzQuestions] = useState(() =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_QUIZZ_QUESTIONS)) || []);

  // Variable for quizz results, Array[<isResultsShown>, <counterCorrectAnswers>]
  const [quizzResults, setQuizzResults] = useState(() =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_QUIZZ_RESULTS)) || [false, 0]);

  // Boolean variable that indicates if data is being loaded to the app
  const [isLoading, setIsLoading] = useState(() =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_IS_LOADING)) || false);

  // Boolean variable that indicates if dark mode is on or off
  const [isDarkMode, setIsDarkMode] = useState(() =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_IS_DARK_MODE)) || false);

  // Variable that holds the array of possible question categories to choose from
  const [quizzCategoriesArray, setQuizzCategoriesArray] = useState(() =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_QUIZZ_CATEGORIES_ARRAY)) || []);

  // Variable object that stores the initial options choose for the current quizz
  const [quizzOptions, setQuizzOptions] = useState(() =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_QUIZZ_OPTIONS)) || { category: "", difficulty: "", urlUsed: "" });

  // Variable to handle dark mode without unnecessary re-renders
  //let darkModeRef = useRef();

  // On first component mount, fetch question categories from API and store then in the <quizzCategoriesArray> variable
  useEffect(() => {
    if (quizzCategoriesArray.length === 0) {
      fetch("https://opentdb.com/api_category.php")
        .then(res => res.json())
        .then(data => setQuizzCategoriesArray(data.trivia_categories));
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_IS_QUIZ_STARTED, JSON.stringify(isQuizzStarted));
  }, [isQuizzStarted])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_QUIZZ_QUESTIONS, JSON.stringify(quizzQuestions));
  }, [quizzQuestions])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_QUIZZ_RESULTS, JSON.stringify(quizzResults));
  }, [quizzResults])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_IS_LOADING, JSON.stringify(isLoading));
  }, [isLoading])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_IS_DARK_MODE, JSON.stringify(isDarkMode));
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_QUIZZ_CATEGORIES_ARRAY, JSON.stringify(quizzCategoriesArray));
  }, [quizzCategoriesArray])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_QUIZZ_OPTIONS, JSON.stringify(quizzOptions));
  }, [quizzOptions])


  // Function that fetches questions from API based on the options chosen by the user, and stores them in the <quizzQuestions> variable
  function handleQuizzStart(event) {
    event.preventDefault();
    setIsLoading(true);
    if (quizzOptions.category === "") {
      if (quizzOptions.difficulty === "") {
        const url = "https://opentdb.com/api.php?amount=5";
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            // Store the url used to be able to quickly fetch the same url upon quizz restart
            setQuizzOptions(prevQuizzOptions => ({ ...prevQuizzOptions, urlUsed: url }));
            setQuizzQuestions(data.results);
            setIsLoading(false);
          });
      } else {
        const url = "https://opentdb.com/api.php?amount=5&difficulty=" + quizzOptions.difficulty;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setQuizzOptions(prevQuizzOptions => ({ ...prevQuizzOptions, urlUsed: url }));
            setQuizzQuestions(data.results);
            setIsLoading(false);
          });
      }
    } else if (quizzOptions.difficulty === "") {
      const url = "https://opentdb.com/api.php?amount=5&category=" + quizzOptions.category;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setQuizzOptions(prevQuizzOptions => ({ ...prevQuizzOptions, urlUsed: url }));
          setQuizzQuestions(data.results);
          setIsLoading(false);
        });
    } else {
      const url = "https://opentdb.com/api.php?amount=5&category=" + quizzOptions.category + "&difficulty=" + quizzOptions.difficulty;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setQuizzOptions(prevQuizzOptions => ({ ...prevQuizzOptions, urlUsed: url }));
          setQuizzQuestions(data.results);
          setIsLoading(false);
        });
    }

    setIsQuizzStarted(true);
  }

  // Function that updates a question's selected answer
  function handleSelectAnswer(index, answer) {
    if (quizzResults[0] === true) return;   // Don't do anything if results are already being shown
    setQuizzQuestions(prevQuizzQuestions => {
      let newQuizzQuestions = prevQuizzQuestions.slice();
      newQuizzQuestions[index] = { ...newQuizzQuestions[index], answerSelected: answer }
      return newQuizzQuestions;
    })
  }

  // Function that toggles between showing results and restarting quizz using same options
  function handleCheckResults() {
    if (quizzResults[0] === true) {
      setIsLoading(true);
      setQuizzResults([false, 0]);
      // Fetch previous url to get new set of 5 questions using the same options
      fetch(quizzOptions.urlUsed)
        .then((res) => res.json())
        .then((data) => {
          setQuizzQuestions(data.results);
          setIsLoading(false);
        });

    }
    else {
      let counter = 0;
      // Count number of correct answers
      quizzQuestions.forEach(question => {
        if (question.answerSelected === question.correct_answer) counter++;
      })
      setQuizzResults([true, counter]);
    }
  }

  // Function that toggles the <isDarkMode> variable and updates <darkModeRef> ref variable to add/remove the "dark-mode" className
  function handleDarkMode() {
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode)
    //darkModeRef.current.className = (darkModeRef.current.className === "app-container") ? "app-container dark-mode" : "app-container";
  }

  // Function that updates the <quizzOptions> variable object according the the options chosen by the user
  function handleQuizzOptionChange(event) {
    const { name, value } = event.target;
    setQuizzOptions(prevQuizzOptions => ({ ...prevQuizzOptions, [name]: value }));
  }

  // Function that resets quizz
  function handleQuizzReset() {
    setIsQuizzStarted(false);
    setQuizzResults([false, 0]);
    setQuizzQuestions([]);
  }

  // Constant holding the completion bar filling styles, which varry based on the number of corret answers
  const borderFillingStyles = {
    width: quizzResults[1] > 0 ? quizzResults[1] * 20 + "%" : "10%",
    padding: quizzResults[1] > 0 ? ".7rem" : "0.7rem .2rem",
    border: quizzResults[1] === 0 && "none",
    left: quizzResults[1] === 0 && "0%",
  }

  return (
    <div /*ref={darkModeRef}*/ className={isDarkMode ? "app-container dark-mode" : "app-container"}>
      {
        isQuizzStarted ?
          (
            <div className="quizz-container">
              {
                isLoading ?
                  <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} />
                  </div> :
                  <div className="questions-container">
                    {quizzQuestions.map((questionData, index) =>
                      <Question
                        key={questionData.question}
                        questionData={questionData}
                        questionIndex={index}
                        handleSelectAnswer={handleSelectAnswer}
                        isShowResults={quizzResults[0]} />)}
                  </div>
              }
              <div className="results-container">
                <div className={quizzResults[0] === false ? "results-description results-description-hide" : "results-description"}>
                  <h3 className="results-correct-answers">You scored {quizzResults[1]}/5 correct answers</h3>
                  <span className="completion-bar-frame"><span style={borderFillingStyles} className="completion-bar-filling"></span></span>
                </div>
                <div className="results-buttons-container">
                  <button className="quizz-action-button" onClick={handleCheckResults}>{quizzResults[0] === true ? "Play Again" : "Check Answers"}</button>
                  <button className="quizz-reset-button" onClick={handleQuizzReset}>Reset Quizz</button>
                </div>
              </div>
            </div>
          ) :
          (
            <div className="unstarted-quizz-container">
              <h2 className="unstarted-quizz-title">Quizz Challenge</h2>
              <p className="unstarted-quizz-text">
                Choose random trivia questions and <br />
                answer as many as you can!
              </p>
              <form onSubmit={handleQuizzStart}>
                <div className="unstarted-quizz-inputs-container">
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
                <button type="submit" className="unstarted-quizz-button">Start Quizz</button>
              </form>
            </div >
          )
      }
      <Footer />
      <button className="dark-mode-button" title="Dark Mode" onClick={handleDarkMode}>
        {
          isDarkMode ?
            <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />
        }
      </button>
    </div >
  )
}