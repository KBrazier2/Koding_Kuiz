const inquiry = document.getElementById("inquiry");
const options = Array.from(document.getElementsByClassName("option-text"));
const inquiryCounterText = document.getElementById('inquiryCounter');
const pointText = document.getElementById('point');

let currentInquiry = {};
let acceptingAnswers = true;
let point = 0;
let inquiryCounter = 0;
let possibleInquiries = [];

//List of questions and answers
let inquiries = [
    {
        inquiry: "What is not a Data Type?!",
        option1: "Number",
        option2: "String",
        option3: "Boolean",
        option4: "Sonic the Hedgehog",
        answer: 4
    },
    {
        inquiry: "What allows a user to enter input by providing a text box?!",
        option1: "Soap Box",
        option2: "Prompt Box",
        option3: "Cardboard Box",
        option4: "Jack-in-the-Box",
        answer: 2
    },
    {
        inquiry: "Which of the following is not a looping structure?!",
        option1: "For Loop",
        option2: "Loop-di-Loop",
        option3: "While Loop",
        option4: "Do-While Loops",
        answer: 2
    },
    {
        inquiry: "What is not a boolean operator?!",
        option1: "&&",
        option2: "||",
        option3: "UwU",
        option4: "!",
        answer: 3
    },
    {
        inquiry: "What is JavaScript?!",
        option1: "An Object based Programming language. It is client-side and server-side, and can be inserted into HTML pages",
        option2: "A movie outline written while consuming coffee",
        option3: "A coffee consumed while writing a movie outline",
        option4: "A Coffee Movie Outline",
        answer: 1
    },
]
//Constants
const CORRECT_REWARD = 1;
const MAX_INQUIRIES = 5;

startQuiz = () => {
    inquiryCounter = 0;
    point = 0;
    possibleInquiries = [...inquiries];
    getNewInquiry();
};

getNewInquiry = () => {
        if(possibleInquiries.length === 0 || inquiryCounter >= MAX_INQUIRIES) {
            localStorage.setItem("mostRecentPoint", point);
            return window.location.assign("final.html");
        }
    inquiryCounter++;
    inquiryCounterText.innerText = inquiryCounter + "/" + MAX_INQUIRIES;
    const inquiryIndex = Math.floor(Math.random() * possibleInquiries.length);
    currentInquiry = possibleInquiries[inquiryIndex];
    inquiry.innerText = currentInquiry.inquiry;

    options.forEach( option => {
        const number = option.dataset['number'];
        option.innerText = currentInquiry['option' + number];
    });

    possibleInquiries.splice(inquiryIndex, 1);
    acceptingAnswers = true;

};

options.forEach(option => {
    option.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset["number"];

        const classToApply =
            selectedAnswer == currentInquiry.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementPoint(CORRECT_REWARD);
        }
        else if (classToApply === "incorrect"){
            secondsRemaining = secondsRemaining - 5;
        }
        
        selectedOption.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedOption.parentElement.classList.remove(classToApply);
            getNewInquiry();
        }, 1000);

    });
});

incrementPoint = num => {
    point += num;
    pointText.innerText = point;
}


//Timer from exercise 08 Week 4

var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var secondsRemaining = 50;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsRemaining--;
    timeEl.textContent = secondsRemaining;

    if(secondsRemaining === 0) {
        localStorage.setItem("mostRecentPoint", point);
        return window.location.assign("final.html");
    }

  }, 1000);
}


setTime();


startQuiz();
