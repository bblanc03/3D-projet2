
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

function setTimerMax(intMax) {
    intTimerMax = intMax;
}
function resetSeconds(){
    secounds = 0;
}

function showTime(timer, timer2) {

    var tempsEcoule = timer - timer2;
    timer = timer2;
    miliPasse += tempsEcoule;


    milisecounds += miliPasse - last;
    last = miliPasse;
    if (milisecounds > 999) {
        milisecounds = 0;
        secounds++;
    }
    if (intTimerMax - secounds > 0) {
        let secs = intTimerMax - secounds;
        document.getElementById("timer").innerHTML = "Time: " + secs;
    } else {
        document.getElementById("timer").innerHTML = 0;
    }


}

function timeOut() {
    return intTimerMax - secounds <= 0;
}