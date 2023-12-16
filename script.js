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
    question: "Question 1",
    choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    answer: 2
  },
  {
    question: "Question 2",
    choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    answer: 1
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