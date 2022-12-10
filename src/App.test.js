import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from 'msw/node';

import App from "./App"

// Mock the nanoid external module used in App component
jest.mock("nanoid", () => ({
    __esModule: true,
    nanoid: () => Date.now
}));

//Setup fake/mock server to intercept API calls in App component and return test data instead
const server = setupServer(
    // Intercept the category API request
    rest.get("https://opentdb.com/api_category.php", (req, res, ctx) => {
        return res(ctx.json({
            trivia_categories: [
                {
                    "id": 1,
                    "name": "CategoryTest1"
                },
                {
                    "id": 2,
                    "name": "CategoryTest2"
                }
            ]
        }
        ))
    }),

    // Intercept all kinds of question API resquest
    rest.get(/opentdb.com\/api.php/, (req, res, ctx) => {
        const params = req.url.searchParams;
        const difficultyParam = params.get('difficulty');
        const categoryParam = params.get('category');

        const questionEasyCat1 = {
            "category": "CategoryTest1",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Easy Question Cat1 Test",
            "correct_answer": "Answer Test 1",
            "incorrect_answers": [
                "Answer Test 2",
                "Answer Test 3",
                "Answer Test 4"
            ]
        };
        const questionEasyCat2 = {
            "category": "CategoryTest2",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Easy Question Cat2 Test",
            "correct_answer": "Answer Test 1",
            "incorrect_answers": [
                "Answer Test 2",
                "Answer Test 3",
                "Answer Test 4"
            ]
        };
        const questionMediumCat1 = {
            "category": "CategoryTest1",
            "type": "multiple",
            "difficulty": "medium",
            "question": "Medium Question Cat1 Test",
            "correct_answer": "Answer Test 1",
            "incorrect_answers": [
                "Answer Test 2",
                "Answer Test 3",
                "Answer Test 4"
            ]
        };
        const questionMediumCat2 = {
            "category": "CategoryTest2",
            "type": "multiple",
            "difficulty": "medium",
            "question": "Medium Question Cat2 Test",
            "correct_answer": "Answer Test 1",
            "incorrect_answers": [
                "Answer Test 2",
                "Answer Test 3",
                "Answer Test 4"
            ]
        };
        const questionHardCat1 = {
            "category": "CategoryTest1",
            "type": "multiple",
            "difficulty": "hard",
            "question": "Hard Question Cat1 Test",
            "correct_answer": "Answer Test 1",
            "incorrect_answers": [
                "Answer Test 2",
                "Answer Test 3",
                "Answer Test 4"
            ]
        };
        const questionHardCat2 = {
            "category": "CategoryTest2",
            "type": "multiple",
            "difficulty": "hard",
            "question": "Hard Question Cat2 Test",
            "correct_answer": "Answer Test 1",
            "incorrect_answers": [
                "Answer Test 2",
                "Answer Test 3",
                "Answer Test 4"
            ]
        };

        if (difficultyParam === "easy" && !categoryParam)
            return res(ctx.json({
                results: [
                    questionEasyCat1,
                    questionEasyCat2,
                    questionEasyCat1,
                    questionEasyCat2,
                    questionEasyCat1
                ]
            }));
        else if (difficultyParam === "medium" && !categoryParam)
            return res(ctx.json({
                results: [
                    questionMediumCat1,
                    questionMediumCat2,
                    questionMediumCat1,
                    questionMediumCat2,
                    questionMediumCat1
                ]
            }));
        else if (difficultyParam === "hard" && !categoryParam)
            return res(ctx.json({
                results: [
                    questionHardCat1,
                    questionHardCat2,
                    questionHardCat1,
                    questionHardCat2,
                    questionHardCat1
                ]
            }));
        else if (!difficultyParam && categoryParam === "1")
            return res(ctx.json({
                results: [
                    questionHardCat1,
                    questionMediumCat1,
                    questionHardCat1,
                    questionHardCat1,
                    questionEasyCat1
                ]
            }));
        else if (!difficultyParam && categoryParam === "2")
            return res(ctx.json({
                results: [
                    questionHardCat2,
                    questionMediumCat2,
                    questionHardCat2,
                    questionHardCat2,
                    questionEasyCat2
                ]
            }));
        else if (difficultyParam === "easy" && categoryParam === "1")
            return res(ctx.json({
                results: [
                    questionEasyCat1,
                    questionEasyCat1,
                    questionEasyCat1,
                    questionEasyCat1,
                    questionEasyCat1
                ]
            }));
        else if (difficultyParam === "easy" && categoryParam === "2")
            return res(ctx.json({
                results: [
                    questionEasyCat2,
                    questionEasyCat2,
                    questionEasyCat2,
                    questionEasyCat2,
                    questionEasyCat2
                ]
            }));
        else if (difficultyParam === "medium" && categoryParam === "1")
            return res(ctx.json({
                results: [
                    questionMediumCat1,
                    questionMediumCat1,
                    questionMediumCat1,
                    questionMediumCat1,
                    questionMediumCat1
                ]
            }));
        else if (difficultyParam === "medium" && categoryParam === "2")
            return res(ctx.json({
                results: [
                    questionMediumCat2,
                    questionMediumCat2,
                    questionMediumCat2,
                    questionMediumCat2,
                    questionMediumCat2
                ]
            }));
        else if (difficultyParam === "hard" && categoryParam === "1")
            return res(ctx.json({
                results: [
                    questionHardCat1,
                    questionHardCat1,
                    questionHardCat1,
                    questionHardCat1,
                    questionHardCat1
                ]
            }));
        else if (difficultyParam === "hard" && categoryParam === "2")
            return res(ctx.json({
                results: [
                    questionHardCat2,
                    questionHardCat2,
                    questionHardCat2,
                    questionHardCat2,
                    questionHardCat2
                ]
            }));
        else
            return res(ctx.json({
                results: [
                    questionHardCat1,
                    questionMediumCat2,
                    questionHardCat1,
                    questionHardCat2,
                    questionEasyCat1
                ]
            }));
    })
);


