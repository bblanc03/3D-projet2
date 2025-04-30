var point = 0;
var lastSec = 0;

/**
 * 
 * @param {*} number the number used to set the initial points
 */
function setPoint(number) {
    point = number;
}

/**
 * 
 * @param {*} binAdd true for (+) false for (-)
 * @param {*} number number to modifie points with
 */
function updatePoint(binAdd, number) {
    if (binAdd) {
        point += number;
    } else {
        point -= number;
    }
}

/**
 * Displays the ramaining points
 */
function showPoints(){
    document.getElementById("points").innerHTML = "Points: " + point;
}

function getPoints() {
    return point;
}