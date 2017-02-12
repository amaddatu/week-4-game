


// --------------------------------------------------------
// Functions
function generateRandom(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function addScore(button){
    switch (button){
        case 'button1':
            crystal = crystal_1;
            break;
        case 'button2':
            crystal = crystal_2;
            break;
        case 'button3':
            crystal = crystal_3;
            break;
        case 'button4':
            crystal = crystal_4;
            break;
        default:
            crystal = 0;
    }
    score+=crystal;
    document.getElementById("score").onsubmit = post;
}

function resetGame(){
    toWin = generateRandom(19,120);
    crystal_1 = generateRandom(1,12);
    crystal_2 = generateRandom(1,12);
    crystal_3 = generateRandom(1,12);
    crystal_4 = generateRandom(1,12);
    score = 0;
}

function displayBoardHeader(){
    document.write(toWin + "<br />");
    document.write("            Wins: " + totalWins + "<br />");
    document.write("            Losses: " + totalLoss + "<br />");
}

function displayBoardFooter(){
    document.write("<br /><br />");
    document.write("Your total score is: " + score + "<br />");
    document.write("Gem values: " + crystal_1 + "<br />");
    document.write("Gem values: " + crystal_2 + "<br />");
    document.write("Gem values: " + crystal_3 + "<br />");
    document.write("Gem values: " + crystal_4 + "<br />");
}

// --------------------------------------------------------
// Initial setup
var score = 0, 
    toWin = 0,
    crystal_1 = 0,
    crystal_2 = 0,
    crystal_3 = 0,
    crystal_4 = 0,
    totalWins = 0,
    totalLoss = 0;

// --------------------------------------------------------
// Game setup
