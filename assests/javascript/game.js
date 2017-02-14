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

function displayCipher() {
    var word = randomWord();
    var num = word.length;
    document.getElementById('guess-left').innerHTML= word;
    // console.log(word);
    // console.log(num);
}

function start() {
    wrongGuess = [];
    numGuess = 9;
    blankAndSuccess = [];
    chossenWord = randomWord();
    letterInChosenWord = chossenWord.split("");
    numBlanks = letterInChosenWord.length;
    console.log(chossenWord);
    console.log(numBlanks);

    //fill array with underscores
    for(var i = 0; i< chossenWord.length;i++){
        blankAndSuccess.push("_");
    }
    console.log(blankAndSuccess);
    document.getElementById('word-blank').innerHTML = blankAndSuccess.join(" ");
    document.getElementById('guess-left').innerHTML = numGuess;

}

function checkLetter(letter){

    var letterInWord = false;
    for(i = 0; i < numBlanks; i++){
        if(chossenWord[i] === letter){
            letterInWord = true;
        }
    }
    if(letterInWord){
        for(i = 0; i < numBlanks; i++){
            if(chossenWord[i] === letter){
                blankAndSuccess[i] = letter;
            }
        }
    }else {
        numGuess--;
        wrongGuess.push(letter);
    }
}

function roundComplete(){
    //Update Elements in HTML
    document.getElementById('word-blank').innerHTML = blankAndSuccess.join('');
    document.getElementById('guess-left').innerHTML = numGuess;
    document.getElementById('wrong-guess').innerHTML = wrongGuess.join('');

    if(letterInChosenWord.join(' ') === blankAndSuccess.join(' ')){
        winCounter++;
        document.getElementById('win-counter').innerHTML = winCounter;
        alert('You win')
        start();
    }
    else if(numGuess == 0){
        lossCounter++;
        document.getElementById('loss-counter').innerHTML = lossCounter;
        alert('You lose');
        start()
    }
}

start();
document.onkeyup = function (event) {
    var guessLetter = String.fromCharCode(event.keyCode).toLowerCase();
    console.log("this is the letter you typed: " + guessLetter);
    checkLetter(guessLetter);
    roundComplete()
}