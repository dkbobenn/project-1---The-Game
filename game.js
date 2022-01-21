

let userInputMin = 1; //lowest number, always 1 no matter the level selected
let userInputMax = 0; //highest number, depending on the level selected by the user
let correctAnswers = 0; //correct answers from user
let wrongAnswers = 0; //wrong answers from user
let randomNumber = 0; //number generated by function getRandomInt(){}
let prevNumber = 0; // variable to hold the previous number generated by function getRandomInt(){}
let score; //variable to store true or false depending on whether user answers correct or not

let levelEasyButton = document.getElementById('level-button1');
let levelMediumButton = document.getElementById('level-button2')
let levelHardButton = document.getElementById('level-button3');
let startButton = document.getElementById("start-button");
let gameBoard = document.getElementById("game-board");
let highlowerButtons = document.getElementById("highlower-buttons");
let introSection = document.getElementById("intro");
let endGamepopup =  document.getElementById("end-game");
let scoreTrackerCorrect = document.getElementById('score-correct-ans');
let scoreTrackerWrong = document.getElementById('score-wrong-anw');
let countNumberCorrect =  document.getElementById('score-correct-number');
let countNumberWrong = document.getElementById('score-wrong-number');
let showGameBoardInfo = document.getElementById('gameboard-info')

const number = document.getElementById("random-number");
const span = document.createElement("span");
const loosingVideo = document.getElementById('loosing-video');
const winningVideo = document.getElementById('winning-video');
const loosingAudio = document.getElementById('loosing-audio'); 
const winnerAudio = document.getElementById('winner-audio');
const endGameText = document.getElementById("endgame-text");
const endGameScore = document.getElementById("endgame-score");
const lamps = document.getElementById('lamps');
const greenLamp = document.getElementById('green-lamp');
const redLamp = document.getElementById('red-lamp');

//radio button selection for the easy level
levelEasyButton.onclick = () => {

   levelMediumButton.checked = false;
   levelHardButton.checked = false;
   gameBoard.style.display = "block"; 
   number.innerHTML = '';
   correctAnswers = 0;
   wrongAnswers = 0;
   userInputMax = 50;
};

//radio button selection for the medium level
levelMediumButton.onclick = () => {

  levelEasyButton.checked = false
  levelHardButton.checked = false
  gameBoard.style.display = "block"; 
  number.innerHTML = '';
  correctAnswers = 0;
  wrongAnswers = 0;
  userInputMax = 25;
};

//radio button selection for the hard level
 levelHardButton.onclick = () => {

  levelEasyButton.checked = false
  levelMediumButton.checked = false
  gameBoard.style.display = "block"; 
  number.innerHTML = '';
  correctAnswers = 0;
  wrongAnswers = 0;
  userInputMax = 10; 
};
  //Get the next random number
 function getRandomInt(min, max, prevNumber) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNumber = prevNumber;
    //while loop added to prevent identical numbers getting generated right after each other
    while (prevNumber === randomNumber) {
      randomNumber = Math.floor(Math.random() * (max - min) + min); 
    }
   return randomNumber;
   }

 // Start the game 
 document.querySelector('#start-button').addEventListener('click', function () {
    highlowerButtons.style.display = "block";
    scoreTrackerCorrect.style.display = 'block';
    scoreTrackerWrong.style.display = 'block';
    showGameBoardInfo.style.display = 'block';
    lamps.style.display = 'block'

    introSection.style.display = "none"; 
    startButton.style.display = 'none'
    number.appendChild(span)
    randomNumber = Math.floor(userInputMax / 2)
    number.innerHTML = `<span id=number>${randomNumber}</span>`
 });

//write the next number on the screen
 function writeNextNumber() {
    prevNumber = randomNumber
    randomNumber = getRandomInt(userInputMin, userInputMax, prevNumber)
    const newNumber = document.getElementById('number')
    newNumber.innerHTML = `${randomNumber}`
};

   //gamebutton for guessing on a higher number
  document.querySelector('#gamebutton-higher').addEventListener('click', function () {
    writeNextNumber();
    if(prevNumber < randomNumber){
      score = true;
     }
    else if(prevNumber > randomNumber){
       score = false;
     }
     calcScore()
  });

  //gamebutton for guessing on a lower number
  document.querySelector('#gamebutton-lower').addEventListener('click', function () {
    writeNextNumber()
    if(prevNumber < randomNumber){
      score = false;
     }
    else if(prevNumber > randomNumber){
       score = true;
     }
     calcScore()
  });

  //Guessing higher or lower with keyboard instead buttons. ArrowUp = higher & ArrowDown = lower
  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 38:
        writeNextNumber()
        if(prevNumber < randomNumber){
          score = true;
         }
         else if(prevNumber > randomNumber){
           score = false;
         }
         calcScore()
        break;
      case 40:
        writeNextNumber()
        if(prevNumber < randomNumber){
          score = false;
         }
         else if(prevNumber > randomNumber){
           score = true;
         }
         calcScore()
        break;
      }
    });
  
//score is calculated here
function calcScore(){
switch (score) {
    case true:
    correctAnswers += 1;
    greenLamp.style.background = "green";
    setTimeout(function() {
      greenLamp.style.background = '#add8e6'; 
    }, 500);
    break;
    case false:
    wrongAnswers += 1;
    redLamp.style.background = "red";
    setTimeout(function() {
    redLamp.style.background = '#add8e6'; 
    }, 500);
    break;
}
   countNumberCorrect.innerHTML = `${correctAnswers}`
   countNumberWrong.innerHTML = `${wrongAnswers}`
   result()
}

//result of the game - win or loose
function result(){
  
   const addWinnerText = document.createTextNode(`YOU WON THE GAME`);
   const addLooserText = document.createTextNode(`YOU LOST THE GAME`)
   const addScore = document.createTextNode(`Your score is ${correctAnswers} correct and ${wrongAnswers} wrong`);
   
  if(correctAnswers === 5){

    winnerAudio.play()
    winningVideo.play()
    winningVideo.style.display = 'block';
    endGameText.appendChild(addWinnerText);
    endGameScore.appendChild(addScore);
    endGame()
  }
  else if(wrongAnswers === 5){
    
    loosingAudio.play()
    loosingVideo.play()
    loosingVideo.style.display = 'block';
    endGameText.appendChild(addLooserText);
    endGameScore.appendChild(addScore);
    endGame()
  }
}
 //ending the game by displaying the last html block
function endGame(){
  endGamepopup.style.display = "block";
  gameBoard.style.display = "none";

}

//if user presses the yes button in the pop up to continue playing, page will reload
document.querySelector('#playagain-button').addEventListener('click', function () {
  document.location.reload();
  clearInterval(interval); // Needed for Chrome to end game
});