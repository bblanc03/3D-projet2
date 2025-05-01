var intTimerMax = 0;
var intTimerDebut = 0;
var milisecounds = 0;
var secounds = 0;
var last = 0;
var miliPasse = 0;

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

function nextSecond(timer, timer2){
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
        document.getElementById("timer").innerHTML = "Time: " + secs;
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
    const timeText = timerElement.textContent;
    const seconds = parseInt(timeText.split(':')[1]);
    return seconds;
}