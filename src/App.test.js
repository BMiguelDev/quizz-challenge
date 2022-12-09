import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import App from "./App"

jest.mock("nanoid", () => ({
    __esModule: true,
    nanoid: () => Date.now
}));

test('dark mode button should be rendered', () => {
    render(<App />)

    const darkModeButton = screen.getByTitle(/dark mode/i);

    expect(darkModeButton).toBeInTheDocument();
    expect(darkModeButton).toBeVisible();
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


test('quizz game page should be rendered when "Start Quizz" button is clicked', () => {
    render(<App />)

    const buttonElement = screen.getByText("Start Quizz");
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(buttonElement);

    expect(buttonElement).not.toBeInTheDocument();

    // TODO: either include api testing things here or modify the test to be more simple (like "when button is clicked it disappears")
})