beforeEach(() => {
    window.localStorage.clear();
    server.listen({
        onUnhandledRequest(req) {
            console.error(
                'Found an unhandled %s request to %s',
                req.method,
                req.url.href
            )
        },
    });
});

afterEach(() => {
    server.resetHandlers();
    cleanup();
})

afterAll(() => server.close());


test('dark mode button should be rendered', () => {
    render(<App />)

    const darkModeButton = screen.getByLabelText(/dark mode/i);

    expect(darkModeButton).toBeInTheDocument();
    expect(darkModeButton).toBeVisible();
})

test('when dark mode button is clicked, dark mode should turn on and off', () => {
    render(<App />)

    const divElement = screen.getByLabelText("app_container");
    const darkModeButton = screen.getByLabelText(/dark mode/i);

    expect(divElement).toHaveClass("app-container");

    userEvent.click(darkModeButton);

    expect(divElement).toHaveClass("app-container dark-mode");

    userEvent.click(darkModeButton);

    expect(divElement).toHaveClass("app-container");
})

test('start quizz page should be rendered', () => {
    render(<App />)

    const mainTitleElement = screen.getByText("Quizz Challenge");
    const paragraphElement = screen.getByText("Choose random trivia questions and answer as many as you can!");
    const selectElements = screen.getAllByRole("combobox");
    const buttonElement = screen.getByText("Start Quizz");

    expect(mainTitleElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
    expect(selectElements[0]).toBeInTheDocument();
    expect(selectElements[1]).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
})

test('difficulty select input should start empty and change when new option is clicked', () => {
    render(<App />);

    const difficultySelectElement = screen.getByRole("combobox", { name: "Difficulty" });

    expect(difficultySelectElement.value).toEqual("");

    const difficultyFirstOptionElement = screen.getByRole('option', { name: "Easy" });

    userEvent.selectOptions(difficultySelectElement, difficultyFirstOptionElement);

    expect(difficultySelectElement).toHaveValue("easy");
})

test('category select input should start empty and change when new option is clicked', async () => {
    render(<App />);

    const categorySelectElement = screen.getByRole("combobox", { name: "Category" });

    expect(categorySelectElement.value).toEqual("");

    const categoryFirstOptionElement = await screen.findByRole('option', { name: "CategoryTest1" });

    userEvent.selectOptions(categorySelectElement, categoryFirstOptionElement);

    expect(categorySelectElement).toHaveValue("1");
})

// An Integration Test for testing successful view change from one component to another
test('quizz game page should be rendered when "Start Quizz" button is clicked', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const defaultOptionElements = await screen.findAllByRole("option", { name: "Any" });
    const categoryDefaultOptionElement = defaultOptionElements[0];
    const difficultyDefaultOptionElement = defaultOptionElements[1];

    userEvent.selectOptions(selectCategoryElement, categoryDefaultOptionElement);
    userEvent.selectOptions(selectDifficultyElement, difficultyDefaultOptionElement);

    userEvent.click(buttonElement);

    expect(buttonElement).not.toBeInTheDocument();

    const questionContainerElement = await screen.findByLabelText("questions_container");
    const buttonElement1 = screen.getByText("Check Answers");
    const buttonElement2 = screen.getByText("Reset Quizz");

    expect(questionContainerElement.childElementCount).toEqual(5);
    expect(buttonElement1).toBeInTheDocument();
    expect(buttonElement2).toBeInTheDocument();
})

