import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

import QuizzGame from "../QuizzGame";


jest.mock("nanoid", () => ({
    __esModule: true,
    nanoid: () => Date.now()
}))


afterEach(() => {
    cleanup();
})


const mockFunction = jest.fn();
const quizzQuestionsTest = [
    {
        category: "Entertainment: Video Games",
        correct_answer: "The Zin Empire",
        difficulty: "easy",
        incorrect_answers: ['The Brotherhood', 'The Ronin', 'The Sons of Samedi'],
        question: "Which of these is NOT the name of a rival gang in the video game Saint&#039;s Row 2?",
        type: "multiple"
    },
    {
        category: "Science: Computers",
        correct_answer: "False",
        difficulty: "medium",
        incorrect_answers: ['True'],
        question: "The common software-programming acronym &quot;I18N&quot; comes from the term &quot;Interlocalization&quot;.",
        type: "boolean"
    },
    {
        category: "Entertainment: Music",
        correct_answer: "Pink Floyd",
        difficulty: "medium",
        incorrect_answers: ['AC/DC', 'Metallica', 'Red Hot Chili Peppers'],
        question: "Which of these bands is the oldest?",
        type: "multiple"
    },
    {
        category: "Entertainment: Television",
        correct_answer: "LazyTown",
        difficulty: "easy",
        incorrect_answers: ['Sofia the First', 'DuckTales', 'Tom and Jerry'],
        question: "Which show is known for the songs &quot;You are a Pirate&quot;, &quot;Cooking by the Book&quot; and &quot;We Are Number One&quot;?",
        type: "multiple"
    },
    {
        category: "Entertainment: Video Games",
        correct_answer: "Shi No Numa",
        difficulty: "medium",
        incorrect_answers: ['Tranzit', 'Kino Der Toten', 'Der Riese'],
        question: "Which was the first &quot;Call Of Duty: Zombies&quot; map to introduce the &quot;Wunderwaffe DG-2&quot;?",
        type: "multiple"
    }
]


test('component should always match snaphot', () => {
    const tree = renderer.create(<QuizzGame isLoading={false} quizzQuestions={quizzQuestionsTest} handleSelectAnswer={mockFunction} quizzResults={[false, 0]} handleCheckResults={mockFunction} handleQuizzReset={mockFunction} />);

    expect(tree).toMatchSnapshot();
})


test('component should render 5 questions', () => {
    render(<QuizzGame isLoading={false} quizzQuestions={quizzQuestionsTest} handleSelectAnswer={mockFunction} quizzResults={[false, 0]} handleCheckResults={mockFunction} handleQuizzReset={mockFunction} />);

    const questionsElement = screen.getByTitle("questions_container");

    expect(questionsElement.childElementCount).toEqual(5);
})


test("score should not be visible if quizz is not finished", () => {
    render(<QuizzGame isLoading={false} quizzQuestions={quizzQuestionsTest} handleSelectAnswer={mockFunction} quizzResults={[false, 0]} handleCheckResults={mockFunction} handleQuizzReset={mockFunction} />);

    const resultsDescriptionElement = screen.getByTitle("results_description");

    expect(resultsDescriptionElement.classList).toContain("results_description_hide");
})


test('both "Check Answers" and "Reset Quizz" buttons should be enabled if quizz is not finished', () => {
    render(<QuizzGame isLoading={false} quizzQuestions={quizzQuestionsTest} handleSelectAnswer={mockFunction} quizzResults={[false, 0]} handleCheckResults={mockFunction} handleQuizzReset={mockFunction} />);

    const buttonElement1 = screen.getByText("Check Answers");
    const buttonElement2 = screen.getByText("Reset Quizz");

    expect(buttonElement1).toBeEnabled();
    expect(buttonElement2).toBeEnabled();
})

test('both "Play Again" and "Reset Quizz" buttons should be enabled if quizz is finished', () => {
    render(<QuizzGame isLoading={false} quizzQuestions={quizzQuestionsTest} handleSelectAnswer={mockFunction} quizzResults={[true, 0]} handleCheckResults={mockFunction} handleQuizzReset={mockFunction} />);

    const buttonElement1 = screen.getByText("Play Again");
    const buttonElement2 = screen.getByText("Reset Quizz");

    expect(buttonElement1).toBeEnabled();
    expect(buttonElement2).toBeEnabled();
})

test('component should show number of correct answers if quizz is finished', () => {
    const numberCorrectAnswers = 3;
    render(<QuizzGame isLoading={false} quizzQuestions={quizzQuestionsTest} handleSelectAnswer={mockFunction} quizzResults={[true, numberCorrectAnswers]} handleCheckResults={mockFunction} handleQuizzReset={mockFunction} />);

    const headingElements = screen.getAllByRole("heading");
    const resultsScoreHeadingElement = headingElements[headingElements.length-1];

    expect(resultsScoreHeadingElement).toHaveTextContent(`You scored ${numberCorrectAnswers}/5 correct answers`);
})
