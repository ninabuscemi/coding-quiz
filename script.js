var nextButtonClickable = true; 

document.addEventListener("DOMContentLoaded", function () {
  var questions = [
    {
      question: "Question 1: Which HTML tag is used to define an unordered list?",
      choices: ["<ul>", "<ol>", "<li>", "<div>"],
      answer: 0, 
    },
    {
      question: "Question 2: Which CSS property is used to change the color of text?",
      choices: ["font-size", "background-color", "color", "text-align"],
      answer: 2, 
    },
    {
      question: "Question 3: What is the correct syntax for creating a JavaScript function?",
      choices: [
        "function = myFunction() { }",
        "function myFunction() { }",
        "myFunction() = function { }",
        "myFunction() { }",
      ],
      answer: 1, 
    },
    {
      question: "Question 4: Which JavaScript method is used to add an element to the end of an array?",
      choices: ["push()", "pop()", "shift()", "unshift()"],
      answer: 0, 
    },
    {
      question: "Question 5: Which CSS property is used to change the color of text?",
      choices: ["DOM API", "Fetch API", "Storage API", "Animation API"],
      answer: 2, 
    },
  ];

  var currentQuestionIndex = 0;
  var score = 0;
  var timeLeft;
  var answerSelected = false;
  var quizActive = false;

  var questionElement = document.getElementById("question");
  var choicesElement = document.getElementById("choices");
  var resultContainer = document.getElementById("result-container");
  var scoreElement = document.getElementById("score");
  var feedbackElement = document.getElementById("feedback");
  var questionContainer = document.getElementById("question-container");
  var highscoreContainer = document.getElementById("highscore-container");
  var quizActive = false;

  var nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.id = "next-btn";
  nextButton.className = "next-btn";
  nextButton.style.display = "none";
  questionContainer.appendChild(nextButton);

  function hideResultContainer() {
    resultContainer.style.display = "none";
  }

  var userSelectedIndex;

function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  answerSelected = false;

  if (!currentQuestion || !questionElement || !choicesElement || !feedbackElement) {
    console.error("Error: Could not find one or more necessary elements.");
    return;
  }

  choicesElement.innerHTML = "";
  questionElement.textContent = currentQuestion.question;

  currentQuestion.choices.forEach(function (choice, index) {
    var li = document.createElement("li");
    li.textContent = choice;

    var onClick = function () {
      if (!answerSelected) {
        answerSelected = true;
        userSelectedIndex = index; // Store the user's selected index
        checkAnswer(userSelectedIndex);
        showNextButton();
      }
    };

    li.addEventListener("click", onClick);
    choicesElement.appendChild(li);
  });

  questionContainer.style.display = "block";
}

// TODO: create a function to grab the users selected index. pass the function


// TODO: display answer with a function choice=correct answer your text content will be correct. get valubel and display

function checkAnswer(choiceIndex) {
  if (!answerSelected) {
    answerSelected = true;
    var currentQuestion = questions[currentQuestionIndex];

    if (choiceIndex === currentQuestion.answer) {
      feedbackElement.textContent = "Correct!";
      score++; // Increment the score for correct answers
    } else {
      feedbackElement.textContent = "Incorrect!";
      timeLeft -= 10;
    }

    feedbackElement.style.display = "block";
    setTimeout(function () {
      hideResultContainer();
      showNextQuestion();
    }, 1000);
  }
}


  function showNextButton() {
    nextButton.style.display = "block";
    if (nextButtonClickable) {
      nextButton.addEventListener("click", onNextButtonClick);
    }
  }

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    questionContainer.style.display = "none";
    showScore();
    // Add the following line
    displayHighScores();
  }
}
  
function showFinalScore() {
  stopTimer();
  console.log("Final Score: " + score); // Add this line for debugging
  scoreElement.textContent = "Your score: " + score + "/" + questions.length;
  resultContainer.style.display = "block";
  displayHighScores(); // Call displayHighScores here to show high scores when the final score is displayed
}

function onNextButtonClick() {
  nextButton.style.display = "none";
  feedbackElement.style.display = "none";
  nextButtonClickable = false;
  showNextQuestion();
  if (currentQuestionIndex === questions.length) {
    // If all questions are answered, display the final score
    showScore();
  }
}

  var startButton = document.getElementById("start-btn");
  startButton.addEventListener("click", startQuiz);

  var timerElement = document.getElementById("timer");
  var timerInterval;

  function startTimer() {
    timeLeft = 75;
    timerInterval = setInterval(function () {
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
  console.log("Score: " + score); // Add this line for debugging
  resultContainer.style.display = "block";
  scoreElement.textContent = "Your score: " + score + "/" + questions.length;

  // Add this line to display high scores
  displayHighScores();
}
  var restartButton = document.getElementById("restart-btn");
  restartButton.addEventListener("click", restartQuiz);

  var submitButton = document.getElementById("submit-button");
  var initialsInput = document.getElementById("initials-input");

 submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var initials = initialsInput.value;
  var scoreData = {
    initials: initials,
    score: score,
  };

  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push(scoreData);
  localStorage.setItem("highscores", JSON.stringify(highscores));

  displayHighScores();
});

function displayHighScores() {
  console.log("Before displayHighScores");
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  var highscoreList = document.getElementById("highscore-list");

  highscoreList.innerHTML = "";
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (highscore, index) {
    var li = document.createElement("li");
    li.textContent = highscore.initials + ": " + highscore.score;

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeHighScore(index);
    });

    li.appendChild(removeButton);
    highscoreList.appendChild(li);
  });

  initialsInput.value = "";

  // Ensure that the highscoreContainer is shown
  highscoreContainer.style.display = "block";
  console.log("After displayHighScores, highscoreContainer visibility: ", highscoreContainer.style.display);
}

  function removeHighScore(index) {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    if (index >= 0 && index < highscores.length) {
      highscores.splice(index, 1);
      localStorage.setItem("highscores", JSON.stringify(highscores));
      displayHighScores();
    }
  }

  var viewHighScoresButton = document.getElementById("high-scores-btn");

  viewHighScoresButton.addEventListener("click", function () {
    if (!quizActive) {
      if (!highscoreContainer.classList.contains("show")) {
        showHighScores();
      } else {
        hideHighScores();
      }
    }
  });

  function startQuiz() {
    quizActive = true;
    highscoreContainer.style.display = "none";
    var startButton = document.getElementById("start-btn");
    startButton.style.display = "none";
    startTimer();
    showQuestion();
  }

  function restartQuiz() {
    quizActive = false;
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    startTimer();
    feedbackElement.textContent = "";
    resultContainer.style.display = "none";
    highscoreContainer.style.display = "none";
  }

  function showHighScores() {
    if (!quizActive) {
      questionContainer.style.display = "none";
      resultContainer.style.display = "none";
      scoreElement.style.display = "none";
      highscoreContainer.style.display = "block";
      highscoreContainer.classList.add("show");
      displayHighScores();
      highscoreContainer.addEventListener("transitionend", hideOtherContainers);
    }
  }

  function hideHighScores() {
    if (!quizActive) {
      highscoreContainer.style.display = "none";
      highscoreContainer.classList.remove("show");
    }
  }

  function hideOtherContainers() {
    questionContainer.style.display = "block";
    resultContainer.style.display = "block";
    scoreElement.style.display = "block";
    highscoreContainer.removeEventListener("transitionend", hideOtherContainers);
  }
});