test('quizz game page should receive questions of category 1 and any difficulty', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionCategoryElement = await screen.findByRole("option", { name: "CategoryTest1" })
    const defaultOptionElements = await screen.findAllByRole("option", { name: "Any" });
    const difficultyDefaultOptionElement = defaultOptionElements[1];

    userEvent.selectOptions(selectCategoryElement, firstOptionCategoryElement);
    userEvent.selectOptions(selectDifficultyElement, difficultyDefaultOptionElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Question Cat1 Test/i);

    expect(questionElements).toHaveLength(5);
})

test('quizz game page should receive questions of category 2 and any difficulty', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionCategoryElement = await screen.findByRole("option", { name: "CategoryTest2" })
    const defaultOptionElements = await screen.findAllByRole("option", { name: "Any" });
    const difficultyDefaultOptionElement = defaultOptionElements[1];

    userEvent.selectOptions(selectCategoryElement, firstOptionCategoryElement);
    userEvent.selectOptions(selectDifficultyElement, difficultyDefaultOptionElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Question Cat2 Test/i);

    expect(questionElements).toHaveLength(5);
})

test('quizz game page should receive questions of easy difficulty and any category', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionDifficultyElement = screen.getByRole("option", { name: "Easy" })
    const defaultOptionElements = await screen.findAllByRole("option", { name: "Any" });
    const categoryDefaultOptionElement = defaultOptionElements[0];

    userEvent.selectOptions(selectCategoryElement, categoryDefaultOptionElement);
    userEvent.selectOptions(selectDifficultyElement, firstOptionDifficultyElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Easy Question Cat. Test/i);

    expect(questionElements).toHaveLength(5);
})

test('quizz game page should receive questions of medium difficulty and any category', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionDifficultyElement = screen.getByRole("option", { name: "Medium" })
    const defaultOptionElements = await screen.findAllByRole("option", { name: "Any" });
    const categoryDefaultOptionElement = defaultOptionElements[0];

    userEvent.selectOptions(selectCategoryElement, categoryDefaultOptionElement);
    userEvent.selectOptions(selectDifficultyElement, firstOptionDifficultyElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Medium Question Cat. Test/i);

    expect(questionElements).toHaveLength(5);
})

test('quizz game page should receive questions of hard difficulty and any category', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionDifficultyElement = screen.getByRole("option", { name: "Hard" })
    const defaultOptionElements = await screen.findAllByRole("option", { name: "Any" });
    const categoryDefaultOptionElement = defaultOptionElements[0];

    userEvent.selectOptions(selectCategoryElement, categoryDefaultOptionElement);
    userEvent.selectOptions(selectDifficultyElement, firstOptionDifficultyElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Hard Question Cat. Test/i);

    expect(questionElements).toHaveLength(5);
})

test('quizz game page should receive questions of easy difficulty and category 1', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionDifficultyElement = screen.getByRole("option", { name: "Easy" })
    const firstOptionCategoryElement = await screen.findAllByRole("option", { name: "CategoryTest1" });

    userEvent.selectOptions(selectCategoryElement, firstOptionCategoryElement);
    userEvent.selectOptions(selectDifficultyElement, firstOptionDifficultyElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Easy Question Cat1 Test/i);

    expect(questionElements).toHaveLength(5);
})

test('quizz game page should receive questions of easy difficulty and category 2', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionDifficultyElement = screen.getByRole("option", { name: "Easy" })
    const firstOptionCategoryElement = await screen.findAllByRole("option", { name: "CategoryTest2" });

    userEvent.selectOptions(selectCategoryElement, firstOptionCategoryElement);
    userEvent.selectOptions(selectDifficultyElement, firstOptionDifficultyElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Easy Question Cat2 Test/i);

    expect(questionElements).toHaveLength(5);
})

