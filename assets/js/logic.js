// Variables
const startBtn = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen");
const questionPage = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const questionChoices = document.querySelector("#choices");
const timerBtn = document.querySelector("#time");
const endScreen = document.querySelector("#end-screen");
const submitBtn = document.querySelector("#submit");
let timerCount = 60;
let intervalID;
let questionIndex = 0;
let score = 0;

// Event listeners
startBtn.addEventListener("click", start);
submitBtn.addEventListener("click", submitInitials);

// Functions
function start() {
    toggleVisibility(startScreen);
    toggleVisibility(questionPage);
    startTimer();
    timeRemaining();
    nextQuestion();
}

function startTimer() {
    intervalID = setInterval(timeRemaining, 1000);
}

function timeRemaining() {
    timerBtn.textContent = timerCount > 0 ? timerCount-- : clearInterval(intervalID);
}

function nextQuestion() {
    questionChoices.innerHTML = ""; // Clean existing answers

    if (questionIndex < questionList.length) {
        const question = questionList[questionIndex];
        questionTitle.textContent = question.title;

        for (let i = 0; i < question.choices.length; i++) {
            createAnswerButton(question.choices[i], i);
        }
    } else {
        clearInterval(intervalID);
        endQuiz();
    }
}

function createAnswerButton(choice, index) {
    const answerBtn = document.createElement("button");
    answerBtn.textContent = choice;
    questionChoices.appendChild(answerBtn);
    answerBtn.addEventListener("click", checkAnswer);
    answerBtn.dataset.index = index; // Set data-index attribute
}

function checkAnswer(event) {
    // get selected answer index from the event
    let selectedAnswerIndex = parseInt(event.target.dataset.index); // convert to number
    // get correct answer index
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
    toggleVisibility(endScreen);
    toggleVisibility(questionPage);
    document.getElementById("final-score").textContent = score;
}

function submitInitials() {
    const initials = document.getElementById("initials").value.trim();

    if (initials !== "") {
        addHighscore(initials, score);
        window.location.href = "highscores.html";
    } else {
        alert("Please enter your initials.");
    }
}

function addHighscore(initials, score) {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    const newScore = { initials, score };
    highscores.push(newScore);
    highscores.sort((a, b) => b.score - a.score);
    highscores.splice(5);
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function toggleVisibility(element) {
    element.classList.toggle("start");
    element.classList.toggle("hide");
}
