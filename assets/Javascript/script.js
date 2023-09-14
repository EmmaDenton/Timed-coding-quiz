const startButton = document.getElementById("start-btn");
const highscoreButton = document.getElementById("highscore-btn");
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsList = document.getElementById("options").getElementsByTagName("button");
const timerElement = document.getElementById("timer");
let currentQuestionIndex = 0;

const quizQuestions = [
    {
      question: "1. Which of the following tags is used to define an external JavaScript file?",
      options: ["<script>", "<link>", "<css>", "<html>"],
      answer: "<script>"
    },
    {
      question: "2. Which CSS property is used to change the font size of an element?",
      options: ["font-family", "font-size", "font-weight", "font-style"],
      answer: "font-size"
    },
    {
      question: "3. What does CSS stand for?",
      options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Complete Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "4. Which HTML tag is used to define a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      answer: "<a>"
    },
    {
      question: "5. What is the correct syntax to declare a variable in JavaScript?",
      options: ["const exampleVar = 5;", "variable exampleVar = 5;", "var exampleVar = 5;", "let exampleVar = 5;"],
      answer: "var exampleVar = 5;"
    },
    {
      question: "6. Which event is triggered when the user clicks on an HTML element?",
      options: ["onclick", "onmouseover", "onkeydown", "onopen"],
      answer: "onclick"
    },
    {
      question: "7. Which CSS property is used to add space between the content and the border of an element?",
      options: ["border", "margin", "padding", "space"],
      answer: "padding"
    },
    {
      question: "8. What is the correct CSS syntax to select an element with the class",
      options: [".exampleClass", "#exampleClass", "class.exampleClass", "exampleClass"],
      answer: ".exampleClass"
    },
    {
      question: "9. Which of the following is not a data type?",
      options: ["Boolean", "Float", "Numeral", "String"],
      answer: "Numeral"
    },
    {
      question: "10. What does the 'href' attribute define?",
      options: ["Alternate text to be read by a screen reader", "The location of the referenced resource", "The font colour of the text", "The URL of the linked page"],
      answer: "The URL of the linked page"
    },
  ];
  

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startContainer.style.display = "none";
  quizContainer.style.display = "block";
  timerElement.style.display = "block";

  showQuestion();
  startTimer();
}

let time = 60;

function startTimer() {
  let intervalId = setInterval(() => {
    const seconds = (time % 60).toString().padStart(2, "0");
    timerElement.textContent = `${seconds}`;
    time--;
    if (time < 0) {
      clearInterval(intervalId);
      finishQuiz();
    }
  }, 1000);
  return intervalId;
}

let intervalId;

function startQuiz() {
  startContainer.style.display = "none";
  quizContainer.style.display = "block";
  timerElement.style.display = "block";
  showQuestion();
  intervalId = startTimer();
}

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  for (let i = 0; i < optionsList.length; i++) {
    optionsList[i].textContent = currentQuestion.options[i];
    optionsList[i].addEventListener("click", checkAnswer);
  }
}

const answerCorrect = document.getElementById("answer-correct");
const answerIncorrect = document.getElementById("answer-incorrect");

function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    currentQuestion.selectedOption = selectedOption;
  
    if (selectedOption === currentQuestion.answer) {
      answerCorrect.style.display = "block";
      answerIncorrect.style.display = "none";
    } else {
      time -= 10;
      answerCorrect.style.display = "none";
      answerIncorrect.style.display = "block";
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= quizQuestions.length) {
      finishQuiz();
    } else {
      showQuestion();
    }
  }

  function finishQuiz() {
    clearInterval(intervalId);
  
    const score = calculateScore();
  
    const scoreElement = document.getElementById("final-score");
    scoreElement.textContent = `Your final score is ${score}/${quizQuestions.length}`;
    
    quizContainer.style.display = "none";
        
    const finishQuizContainer = document.getElementById("finish-quiz");
    finishQuizContainer.style.display = "block";
}

function calculateScore() {
  let score = 0;
  for (let i = 0; i < quizQuestions.length; i++) {
    const currentQuestion = quizQuestions[i];
    const selectedOption = currentQuestion.selectedOption;
    if (selectedOption === currentQuestion.answer) {
      score++;
    }
  }
  return score;
}