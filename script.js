var startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startQuiz);

var timerElement = document.getElementById("timer");
var timerInterval;
var timeLeft;

function startTimer() {
  timeLeft = 75;
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
}

// Modify the startQuiz() function as follows

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
var viewHighScoresButton = document.getElementById("high-scores-btn");
var highscoreContainer = document.getElementById("highscore-container");

var quizActive = false; // Variable to track if the quiz is active

// Function to start the quiz
function startQuiz() {
  quizActive = true; // Set the quiz as active
  startButton.style.display = "none";
  showQuestion();
  questionContainer.style.display = "block";
  startTimer();
}

function showHighScores() {
  if (!quizActive) { // Only allow clicking on the button if the quiz is not active
    // Hide the quiz elements
    questionContainer.style.display = "none";
    resultContainer.style.display = "none";
    scoreContainer.style.display = "none";

    // Show the high scores container
    highscoreContainer.style.display = "block";

    // Retrieve and display the high scores
    displayHighScores();
  }
}

// Function to hide the high scores container
function hideHighScores() {
  if (!quizActive) { // Only allow clicking on the button if the quiz is not active
    // Show the quiz elements
    questionContainer.style.display = "block";
    resultContainer.style.display = "block";
    scoreContainer.style.display = "block";

    // Hide the high scores container
    highscoreContainer.style.display = "none";
  }
}

// Adjusted event listener for the high scores button
viewHighScoresButton.addEventListener("click", function() {
  if (!quizActive) { // Only allow clicking on the button if the quiz is not active
    if (highscoreContainer.style.display === "none") {
      showHighScores();
    } else {
      hideHighScores();
    }
  }
});

var submitButton = document.getElementById("submit-button");
var initialsInput = document.getElementById("initials-input");

submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  var initials = initialsInput.value;
  var scoreData = {
    initials: initials,
    score: score
  };

  // Retrieve existing high scores from localStorage
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Add the current score to the high scores array
  highscores.push(scoreData);

  // Save the updated high scores back to localStorage
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // Display the updated high scores
  displayHighScores();
});

function displayHighScores() {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  var highscoreList = document.getElementById("highscore-list");

  // Clear the existing high score list
  highscoreList.innerHTML = "";

  // Sort high scores in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Iterate over the high scores and create list items for each score
  highscores.forEach(function (highscore, index) {
    var li = document.createElement("li");
    li.textContent = highscore.initials + ": " + highscore.score;

    // Add a remove button for each high score
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeHighScore(index);
    });

    li.appendChild(removeButton);
    highscoreList.appendChild(li);
  });

  function removeHighScore(index) {
    // Retrieve existing high scores from localStorage
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    // Check if the index is valid
    if (index >= 0 && index < highscores.length) {
      // Remove the high score at the specified index
      highscores.splice(index, 1);
  
      // Save the updated high scores back to localStorage
      localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // Display the updated high scores
      displayHighScores();
    }
  }

  // Clear the initials input field
  initialsInput.value = "";
}

function showScore() {
  stopTimer();
  scoreElement.textContent = "Your score: " + score + "/" + questions.length;
  scoreContainer.style.display = "block";
  highscoreContainer.style.display = "block";
}

restartButton.addEventListener("click", restartQuiz);

function restartQuiz() {
  quizActive = false; // Set the quiz as inactive
  currentQuestionIndex = 0;
  score = 0;

  // Check if the quiz is active before showing the question
  if (quizActive) {
    showQuestion();
  }

  questionContainer.style.display = "block";
  resultContainer.style.display = "none";
  scoreContainer.style.display = "none";
  highscoreContainer.style.display = "none";
}

restartButton.addEventListener("click", restartQuiz);
nextButton.addEventListener("click", showNextQuestion);

showQuestion();