test('quizz game page should receive questions of medium difficulty and category 1', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionDifficultyElement = screen.getByRole("option", { name: "Medium" })
    const firstOptionCategoryElement = await screen.findAllByRole("option", { name: "CategoryTest1" });

    userEvent.selectOptions(selectCategoryElement, firstOptionCategoryElement);
    userEvent.selectOptions(selectDifficultyElement, firstOptionDifficultyElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Medium Question Cat1 Test/i);

    expect(questionElements).toHaveLength(5);
})

test('quizz game page should receive questions of medium difficulty and category 2', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionDifficultyElement = screen.getByRole("option", { name: "Medium" })
    const firstOptionCategoryElement = await screen.findAllByRole("option", { name: "CategoryTest2" });

    userEvent.selectOptions(selectCategoryElement, firstOptionCategoryElement);
    userEvent.selectOptions(selectDifficultyElement, firstOptionDifficultyElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Medium Question Cat2 Test/i);

    expect(questionElements).toHaveLength(5);
})

test('quizz game page should receive questions of hard difficulty and category 1', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionDifficultyElement = screen.getByRole("option", { name: "Hard" })
    const firstOptionCategoryElement = await screen.findAllByRole("option", { name: "CategoryTest1" });

    userEvent.selectOptions(selectCategoryElement, firstOptionCategoryElement);
    userEvent.selectOptions(selectDifficultyElement, firstOptionDifficultyElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Hard Question Cat1 Test/i);

    expect(questionElements).toHaveLength(5);
})

test('quizz game page should receive questions of hard difficulty and category 2', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    const selectCategoryElement = screen.getByRole("combobox", { name: "Category" });
    const selectDifficultyElement = screen.getByRole("combobox", { name: "Difficulty" });

    const firstOptionDifficultyElement = screen.getByRole("option", { name: "Hard" })
    const firstOptionCategoryElement = await screen.findAllByRole("option", { name: "CategoryTest2" });

    userEvent.selectOptions(selectCategoryElement, firstOptionCategoryElement);
    userEvent.selectOptions(selectDifficultyElement, firstOptionDifficultyElement);
    userEvent.click(buttonElement);

    const questionElements = await screen.findAllByText(/Hard Question Cat2 Test/i);

    expect(questionElements).toHaveLength(5);
})

test('when "Reset Quizz" button is clicked on quizz game page, app should go back to start quizz menu page', async() => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    userEvent.click(buttonElement);

    const resetButtonElement = screen.getByText("Reset Quizz");
    userEvent.click(resetButtonElement);

    expect(resetButtonElement).not.toBeInTheDocument();

    const buttonElement2 = screen.getByText("Start Quizz");

    expect(buttonElement2).toBeInTheDocument();
})

test('when answer is clicked on quizz game page it should become selected', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    userEvent.click(buttonElement);

    const answerElements = await screen.findAllByLabelText(/answer/i);
    const firstAnswerElement = answerElements[0];

    userEvent.click(firstAnswerElement);

    expect(firstAnswerElement).toHaveClass("answer answer_selected");
})

test('when another answer of same question is clicked on quizz game page, previously clicked anwer should become deselected', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    userEvent.click(buttonElement);

    const answerElements = await screen.findAllByLabelText(/answer/i);
    const firstAnswerElement = answerElements[0];
    const secondAnswerElement = answerElements[1];

    userEvent.click(firstAnswerElement);

    expect(firstAnswerElement).toHaveClass("answer answer_selected");
    expect(secondAnswerElement).toHaveClass("answer");

    userEvent.click(secondAnswerElement);

    expect(firstAnswerElement).toHaveClass("answer");
    expect(secondAnswerElement).toHaveClass("answer answer_selected");
})

test('when a correct answer is selected on quizz game page and "Check Answers" button is clicked, answer should have appropriate class', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    userEvent.click(buttonElement);

    const correctAnswerElements = await screen.findAllByText(/Answer Test 1/i);
    const firstQuestionCorrectAnswerElement = correctAnswerElements[0];
    userEvent.click(firstQuestionCorrectAnswerElement);

    expect(firstQuestionCorrectAnswerElement).toHaveClass("answer answer_selected");

    const checkAnswersButtonElement = await screen.findByText("Check Answers");
    userEvent.click(checkAnswersButtonElement);

    expect(firstQuestionCorrectAnswerElement).toHaveClass("answer answer_selected answer_correct");
})

