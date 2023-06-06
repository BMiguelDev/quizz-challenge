import StartQuizzMenu from "../components/StartQuizzMenu/StartQuizzMenu";

export default {
    title: "Components/StartQuizzMenu",
    component: StartQuizzMenu,
    tags: ['autodocs'],
    argTypes: {
        handleQuizzStart: { action: "handleQuizzStartLog" },  // Whenever the start button is pressed, the "actions" tab will have logs
        handleQuizzOptionChange: { action: "handleQuizzOptionChangeLog" }, // Whenever an option is clicked, the "actions" tab will have logs
    }
}

const Template = args => <StartQuizzMenu {...args} />

export const FewCategoryOptions = Template.bind({})
FewCategoryOptions.args = {
    quizzCategoriesArray: [
        {"id":9,"name":"General Knowledge"},
        {"id":10,"name":"Entertainment: Books"},
        {"id":11,"name":"Entertainment: Film"},
        {"id":12,"name":"Entertainment: Music"}
    ],
    quizzOptions: {
        category: "",
        difficulty: "",
        urlUsed: ""
    },
    //handleQuizzStart: () => null,
    //handleQuizzOptionChange: () => null
}

export const EmptyQuizzOptions = Template.bind({})
EmptyQuizzOptions.args = {
    quizzCategoriesArray: [
        {"id":9,"name":"General Knowledge"},
        {"id":10,"name":"Entertainment: Books"},
        {"id":11,"name":"Entertainment: Film"},
        {"id":12,"name":"Entertainment: Music"},
        {"id":13,"name":"Entertainment: Musicals & Theatres"},
        {"id":14,"name":"Entertainment: Television"},
        {"id":15,"name":"Entertainment: Video Games"},
        {"id":16,"name":"Entertainment: Board Games"},
        {"id":17,"name":"Science & Nature"},
        {"id":18,"name":"Science: Computers"},
        {"id":19,"name":"Science: Mathematics"},
        {"id":20,"name":"Mythology"},
        {"id":21,"name":"Sports"},
        {"id":22,"name":"Geography"},
        {"id":23,"name":"History"},
        {"id":24,"name":"Politics"},
        {"id":25,"name":"Art"},
        {"id":26,"name":"Celebrities"},
        {"id":27,"name":"Animals"},
        {"id":28,"name":"Vehicles"},
        {"id":29,"name":"Entertainment: Comics"},
        {"id":30,"name":"Science: Gadgets"},
        {"id":31,"name":"Entertainment: Japanese Anime & Manga"},
        {"id":32,"name":"Entertainment: Cartoon & Animations"}
    ],
    quizzOptions: {
        category: "",
        difficulty: "",
        urlUsed: "https://opentdb.com/api.php?amount=5"
    },
    //handleQuizzStart: () => null,
    //handleQuizzOptionChange: () => null
}

export const SpecificQuizzOptions = Template.bind({})
SpecificQuizzOptions.args = {
    quizzCategoriesArray: [
        {"id":9,"name":"General Knowledge"},
        {"id":10,"name":"Entertainment: Books"},
        {"id":11,"name":"Entertainment: Film"},
        {"id":12,"name":"Entertainment: Music"},
        {"id":13,"name":"Entertainment: Musicals & Theatres"},
        {"id":14,"name":"Entertainment: Television"},
        {"id":15,"name":"Entertainment: Video Games"},
        {"id":16,"name":"Entertainment: Board Games"},
        {"id":17,"name":"Science & Nature"},
        {"id":18,"name":"Science: Computers"},
        {"id":19,"name":"Science: Mathematics"},
        {"id":20,"name":"Mythology"},
        {"id":21,"name":"Sports"},
        {"id":22,"name":"Geography"},
        {"id":23,"name":"History"},
        {"id":24,"name":"Politics"},
        {"id":25,"name":"Art"},
        {"id":26,"name":"Celebrities"},
        {"id":27,"name":"Animals"},
        {"id":28,"name":"Vehicles"},
        {"id":29,"name":"Entertainment: Comics"},
        {"id":30,"name":"Science: Gadgets"},
        {"id":31,"name":"Entertainment: Japanese Anime & Manga"},
        {"id":32,"name":"Entertainment: Cartoon & Animations"}
    ],
    quizzOptions: {
        category: "9",
        difficulty: "medium",
        urlUsed: "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium"
    },
    //handleQuizzStart: () => null,
    //handleQuizzOptionChange: () => null
}
