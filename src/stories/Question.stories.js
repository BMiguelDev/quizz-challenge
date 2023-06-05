import Question from "../components/Question/Question";

export default {
    title: "Components/Question",
    component: Question,
    tags: ['autodocs'],
    argTypes: {
        handleSelectAnswer: { action: "handleSelectAnswerLog" }  // Whenever an answer is pressed, the "actions" tab will have logs
    }
}

const Template = args => <Question {...args} />

export const MultipleChoice = Template.bind({})
MultipleChoice.args = {
    questionData: {
        category: "Entertainment: Video Games",
        type: "multiple",
        difficulty: "medium",
        question: "In the 2002 video game 'Kingdom Hearts', how many playable worlds were there?",
        correct_answer: "14",
        incorrect_answers: [
            "13",
            "16",
            "11"
        ]
    },
    questionIndex: 1,
    isShowResults: false,
    //handleSelectAnswer: () => null
}

export const TrueOrFalse = Template.bind({})
TrueOrFalse.args = {
    questionData: {
        category: "General Knowledge",
        type: "boolean",
        difficulty: "easy",
        question: "Ping-Pong originated in England",
        correct_answer: "True",
        incorrect_answers: [
            "False"
        ]
    },
    questionIndex: 1,
    isShowResults: false,
    //handleSelectAnswer: () => null
}

export const LongQuestion = Template.bind({})
LongQuestion.args = {
    questionData: {

        category: "Entertainment: Books",
        type: "multiple",
        difficulty: "hard",
        question: "In which classic novel by Mark Twain did a beggar and Prince of Wales switch clothes, and learn about social class inequality?",
        correct_answer: "The Prince and the Pauper",
        incorrect_answers: [
            "Hamlet",
            "Wealthy Boy and the Schmuck",
            "A Modern Twain Story"
        ]
    },
    questionIndex: 1,
    isShowResults: false,
    //handleSelectAnswer: () => null
}

export const LongAnswers = Template.bind({})
LongAnswers.args = {
    questionData: {
        category: "Entertainment: Film",
        type: "multiple",
        difficulty: "hard",
        question: "What three movies, in order from release date, make up the 'Dollars Trilogy'?",
        correct_answer: "'A Fistful of Dollars', 'For a Few Dollars More', 'The Good, the Bad, and the Ugly'",
        incorrect_answers: [
            "'The Good, the Bad, and the Ugly', 'For A Few Dollars More', 'A Fistful of Dollars'",
            "'For a Few Dollars More', 'The Good, the Bad, and the Ugly', 'A Fistful of Dollars'",
            "'For a Few Dollars More', 'A Fistful of Dollars', 'The Good, the Bad, and the Ugly'"
        ]
    },
    questionIndex: 1,
    isShowResults: false,
    //handleSelectAnswer: () => null
}

export const AnswerSelected = Template.bind({})
AnswerSelected.args = {
    questionData: {
        category: "Geography",
        type: "multiple",
        difficulty: "hard",
        question: "Which country was NOT formerly part of Yugoslavia?",
        correct_answer: "Albania",
        incorrect_answers: [
            "Croatia",
            "Serbia",
            "Macedonia"
        ],
        answerSelected: "Croatia"
    },
    questionIndex: 1,
    isShowResults: false,
    //handleSelectAnswer: () => null
}
