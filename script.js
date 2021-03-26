'use strict';

const scoreHolder = document.querySelector('.score');
const highestScoreHolder = document.querySelector('.highscore');
const numberHolder = document.querySelector('.number');
const body = document.querySelector('body');
const guessInput = document.querySelector('.guess');
const messageHolder = document.querySelector('.message');

const INITIAL_SCORE = 20;
const INITIAL_PLAY = true;

let number = calcSecretNumber(); //hoisting
let score = INITIAL_SCORE;
let highestScore = 0;
let playable = INITIAL_PLAY;

scoreHolder.textContent = score;
highestScoreHolder.textContent = highestScore;

const updateScore = function () {
    scoreHolder.textContent = --score;
}

const updateHighestScore = function () {
    highestScore = Math.max(highestScore, score);
    highestScoreHolder.textContent = highestScore;
}

const reset = function () {
    number = calcSecretNumber(); //hoisting
    console.log('number', number);
    score = INITIAL_SCORE;
    scoreHolder.textContent = score;
    guessInput.value = "";
    body.style.backgroundColor = '#222';
    numberHolder.textContent = '?';
    numberHolder.style.width = '15rem';
    messageHolder.textContent = 'Start guessing...';
    playable = INITIAL_PLAY;
}

function calcSecretNumber() {
    return Math.trunc(Math.random() * 20) + 1;
}

const winCase = function () {
    numberHolder.textContent = number;
    numberHolder.style.width = '30rem';
    body.style.backgroundColor = '#60b347';
    messageHolder.textContent = '🎉 Correct answer!';
    updateHighestScore();
}

const displayMessage = function (message) {
    messageHolder.textContent = message;
}

document.querySelector('.check').addEventListener('click', function () {
    if (playable) {
        const value = Number(guessInput.value);
        if (score > 1) {
            if (!value) {
                //handle no input case beforehand (includes 0)
                displayMessage('⛔ No number!');
            }
            else if (value === number) {
                winCase();
                playable = false;
            }
            else {
                displayMessage(value < number ? '👇 Too low!' : '☝ Too high!');
                updateScore();
            }
        }
        else if (score > 0) {
            if (value === number) winCase();
            else {
                displayMessage('💥 You lost the game!');
                updateScore();
            }
            playable = false;
        }
    }
});

document.querySelector('.again').addEventListener('click', reset);