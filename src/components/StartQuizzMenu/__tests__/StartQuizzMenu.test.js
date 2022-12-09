import { cleanup, render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';

import StartQuizzMenu from "../StartQuizzMenu";


afterEach(() => {
    cleanup();
})


const quizzCategoriesTest = [
    {
        id: 1,
        name: "Test1"
    },
    {
        id: 2,
        name: "Test2"
    }
];

const quizzOptionsTest = {
    category: "categoryTest1",
    difficulty: "difficultyTest1",
    urlUsed: "urlTest1"
}

const propFunction1 = jest.fn();
const propFunction2 = jest.fn();


test('component should always match snapshot', () => {
    //const tree = renderer.create(<StartQuizzMenu quizzCategoriesArray={quizzCategoriesTest} quizzOptions={quizzOptionsTest} />).toJSON();
    const tree = renderer.create(<StartQuizzMenu quizzCategoriesArray={quizzCategoriesTest} quizzOptions={quizzOptionsTest} handleQuizzStart={propFunction1} handleQuizzOptionChange={propFunction2} />).toJSON();

    expect(tree).toMatchSnapshot();
});


test('both select inputs should have empty value', () => {
    // Arrange
    render(<StartQuizzMenu quizzCategoriesArray={quizzCategoriesTest} quizzOptions={quizzOptionsTest} handleQuizzStart={propFunction1} handleQuizzOptionChange={propFunction2} />)

    // Act
    const selectElements = screen.getAllByRole('combobox');
    const [selectCategoryElement, selectDifficultyElement] = selectElements;

    const defaultOptionElements = screen.getAllByRole('option', { name: /any/i });
    const [defaultOptionElementCategory, defaultOptionElementDifficulty] = defaultOptionElements;

    // Assert
    expect(selectCategoryElement).toHaveValue("");
    expect(selectDifficultyElement).toHaveValue("");

    expect(defaultOptionElementCategory.selected).toBeTruthy();
    expect(defaultOptionElementDifficulty.selected).toBeTruthy();
})

test('category select input should have correct number of options', () => {
    render(<StartQuizzMenu quizzCategoriesArray={quizzCategoriesTest} quizzOptions={quizzOptionsTest} handleQuizzStart={propFunction1} handleQuizzOptionChange={propFunction2} />)

    const categorySelectElement = screen.getByRole("combobox", { name: /category/i });

    expect(categorySelectElement.childElementCount).toEqual(3);
})

test('difficulty select input should have correct number of options', () => {
    render(<StartQuizzMenu quizzCategoriesArray={quizzCategoriesTest} quizzOptions={quizzOptionsTest} handleQuizzStart={propFunction1} handleQuizzOptionChange={propFunction2} />)

    const difficultySelectElement = screen.getByRole("combobox", { name: /difficulty/i });

    expect(difficultySelectElement.childElementCount).toEqual(4);
})

test('quizz start button should be enabled', () => {
    render(<StartQuizzMenu quizzCategoriesArray={quizzCategoriesTest} quizzOptions={quizzOptionsTest} handleQuizzStart={propFunction1} handleQuizzOptionChange={propFunction2} />)

    const buttonElement = screen.getByRole('button');
    
    expect(buttonElement).toBeEnabled();
})
