var startBtnEl = document.getElementById("start");
var ans1El = document.getElementById("answer1");
var ans2El = document.getElementById("answer2");
var ans3El = document.getElementById("answer3");
var ans4El = document.getElementById("answer4");
var questionEl = document.getElementById("questionArea");
var questionContainer = document.getElementById("questionContainer");
var scoreContainerEl = document.getElementById("scoreContainer");
var initialsInputEl = document.getElementById("highScore");
var scoreList = document.querySelector("#score-list");
var index = 0;
var timeLeft = 20;
var score = 0;
var highScores = [];
var enterButton = document.getElementById("enter");
var questionsSet = [
  {
    question: "What is an array wrapped in?",
    answer_choices: [
      "square brackets",
      "quotations",
      "tinfoil",
      "curly brackets",
    ],
    answer: "square brackets",
  },
  {
    question: "What does HTML stand for?",
    answer_choices: [
      "hyper time me likey",
      "hyper text markup language",
      "hi tim mike lui",
      "hyper text madeup language",
    ],
    answer: "hyper text markup language",
  },
  {
    question: "What does CSS stand for?",
    answer_choices: [
      "cross super simple",
      "cascading style sheet",
      "criminal stupid seriously",
      "cross style sheet",
    ],
    answer: "cascading style sheet",
  },
  {
    question: "What is the world's most popular programming language?",
    answer_choices: ["python", "C++", "savajcript", "javascript"],
    answer: "javascript",
  },
];

init();

function startTimer() {
  var clock = setInterval(function () {
    if (timeLeft > 0 && index < questionsSet.length) {
      document.getElementById("clock").innerHTML = "COUNT DOWN: " + timeLeft;
      timeLeft -= 1;
      // fix timeLeft
    } else {
      clearInterval(clock);
      document.getElementById("clock").innerHTML = "";
    }
  }, 1000);
}

function questionGen() {
  var currentQuestion = questionsSet[index];
  questionEl.textContent = currentQuestion.question;
  ans1El.textContent = currentQuestion.answer_choices[0];
  ans2El.textContent = currentQuestion.answer_choices[1];
  ans3El.textContent = currentQuestion.answer_choices[2];
  ans4El.textContent = currentQuestion.answer_choices[3];
}

function checkAnswer(event) {
  if (event.target.outerText === questionsSet[index].answer) {
    score++;
  } else {
    timeLeft -= 15;
  }
  index++;
  if (timeLeft > 0 && index < questionsSet.length) {
    questionGen();
  } else {
    questionContainer.setAttribute("style", "display: none;");
    scoreContainerEl.removeAttribute("style");
    initialsInputEl.removeAttribute("style");
    index = 0;
    timeLef = 20;
  }
}
ans1El.addEventListener("click", checkAnswer);
ans2El.addEventListener("click", checkAnswer);
ans3El.addEventListener("click", checkAnswer);
ans4El.addEventListener("click", checkAnswer);
enterButton.addEventListener("click", function (event) {
  event.preventDefault();
  var initials = document.getElementById("initials").value.trim();
  console.log(initials);
  console.log(score);
  window.localStorage.setItem("initials", JSON.stringify(initials));
});

startBtnEl.addEventListener("click", function () {
  questionGen();
  startTimer();
  questionContainer.removeAttribute("style");
  startBtnEl.setAttribute("style", "display: none;");
  scoreContainerEl.setAttribute("style", "display: none;");
});

function setHighScore() {
  scoreList.innerHTML = "";
  // Render a new li for each todo
  for (var i = 0; i < highScores.length; i++) {
    var highScore = highScores[i];
    console.log(highScore);

    var li = document.createElement("li");
    li.textContent = highScore;
    li.setAttribute("data-index", i);
  }
}

function init() {
  // Get stored todos from localStorage
  // Parsing the JSON string to an object
  var storedScores = JSON.parse(localStorage.getItem("initials"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedScores !== null) {
    console.log(storedScores);
    highScores = storedScores;
  }

  // Render todos to the DOM
  setHighScore();
}
