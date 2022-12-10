import { cleanup, render, screen } from "@testing-library/react"
import renderer from 'react-test-renderer';

import Question from "../Question";


// Mock the nanoid external module used in Question component
jest.mock("nanoid", () => ({
    __esModule: true,
    nanoid: () => Date.now()
}))


afterEach(() => {
    cleanup();
})


test('number of answers for multiple choice question should be 4', () => {
    const mockFunction = jest.fn();

    const questionDataTest = {
        category: "Entertainment: Video Games",
        correct_answer: "The Zin Empire",
        difficulty: "easy",
        incorrect_answers: ['The Brotherhood', 'The Ronin', 'The Sons of Samedi'],
        question: "Which of these is NOT the name of a rival gang in the video game Saint&#039;s Row 2?",
        type: "multiple"
    }

    render(<Question questionData={questionDataTest} questionIndex={0} handleSelectAnswer={mockFunction} isShowResults={false} />);

    const answerElements = screen.getAllByLabelText(/answer/i);

    expect(answerElements).toHaveLength(4);
})

test('number of answers for true/false question should be 2', () => {
    const questionDataTest = {
        category: "Science: Computers",
        correct_answer: "False",
        difficulty: "medium",
        incorrect_answers: ['True'],
        question: "The common software-programming acronym &quot;I18N&quot; comes from the term &quot;Interlocalization&quot;.",
        type: "boolean"
    }

    const mockFunction = jest.fn();

    render(<Question questionData={questionDataTest} questionIndex={0} handleSelectAnswer={mockFunction} isShowResults={false} />);

    const answerElements = screen.getAllByLabelText(/answer/i);

    expect(answerElements).toHaveLength(2);
})

test("component should always match snapshot", () => {
    const mockFunction = jest.fn();
    const questionDataTest = {
        category: "Entertainment: Video Games",
        correct_answer: "The Zin Empire",
        difficulty: "easy",
        incorrect_answers: ['The Brotherhood', 'The Ronin', 'The Sons of Samedi'],
        question: "Which of these is NOT the name of a rival gang in the video game Saint&#039;s Row 2?",
        type: "multiple"
    }

    const tree = renderer.create(<Question questionData={questionDataTest} questionIndex={0} handleSelectAnswer={mockFunction} isShowResults={false} />);

    expect(tree).toMatchSnapshot();
});
