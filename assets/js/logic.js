// Variables
const startBtn = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen");
const submit = document.querySelector(".submit");
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

// start, display first question and run timer func
startBtn.addEventListener("click", start);

function start() {

    // start / hide
    startScreen.classList.toggle("start")
    startScreen.classList.toggle("hide")

    // show q title
    questionPage.classList.toggle("hide")
    questionPage.classList.toggle("start")

    startTimer();
    timeRemaining();
    nextQuestion();
}

// timer func
function startTimer() {
    intervalID = setInterval(timeRemaining, 1000);
}

// count down func
function timeRemaining() {
    timerBtn.textContent = timerCount;
    if (timerCount > 0) {
        timerCount--;
    } else {
        clearInterval(intervalID);
    }
}

// next q func
function nextQuestion() {
    // clean existing answers
    questionChoices.innerHTML = "";

    if (questionIndex < questionList.length) {
        let question = questionList[questionIndex];
        questionTitle.textContent = question.title;

            // create buttons for answers
            for (i = 0; i < question.choices.length; i++) {
            let answerBtn = document.createElement("button");
            answerBtn.textContent = question.choices[i];
            questionChoices.appendChild(answerBtn);

            // listen for answer buttons clicked.
            answerBtn.addEventListener("click", checkAnswer);
            }
    } else {
        // end quiz
        clearInterval(intervalID);
        endQuiz();
    }
}

function checkAnswer(event) {
    // get selected answer index from the event
    let selectedAnswerIndex = event.target.dataset.index; // assuming you set data-index on your buttons
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

// toggle between start & hide
function endQuiz() {
    endScreen.classList.toggle("start");
    endScreen.classList.toggle("hide");

    endScreen.classList.toggle("hide");
    endScreen.classList.toggle("start");

    questionPage.classList.add("hide");
    endScreen.classList.remove("hide");
    document.getElementById("final-score").textContent = score;
}

// event listener for initials for submit button 
submitBtn.addEventListener("click", function () {
    const initials = document.getElementById("initials").value.trim();

    if (initials !== "") {
        // handle the submitted initials and score
        addHighscore(initials, score);

        // direct to scores pg
        window.location.href = "highscores.html";
    } else {
        alert("Please enter your initials.");
    }
});

// submit initials and handle completion
function addHighscore(initials, score) {
    
    // local storage highscores pulled and turned into js object
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    const newScore = { initials: initials, score: score };
    highscores.push(newScore);

    // high scores sorted in descending order
    highscores.sort((a, b) => b.score - a.score);

    // show top 5 high scores only
    highscores.splice(5);

    // high scores to localStorage
    localStorage.setItem("highscores", JSON.stringify(highscores));
}