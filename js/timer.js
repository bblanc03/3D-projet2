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
    //nextSecond(timer, timer2);
    
    if (intTimerMax - secounds > 0) {
        let secs = intTimerMax - secounds;
        document.getElementById("timer").innerHTML = secs + "s";
    } else {
        document.getElementById("timer").innerHTML = 0;
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
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        const timeText = timerElement.textContent.trim(); 
        const seconds = parseInt(timeText, 10); 
        if (!isNaN(seconds)) {
            return seconds;
        }
    }
    return 0; 
}

function isTimerPaused() {
    return isPaused;
}