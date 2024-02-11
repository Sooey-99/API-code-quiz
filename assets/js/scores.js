const clearButton = document.querySelector("#clear");

document.addEventListener("DOMContentLoaded", function () {
    // high scores shown on end highscore listing page
    renderHighscores();
});

// function render high scores on page
function renderHighscores() {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    const highscoresList = document.getElementById("highscores");

    // Clear high scores option
    highscoresList.innerHTML = "";

    // append new (high) score to the list
    highscores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
        highscoresList.appendChild(listItem);
    });
}

// clear high scores on localStorage func
function clearHighscores() {
    localStorage.removeItem("highscores");
    renderHighscores(); // Assuming you have a function to render high scores on the page
}

// clear button event listener
clearButton.addEventListener("click", clearHighscores);