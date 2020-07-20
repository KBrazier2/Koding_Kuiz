const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the answer to question number 1?!",
        choice1: "choice",
        choice2: "choice",
        choice3: "choice",
        choice4: "correct choice",
        answer: 4
    },
    {
        question: "What is the answer to question number 2?!",
        choice1: "choice",
        choice2: "correct choice",
        choice3: "choice",
        choice4: "choice",
        answer: 2
    },
    {
        question: "What is the answer to question number 3?!",
        choice1: "choice",
        choice2: "correct choice",
        choice3: "choice",
        choice4: "choice",
        answer: 2
    },
    {
        question: "What is the answer to question number 4?!",
        choice1: "choice",
        choice2: "choice",
        choice3: "correct choice",
        choice4: "choice",
        answer: 3
    },
    {
        question: "What is the answer to question number 5?!",
        choice1: "correct choice",
        choice2: "choice",
        choice3: "choice",
        choice4: "choice",
        answer: 1
    },
]

//Constants
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

        if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
            return window.location.assign("end.html");
        }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];

    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }


        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
