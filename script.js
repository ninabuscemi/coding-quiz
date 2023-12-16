var startButton = document.getElementById("start-btn");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.style.display = "none";
  showQuestion();
  questionContainer.style.display = "block";
  startTimer();
}

var timerElement = document.getElementById("timer");
var timerInterval;
var timeLeft;

function startTimer() {
  timeLeft = 75; // Set the desired time in seconds
  timerInterval = setInterval(function() {
    timeLeft--;
    timerElement.textContent = "Time: " + timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function showScore() {
  stopTimer();
  // Rest of the code to show the score
}

// Modify the startQuiz() function as follows

function startQuiz() {
  startButton.style.display = "none";
  showQuestion();
  questionContainer.style.display = "block";
  startTimer();
}

var questions = [
  {
    question: "Question 1: Which HTML tag is used to define an unordered list?",
    choices: ["<ul>", "<ol>", "<li>", "<div>"],
    answer: 1
  },
  {
    question: "Question 2: Which CSS property is used to change the color of text?",
    choices: ["font-size", "background-color", "color", "text-align"],
    answer: 3
  },
  {
    question: "Question 3: What is the correct syntax for creating a JavaScript function?",
    choices: ["function = myFunction() { }", "function myFunction() { }", "myFunction() = function { }", "myFunction() { }"],
    answer: 2
  },
  {
    question: "Question 4: Which JavaScript method is used to add an element to the end of an array?",
    choices: ["push()", "pop()", "shift()", "unshift()"],
    answer: 1
  },
  {
    question: "Question 5: Which CSS property is used to change the color of text?",
    choices: ["DOM API", "Fetch API", "Storage API", "Animation API"],
    answer: 2
  },

  
  // Add more questions here
];

var currentQuestionIndex = 0;
var score = 0;

var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var resultContainer = document.getElementById("result-container");
var resultElement = document.getElementById("result");
var nextButton = document.getElementById("next-btn");
var scoreContainer = document.getElementById("score-container");
var scoreElement = document.getElementById("score");
var restartButton = document.getElementById("restart-btn");

function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach(function(choice, index) {
    var li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", function() {
      checkAnswer(index);
    });
    choicesElement.appendChild(li);
  });
}

function checkAnswer(choiceIndex) {
  var currentQuestion = questions[currentQuestionIndex];
  if (choiceIndex === currentQuestion.answer) {
    score++;
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent = "Incorrect!";
  }

  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    questionContainer.style.display = "block";
    resultContainer.style.display = "none";
  } else {
    showScore();
  }
}

function showScore() {
  scoreElement.textContent = "Your score: " + score + "/" + questions.length;
  scoreContainer.style.display = "block";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  questionContainer.style.display = "block";
  resultContainer.style.display = "none";
  scoreContainer.style.display = "none";
}

nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restartQuiz);

showQuestion();