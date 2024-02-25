// Variables
const startBtn = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen");
const submitBtn = document.querySelector("#submit");
const questionPage = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const questionChoices = document.querySelector("#choices");
const timerBtn = document.querySelector("#time");
const endScreen = document.querySelector("#end-screen");

let timerCount = 60;
let intervalID;
let questionIndex = 0;
let score = 0;

// Event listeners
startBtn.addEventListener("click", start);
submitBtn.addEventListener("click", submitInitials);

// Start the quiz
function start() {
    toggleVisibility(startScreen, questionPage);
    startTimer();
    timeRemaining();
    nextQuestion();
}

// Timer functions
function startTimer() {
    intervalID = setInterval(timeRemaining, 1000);
}

function timeRemaining() {
    timerBtn.textContent = timerCount;
    if (timerCount > 0) {
        timerCount--;
    } else {
        clearInterval(intervalID);
    }
}

// Quiz logic
function nextQuestion() {
    questionChoices.innerHTML = "";

    if (questionIndex < questionList.length) {
        let question = questionList[questionIndex];
        questionTitle.textContent = question.title;

        for (let i = 0; i < question.choices.length; i++) {
            let answerBtn = document.createElement("button");
            answerBtn.textContent = question.choices[i];
            questionChoices.appendChild(answerBtn);
            answerBtn.addEventListener("click", checkAnswer);
        }
    } else {
        endQuiz();
    }
}

function checkAnswer(event) {
    let selectedAnswerIndex = event.target.dataset.index;
    let correctAnswerIndex = questionList[questionIndex].correctAnswer;

    if (selectedAnswerIndex === correctAnswerIndex) {
        score++;
    } else {
        timerCount -= 4;
    }
    questionIndex++;
    nextQuestion();
}

function endQuiz() {
    clearInterval(intervalID);
    toggleVisibility(endScreen, questionPage);
    document.getElementById("final-score").textContent = score;
}

// Handle initials submission
function submitInitials() {
    const initials = document.getElementById("initials").value.trim();

    if (initials !== "") {
        addHighscore(initials, score);
        window.location.href = "highscores.html";
    } else {
        alert("Please enter your initials.");
    }
}

// Submit initials and handle completion
function addHighscore(initials, score) {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    const newScore = { initials, score };
    highscores.push(newScore);
    highscores.sort((a, b) => b.score - a.score);
    highscores.splice(5);
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

// Helper function to toggle visibility
function toggleVisibility(show, hide) {
    show.classList.remove("hide");
    show.classList.add("start");
    hide.classList.add("hide");
    hide.classList.remove("start");
}
