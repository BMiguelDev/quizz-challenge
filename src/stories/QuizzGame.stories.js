import QuizzGame from "../components/QuizzGame/QuizzGame";

export default {
    title: "Components/QuizzGame",
    component: QuizzGame,
    tags: ['autodocs'],
    argTypes: {
        handleSelectAnswer: { action: "handleSelectAnswerLog" },  // Whenever an answer is pressed, the "actions" tab will have logs
        handleCheckResults: { action: "handleCheckResultsLog" },
        handleQuizzReset: { action: "handleQuizzResetLog" }
    }
}

const Template = args => <QuizzGame {...args} />

export const QuizzWithFewQuestions = Template.bind({})
QuizzWithFewQuestions.args = {
    isLoading: false,
    quizzQuestions: [
        {
            category: "Entertainment: Film",
            type: "multiple",
            difficulty: "medium",
            question: "Which one of these films are shot entirely in one-take?",
            correct_answer: "Russian Ark",
            incorrect_answers: [
                "Good Will Hunting",
                "Birdman",
                "Schindler's List"
            ]
        },
        {
            category: "Entertainment: Film",
            type: "multiple",
            difficulty: "medium",
            question: "What Queen song plays during the final fight scene of the film 'Hardcore Henry'?",
            correct_answer: "Don't Stop Me Now",
            incorrect_answers: [
                "Brighton Rock",
                "Another Bites the Dust",
                "We Will Rock You"
            ]
        }
    ],
    quizzResults: [false, 0],
    // handleSelectAnswer: () => null,
    // handleCheckResults: () => null,
    // handleQuizzReset:() => null,
}

export const QuizzWithResults = Template.bind({})
QuizzWithResults.args = {
    isLoading: false,
    quizzQuestions: [
        {
            category: "Entertainment: Film",
            type: "multiple",
            difficulty: "medium",
            question: "Which one of these films are shot entirely in one-take?",
            correct_answer: "Russian Ark",
            incorrect_answers: [
                "Good Will Hunting",
                "Birdman",
                "Schindler's List"
            ]
        },
        {
            category: "Entertainment: Film",
            type: "multiple",
            difficulty: "medium",
            question: "What Queen song plays during the final fight scene of the film 'Hardcore Henry'?",
            correct_answer: "Don't Stop Me Now",
            incorrect_answers: [
                "Brighton Rock",
                "Another Bites the Dust",
                "We Will Rock You"
            ]
        },
        {
            category: "History",
            type: "multiple",
            difficulty: "medium",
            question: "Which infamous European traitor was known as 'the last person to enter Parliament with honest intentions'?",
            correct_answer: "Guy Fawkes",
            incorrect_answers: [
                "Robert Catesby",
                "Francis Tresham",
                "Everard Digby"
            ]
        },
        {
            category: "Entertainment: Video Games",
            type: "boolean",
            difficulty: "medium",
            question: "The Sniper's SMG in Team Fortress 2, was originally intended to be the Scout's primary weapon.",
            correct_answer: "True",
            incorrect_answers: [
                "False"
            ]
        },
        {
            category: "Science & Nature",
            type: "boolean",
            difficulty: "easy",
            question: "Celiac Disease is a disease that effects the heart, causing those effected to be unable to eat meat.",
            correct_answer: "False",
            incorrect_answers: [
                "True"
            ]
        }
    ],
    quizzResults: [true, 3],
    // handleSelectAnswer: () => null,
    // handleCheckResults: () => null,
    // handleQuizzReset:() => null,
}

export const QuizzIsLoading = Template.bind({})
QuizzIsLoading.args = {
    isLoading: true,
    quizzQuestions: [],
    quizzResults: [false, 0],
    // handleSelectAnswer: () => null,
    // handleCheckResults: () => null,
    // handleQuizzReset:() => null,
}
