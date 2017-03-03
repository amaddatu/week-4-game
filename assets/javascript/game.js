
// --------------------------------------------------------
// Initial setup

var totalWins = 0;
var totalLosses = 0;

var crystal_1, crystal_2, crystal_3, crystal_4;
var targetNumber, runningTotal;

var giphyIntervalTimer = null;
var giphyResponse = null;

var musicIntervalTimer = null;
var music = new Audio('assets/music/saintsrow4.mp3');
var musicTimers = [];
var musicCSS = "20%";
var musicCSSLength = 500;


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

//function to create simple timers or "simply smart timers"
function createSimpleTimer(timeInterval){
    return {
        time: timeInterval
        , timer: null
        , running: false
        , start: function(callMe){
            if(this.running !== true){
                this.timer = setTimeout(callMe, this.time);
                this.running = true;
            }
        }
        , stop: function(){
            if(this.running === true){
                clearTimeout(this.timer);
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
//changes the giphy
function giphyChange(){
    console.log('giphy changed');
    if(giphyResponse != null)
    {
        $('body').css('background-image','url(' + giphyResponse.data[generateRandom(0, giphyResponse.data.length-1)].images.original.url + ')');
    }
}
//plays the music
function musicChange(){
    console.log('music changed');
    if(music.duration > 0 && !music.paused){
        music.pause();
        music.currentTime = 0;
        music.play();
    }
    else{
        music.play();
    }
    musicTimerReset();
}

//creates all timers for music reactions
function musicTimerReset(){
    for(var i = 0; i < musicTimers.length; i++){
        musicTimers.stop();
    }
    musicTimers = [];
    /*
14.753s
28.979s
? - 14.226s
43.205s soft
57.417s
? - 14.212ss
? avg 14.219s
1m 11.636s
1m 25.855s soft
1m 40.407s soft
1m 54.293s
2m 8.512s
2m 15.633s
2m 22.753s
2m 29.863s
2m 36.95s
2m 44.084s
2m 51.169s
3m 5.388s soft
    */

    musicCreateTimer(200);
    musicCreateTimer(14353);
    musicCreateTimer(28579);
    musicCreateTimer(42805);
    musicCreateTimer(57017);
    musicCreateTimer(71236);
    musicCreateTimer(85455);
    musicCreateTimer(100007);
    musicCreateTimer(113893);
    musicCreateTimer(128112);
    musicCreateTimer(135233);
    musicCreateTimer(142353);
    musicCreateTimer(149463);
    musicCreateTimer(156550);
    musicCreateTimer(163684);
    musicCreateTimer(170769);
    musicCreateTimer(184988);
}
//creations reaction timer
function musicCreateTimer(microSec){
    var mTime = createSimpleTimer(microSec);
    mTime.start(musicReact);
}
function musicCreateTimer2(microSec){
    var mTime = createSimpleTimer(microSec);
    mTime.start(musicReact2);
}
//music reaction
function musicReact(){
    $('.crystal').css('padding', musicCSS);
    setTimeout(function(){
        $('.crystal').attr('style', '');
    }, musicCSSLength);
}
//alternate music version
function musicReact2(){
    $('.crystal').css('padding', musicCSS);
    setTimeout(function(){
        $('.crystal').attr('style', '');
    }, musicCSSLength/2);
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
    
    musicIntervalTimer = createCircuitTimer(187547);
    musicIntervalTimer.start(musicChange);
    musicChange();
    //http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
});


