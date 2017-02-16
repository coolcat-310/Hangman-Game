/**
 * Created by juancarlosnavarrete on 2/11/17.
 */

//Global Variables

var chossenWord = "";
var letterInChosenWord = [];
var numBlanks = 0;
var blankAndSuccess = 0;
var wrongGuess = [];
var winCounter = 0;
var lossCounter = 0;
var numGuess = 9;

function randomWord() {
    var wordList = ["banana", "america", "hollywood", "television", "imagination", "javascript", "bootcamp",
    "hangman", "programming", "batman"];

    return wordList[Math.floor(Math.random() * wordList.length)];
}


function start() {
    /*
    Start function resets all variables and creates an string of underscores

     */
    wrongGuess = [];
    document.getElementById('wrong-guess').innerHTML = "";
    numGuess = 9;
    blankAndSuccess = [];
    chossenWord = randomWord();
    letterInChosenWord = chossenWord.split("");
    numBlanks = letterInChosenWord.length;

    //fill array with underscores
    for(var i = 0; i< chossenWord.length;i++){
        blankAndSuccess.push("_");
    }
    console.log(blankAndSuccess);
    document.getElementById('word-blank').innerHTML = blankAndSuccess.join(" ");
    document.getElementById('guess-left').innerHTML = String(numGuess);
    document.getElementById('win-counter').innerHTML = String(winCounter);
    document.getElementById('loss-counter').innerHTML = String(lossCounter);

}

function checkLetter(letter){
    /*
    function checks the argument letter with the choosenword if letter is present then the char will be
    revealed in the array. Otherwise the numGuess will decrease by one.
     */

    var letterInWord = false;
    for(var i = 0; i < numBlanks; i++){
        if(chossenWord[i] === letter){
            letterInWord = true;
        }
    }
    if(letterInWord){
        for( i = 0; i < numBlanks; i++){
            if(chossenWord[i] === letter){
                blankAndSuccess[i] = letter;
            }
        }
    }
    else {
        if(wrongGuess.length == 0) {
            wrongGuess.push(letter);
            numGuess--;
        }else if(wrongGuess.indexOf(letter) < 0){
            wrongGuess.push(letter);
            numGuess--;
        }
        else{
            alert(letter + ' has been used.')
            document.getElementById('wrong').innerHTML = String(letter + ' has been used.');
        }
    }
}

function roundComplete(){
    /*
    function roundComplete verifies the game is over by either win or loss
     */
    document.getElementById('word-blank').innerHTML = blankAndSuccess.join(' ');
    document.getElementById('guess-left').innerHTML = numGuess;
    document.getElementById('wrong-guess').innerHTML = wrongGuess.join(' ');

    if(letterInChosenWord.join(' ') === blankAndSuccess.join(' ')){
        winCounter++;
        document.getElementById('win-counter').innerHTML = winCounter;
        alert('You win the word is ' + letterInChosenWord.join(''));
        start();

    }
    else if(numGuess == 0){
        lossCounter++;
        document.getElementById('loss-counter').innerHTML = String(lossCounter);
        alert('You lose, the word was: '+ chossenWord);
        start();
    }
}


start();
document.onkeyup = function (event) {
    var guessLetter = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetter(guessLetter);
    roundComplete()
};