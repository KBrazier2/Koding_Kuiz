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
        question: "What is not a Data Type?!",
        choice1: "Number",
        choice2: "String",
        choice3: "Boolean",
        choice4: "Sonic the Hedgehog",
        answer: 4
    },
    {
        question: "What allows a user to enter input by providing a text box?!",
        choice1: "Soap Box",
        choice2: "Prompt Box",
        choice3: "Cardboard Box",
        choice4: "Jack-in-the-Box",
        answer: 2
    },
    {
        question: "Which of the following is not a looping structure?!",
        choice1: "For Loop",
        choice2: "Loop-di-Loop",
        choice3: "While Loop",
        choice4: "Do-While Loops",
        answer: 2
    },
    {
        question: "What is not a boolean operator?!",
        choice1: "&&",
        choice2: "||",
        choice3: "UwU",
        choice4: "!",
        answer: 3
    },
    {
        question: "What is JavaScript?!",
        choice1: "An Object based Programming language. It is client-side and server-side, and can be inserted into HTML pages",
        choice2: "A movie outline written while consuming coffee",
        choice3: "A coffee consumed while writing a movie outline",
        choice4: "A Coffee Movie Outline",
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


//Timer from exercise 08 Week 4

var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var secondsLeft = 25;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }

  }, 1000);
}

// function sendMessage() {
//   timeEl.textContent = " ";

//   var imgEl = document.createElement("img");

//   imgEl.setAttribute("src", "images/image_1.jpg");
//   mainEl.appendChild(imgEl);

// }


setTime();


startGame();
