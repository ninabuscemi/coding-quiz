document.addEventListener("DOMContentLoaded", function () {

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
      choices: [
        "function = myFunction() { }",
        "function myFunction() { }",
        "myFunction() = function { }",
        "myFunction() { }"
      ],
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
    }
  ];

  var currentQuestionIndex = 0;
  var score = 0;
  var timeLeft;

  var questionElement = document.getElementById("question");
  var choicesElement = document.getElementById("choices");
  var resultContainer = document.getElementById("result-container");
  var showNextButton = document.getElementById("next-btn");
  var scoreElement = document.getElementById("score");
  var restartButton = document.getElementById("restart-btn");
  var feedbackElement = document.getElementById("feedback");
  var questionContainer = document.getElementById("question-container");
  var isNextButtonListenerAdded = false;

  function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion || !questionElement || !choicesElement || !feedbackElement) {
      console.error("Error: Could not find one or more necessary elements.");
      return;
    }

    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, index) {
      var li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", function () {
        checkAnswer(index);
      });
      choicesElement.appendChild(li);
    });

    questionContainer.style.display = "block";
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
    scoreElement.textContent = "Your score: " + score + "/" + questions.length;
    resultContainer.style.display = "block";
  }

  function checkAnswer(choiceIndex) {
    var currentQuestion = questions[currentQuestionIndex];
    if (choiceIndex === currentQuestion.answer) {
      feedbackElement.textContent = "Correct!";
      score++;
    } else {
      feedbackElement.textContent = "Incorrect!";
      timeLeft -= 10; // Deduct 10 seconds for an incorrect answer
  }
}
var showNextButton = document.createElement("button");
showNextButton.textContent = "Next";
showNextButton.id = "next-btn";
showNextButton.className = "next-btn";
showNextButton.style.display = "none";

questionContainer.appendChild(showNextButton);

function showNextButton() {
  showNextButton.style.display = "block";
  if (!isNextButtonListenerAdded) {
    showNextButton.addEventListener("click", showNextQuestion);
    isNextButtonListenerAdded = true;
  }
}

  function hideQuestionContainer() {
    questionContainer.style.display = "none";
  }

  function showNextQuestion() {
    hideResultContainer(); // Hide the result container

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
      hideNextButton(); // Hide the next button when showing the next question
    } else {
      showScore();
    }
  }

  function hideResultContainer() {
    resultContainer.style.display = "none";
  }

  function hideNextButton() {
    nextButton.style.display = "none";
    isNextButtonListenerAdded = false; // Reset the flag
  }

  var restartButton = document.getElementById("restart-btn");
  restartButton.addEventListener("click", restartQuiz);

  var viewHighScoresButton = document.getElementById("high-scores-btn");
  var highscoreContainer = document.getElementById("highscore-container");

  var quizActive = false;
  var questionContainer = document.getElementById("question-container");

  function startQuiz() {
    quizActive = true;
    highscoreContainer.style.display = "none";
    var questionContainer = document.getElementById("question-container");
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

  var submitButton = document.getElementById("submit-button");
  var initialsInput = document.getElementById("initials-input");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = initialsInput.value;
    var scoreData = {
      initials: initials,
      score: score
    };

    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push(scoreData);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    displayHighScores();
  });

  function displayHighScores() {
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

  function showHighScores() {
    if (!quizActive) {
      questionContainer.style.display = "none";
      resultContainer.style.display = "none";
      scoreElement.style.display = "none";
      highscoreContainer.style.display = "block";
      highscoreContainer.classList.add("show");
      displayHighScores();
    }
  }

  function hideHighScores() {
    if (!quizActive) {
      highscoreContainer.addEventListener("transitionend", function onTransitionEnd() {
        highscoreContainer.removeEventListener("transitionend", onTransitionEnd);
        if (!quizActive) {
          questionContainer.style.display = "block";
          resultContainer.style.display = "block";
          scoreElement.style.display = "block";
        }
      });

      highscoreContainer.style.display = "none";
      highscoreContainer.classList.remove("show");
    }
  }

});
