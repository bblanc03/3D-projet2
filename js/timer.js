var intTimerMax = 0;
var intTimerDebut = 0;
var milisecounds = 0;
var secounds = 0;
var last = 0;
var miliPasse = 0;
var isPaused = false;
var pausedTime = 0;

function createDate() {
    var time = new Date();
    return time;
}

function getSeconds(time) {
    var ss = time.getSeconds();
    return ss;
}

/**
 * 
 * @param {*} intMax set the round timer
 */
function setTimerMax(intMax) {
    intTimerMax = intMax;
}

/**
 * reset time to 0
 */
function resetSeconds(){
    secounds = 0;
}

function pauseTimer() {
    if (!isPaused) {
        isPaused = true;
        pausedTime = miliPasse;
    }
}

function resumeTimer() {
    if (isPaused) {
        isPaused = false;
        last = miliPasse - (miliPasse - pausedTime);
    }
}

function nextSecond(timer, timer2){
    if (isPaused) {
        return secounds;
    }

    var tempsEcoule = timer - timer2;
    timer = timer2;
    miliPasse += tempsEcoule;

    milisecounds += miliPasse - last;
    last = miliPasse;

    if (milisecounds > 999) {
        milisecounds = 0;
        secounds++;
    }
    return secounds;
}

/**
 * 
 * @param {*} timer current time
 * @param {*} timer2 previous time
 */
function showTime() {
    const timeLeft = intTimerMax - secounds; // Changed from getSecondsLeft()
    const maxTime = intTimerMax;
    const percentage = (timeLeft / maxTime) * 100;
    
    // Update progress bar
    const progressBar = document.querySelector('.timer-progress');
    const timerText = document.querySelector('.timer-text');
    
    progressBar.style.width = `${percentage}%`;

    // Change color based on time remaining
    if (percentage <= 25) {
        progressBar.style.background = '#ff4444'; // Red for last 25%
    } else if (percentage <= 50) {
        progressBar.style.background = '#ffaa00'; // Orange for last 50%
    } else {
        progressBar.style.background = '#4CAF50'; // Green otherwise
    }
}

/**
 * 
 * @returns  checks to see if timer has hit 0
 */
function timeOut() {
    return intTimerMax - secounds <= 0;
}

function getSecondsLeft() {
    return intTimerMax - secounds; // Simplified to use internal timer values
}

function isTimerPaused() {
    return isPaused;
}

function getTimerMax() {
    return intTimerMax;
}