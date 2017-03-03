
// --------------------------------------------------------
// Initial setup

var totalWins = 0;
var totalLosses = 0;

var crystal_1, crystal_2, crystal_3, crystal_4;
var targetNumber, runningTotal;

var giphyIntervalTimer = null;
var giphyResponse = null;


// --------------------------------------------------------
// Object Constructor
//function to create circuit timers or "smart interval timers"
function createCircuitTimer(timeInterval){
    return {
        time: timeInterval
        , interval: null
        , rotation: 0
        , running: false
        , start: function(callMe){
            //clue: remember the booleans!!!
            if(this.running !== true){
                this.interval = setInterval(callMe, this.time);
                this.running = true;
            }
        }
        , stop: function(){
            //clue: remember the booleans!!!
            if(this.running === true){
                clearInterval(this.interval);
                this.running = false;
            }
        }
    };
};

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
function giphyChange(){
    console.log('giphy changed');
    if(giphyResponse != null)
    {
        $('body').css('background-image','url(' + giphyResponse.data[generateRandom(0, giphyResponse.data.length-1)].images.original.url + ')');
    }
}



// --------------------------------------------------------
// Game
$(document).ready(function(){
    newGame();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=fast+cars&limit=100&api_key=dc6zaTOxFJmzC"
    $.ajax({
        url: queryURL
        , method: 'GET'
        , success: 
            function(response){
                console.log(response);
                giphyResponse = response;
                //I put this here to do my initial giphychange
                giphyChange();
            }
    });

    giphyIntervalTimer = createCircuitTimer(5000);
    giphyIntervalTimer.start(giphyChange);
    
    //http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
});


