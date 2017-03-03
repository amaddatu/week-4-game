
// --------------------------------------------------------
// Initial setup

var totalWins = 0;
var totalLosses = 0;

var crystal_1, crystal_2, crystal_3, crystal_4;
var targetNumber, runningTotal;


// --------------------------------------------------------
// Functions

function generateRandom(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function newGame() {
    targetNumber = generateRandom(19, 120);
    runningTotal = 0;
    document.getElementById('valTargetNumber').innerHTML = targetNumber;
    document.getElementById('valRunningTotal').innerHTML = runningTotal;
    document.getElementById('valTotalWins').innerHTML = totalWins;
    document.getElementById('valTotalLosses').innerHTML = totalLosses;
    crystal_1 = generateRandom(1,12);
    crystal_2 = generateRandom(1,12);
    crystal_3 = generateRandom(1,12);
    crystal_4 = generateRandom(1,12);
}

function addCrystal(button) {

    //alert ("one");

    switch (button) {
        case 'button1':
            runningTotal += crystal_1;
            break;
        case 'button2':
            runningTotal += crystal_2;
            break;
        case 'button3':
            runningTotal += crystal_3;
            break;
        case 'button4':
            runningTotal += crystal_4;
            break;
    }

    //alert("Button pressed:"+button+" runningTotal:"+runningTotal);

    doGameLogic();
} // function addCrystal

function doGameLogic() {
    if (runningTotal<targetNumber) {
        document.getElementById('valRunningTotal').innerHTML = runningTotal;
        document.getElementById('valMessage').innerHTML = "Keep going...";
    }
    else if (runningTotal==targetNumber) {
        totalWins++;
        document.getElementById('valMessage').innerHTML = "You won!!";
        newGame();
    }
    else if (runningTotal>targetNumber) {
        totalLosses++;
        document.getElementById('valMessage').innerHTML = "You lost!!";
        newGame();
    }
}



// --------------------------------------------------------
// Game
$(document).ready(function(){
    newGame();
});


