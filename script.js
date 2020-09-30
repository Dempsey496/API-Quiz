// Create Variables
var container = document.getElementById("container");
var begin = document.getElementById("begin");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var clock = document.getElementById("clock");
var submitForm = document.getElementById("submitScore");
var answerStatus = document.getElementById("answer");
var currentQuest = 0;
var correctAnswers = 0;
var timeLeft = 100;
var gameOver = false;


// Create Array with Questions and Answers
var Quest = [
    {
        question: "Which is a type of Pop up box available in Javascript?",
        choices: ["Alert", "Confirm", "Prompt", "All of the above"],
        answer: "All of the above",
    },
    {
        question: "What year was Javascript developed?",
        choices: ["1997", "2020", "1995", "1818"],
        answer: "1995",
    },
    {
        question: "Which is a combination of values, variables, and operators?",
        choices: ["Expressions", "Functions", "Mergers", "Acquisitions"],
        answer: "Expressions",
    },
    {
        question: "Which tool used during development and debugging for printing content to the debugger?",
        choices: ["Confirm", "window.print", "For loops", "Console.log"],
        answer: "Console.log",
    },
    {
        question: "Which is used to seperate statements?",
        choices: ["Exclamation points", "Quotes", "Semicolons", "Square Brackets"],
        answer: "Semicolons",
    },
    {
        question: "Which is used to convert string inputs to numbers?",
        choices: ["Yarn", "ParseFloat", "Booleans", "Console.log"],
        answer: "ParseFloat",
    },
];


// Create Timer Function, clear Q & A when it reaches 0
function startTimer() {
    var clock = setInterval(function () {
        if (gameOver != true && timeLeft > 0) {
            document.getElementById("clock").innerHTML = "COUNT DOWN: " + timeLeft;
            timeLeft -= 1;
        }
        else {
            clearInterval(clock);
            gameOver = true;
        }
        question.textContent = "";
        choices.innerHTML = "";
        answerStatus.textContent = "";
        renderSubmitScore()

    }, 1000);
}

function renderSubmitScore() {
    var h1 = document.createElement("h4");
    h1.textContent = "Your Score is: " + timeLeft;
    submitForm.append(h1);
    var br = document.createElement("br");
    var label = document.createElement("label");
    label.setAttribute("for", "initials");
    label.textContent = "Enter Your Initials";
    submitForm.append(label);
    submitForm.append(br);
    var br = document.createElement("br");
    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.setAttribute("id", "initials");
    initials.setAttribute("name", "initials");
    initials.required = true;
    submitForm.append(initials);
    submitForm.append(br);
    var submit = document.createElement("input");
    submit.setAttribute("class", "btn btn-info");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("onclick", "saveScore(document.getElementById('initials').value,timeLeft)");
    submitForm.append(submit);
    clock.style.display = "none";
}

function saveScore(userInitials, score) {
    var initials = document.getElementById("initials")
    if (initials.value == "") {
        answerStatus.textContent = "Initials cannot be blank!";
    } else {
        myStorage = window.localStorage;
        myStorage.setItem(userInitials, score);
        window.location.href = "highscorePage.html"
    }
}

function renderQuestions(array) {
    if (array != undefined) {
        var newQuestion = document.createTextNode(array["question"]);
        question.append(newQuestion);
        for (i = 0; i < array.choices.length; i++) {
            var button = document.createElement("button");
            button.setAttribute("class", "btn btn-info");
            button.textContent = array.choices[i];
            button.setAttribute("data-value", array.choices[i]);
            choices.append(button);
        } else {
            gameOver = true;
            answerStatus.textContent = "";
        }
    }
}


// Create Event Listeners 

begin.addEventListener("click", function () {
    startTimer();
    begin.style.display = "none";
    var questionToDisplay = Quest[currentQuest];
    renderQuestions(questionToDisplay);
});

choices.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        var selectedAnswer = event.target.textContent;
        if (selectedAnswer != Quest[currentQuest].answer) {
            timeLeft -= 10;
            answerStatus.textContent = "Incorrect!";
        } else {
            correctAnswers++;
            answerStatus.textContent = "Correct!";
        }
        setTimeout(function () {
            currentQuest++;
            var questionToDisplay = Quest[currentQuest];
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            question.textContent = "";
            choices.innerHTML = "";
            renderQuestions(questionToDisplay);
        }, 100);
    }
});