test('when an incorrect answer is selected on quizz game page and "Check Answers" button is clicked, answer should have appropriate class', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    userEvent.click(buttonElement);

    const incorrectAnswerElements = await screen.findAllByText(/Answer Test 2/i);
    const firstQuestionIncorrectAnswerElement = incorrectAnswerElements[0];
    userEvent.click(firstQuestionIncorrectAnswerElement);

    expect(firstQuestionIncorrectAnswerElement).toHaveClass("answer answer_selected");

    const checkAnswersButtonElement = await screen.findByText("Check Answers");
    userEvent.click(checkAnswersButtonElement);

    expect(firstQuestionIncorrectAnswerElement).toHaveClass("answer answer_incorrect answer_selected");
})

// An Integration Test for the Question component's answer checking
test('when "Check Answers" button is clicked on quizz game page, all unselected answers (correct and incorrect) should have appropriate class', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    userEvent.click(buttonElement);

    const correctAnswerElements = await screen.findAllByText(/Answer Test 1/i);
    const incorrectAnswerElements1 = await screen.findAllByText(/Answer Test 2/i);
    const incorrectAnswerElements2 = await screen.findAllByText(/Answer Test 3/i);
    const incorrectAnswerElements3 = await screen.findAllByText(/Answer Test 4/i);

    const firstQuestionCorrectAnswerElement = correctAnswerElements[0];
    const firstQuestionIncorrectAnswerElement1 = incorrectAnswerElements1[0];
    const firstQuestionIncorrectAnswerElement2 = incorrectAnswerElements2[0];
    const firstQuestionIncorrectAnswerElement3 = incorrectAnswerElements3[0];

    const checkAnswersButtonElement = await screen.findByText("Check Answers");
    userEvent.click(checkAnswersButtonElement);

    expect(firstQuestionCorrectAnswerElement).toHaveClass("answer answer_correct")
    expect(firstQuestionIncorrectAnswerElement1).toHaveClass("answer answer_dimmed");
    expect(firstQuestionIncorrectAnswerElement2).toHaveClass("answer answer_dimmed");
    expect(firstQuestionIncorrectAnswerElement3).toHaveClass("answer answer_dimmed");
})

test('when "Check Answers" button is clicked on quizz game page, score should show correct number of correct answers selected', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    userEvent.click(buttonElement);

    const correctAnswerElements = await screen.findAllByText(/Answer Test 1/i);

    const firstQuestionCorrectAnswerElement = correctAnswerElements[0];
    const secondQuestionCorrectAnswerElement = correctAnswerElements[1];
    const fifthQuestionCorrectAnswerElement = correctAnswerElements[4];
    userEvent.click(firstQuestionCorrectAnswerElement);
    userEvent.click(secondQuestionCorrectAnswerElement);
    userEvent.click(fifthQuestionCorrectAnswerElement);

    const checkAnswersButtonElement = await screen.findByText("Check Answers");
    userEvent.click(checkAnswersButtonElement);

    const scoreElement = await screen.findByLabelText("results_description");
    expect(scoreElement).toHaveTextContent("You scored 3/5 correct answers");
})

test('when "Play Again" button is clicked on quizz game page, score should not be shown anymore', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    userEvent.click(buttonElement);

    const checkAnswersButtonElement = await screen.findByText("Check Answers");
    userEvent.click(checkAnswersButtonElement);

    const scoreElement = await screen.findByLabelText("results_description");
    expect(scoreElement).toHaveClass("results_description");

    const playAgainButtonElement = await screen.findByText("Play Again");
    userEvent.click(playAgainButtonElement);

    expect(scoreElement).toHaveClass("results_description results_description_hide");
})

test('when "Play Again" button is clicked on quizz game page, new questions should be shown', async () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    userEvent.click(buttonElement);

    const correctAnswerElements = await screen.findAllByText(/Answer Test 1/i);
    const firstQuestionCorrectAnswer = correctAnswerElements[0];
    userEvent.click(firstQuestionCorrectAnswer);

    expect(firstQuestionCorrectAnswer).toHaveClass("answer answer_selected");

    const checkAnswersButtonElement = await screen.findByText("Check Answers");
    userEvent.click(checkAnswersButtonElement);

    const playAgainButtonElement = await screen.findByText("Play Again");
    userEvent.click(playAgainButtonElement);

    expect(firstQuestionCorrectAnswer).toHaveClass("answer");
})
