/////////////
lives = 10;
firstOrSecond = 0;
score = 0;
gameBoard = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
imgBoard = [];
//prevent picking same card twice
selectingPair = 0;
correctPair = 0;
//1-easy 2-medium 3-hard
gameMode = 1;
canClick = true;
time = 3000;
/////////////

//initial page load
window.onload = function () {
  //document.getElementById("gameModeName").innerHTML = "EASY";
  init();
};
//reset button clicked
function onReset() {
  init();
}
//reset images
function resetImage() {
  document.getElementById("b1").disabled = false;
  document.getElementById("b2").disabled = false;
  document.getElementById("b3").disabled = false;
  document.getElementById("b4").disabled = false;
  document.getElementById("b5").disabled = false;
  document.getElementById("b6").disabled = false;
  document.getElementById("b7").disabled = false;
  document.getElementById("b8").disabled = false;
  document.getElementById("b9").disabled = false;
  document.getElementById("b10").disabled = false;
  document.getElementById("b11").disabled = false;
  document.getElementById("b12").disabled = false;
  document.getElementById("b13").disabled = false;
  document.getElementById("b14").disabled = false;
  document.getElementById("b15").disabled = false;
  document.getElementById("b16").disabled = false;

  document.getElementById("b1").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b2").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b3").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b4").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b5").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b6").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b7").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b8").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b9").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b10").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b11").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b12").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b13").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b14").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b15").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b16").innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
}
//reset the game
function init() {
  if (gameMode == 1) {
    document.getElementById("gameModeName").innerHTML = "EASY LEVEL";
    document.getElementById("explain").innerHTML =
      "10 lives & 2 seconds to see cards";
    document.getElementById("gameModeName").style.color = "blue";
    document.getElementById("explain").style.color = "blue";
    time = 2000;
    lives = 10;
  } else if (gameMode == 2) {
    document.getElementById("gameModeName").innerHTML = "MEDIUM LEVEL";
    document.getElementById("explain").innerHTML =
      "8 lives & 1 second to see cards";
    document.getElementById("gameModeName").style.color = "#F6BE00";
    document.getElementById("explain").style.color = "#F6BE00";
    lives = 8;
    time = 1000;
  } else {
    document.getElementById("explain").innerHTML =
      "5 lives & .7 seconds to see cards";
    document.getElementById("gameModeName").innerHTML = "HARD LEVEL";
    document.getElementById("gameModeName").style.color = "red";
    document.getElementById("explain").style.color = "red";
    lives = 5;
    time = 700;
  }
  shuffle(gameBoard);
  shuffle(gameBoard);
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] == 1) {
      imgBoard[i] = '<img src="/assets/square.jpg" width="90px" ">';
    } else if (gameBoard[i] == 2) {
      imgBoard[i] = '<img src="/assets/questionMark.jpg" width="90px" ">';
    } else if (gameBoard[i] == 3) {
      imgBoard[i] = '<img src="/assets/star.jpg" width="90px" ">';
    } else if (gameBoard[i] == 4) {
      imgBoard[i] = '<img src="/assets/heart.jpg" width="90px" ">';
    } else if (gameBoard[i] == 5) {
      imgBoard[i] = '<img src="/assets/plus.jpg" width="90px" ">';
    } else if (gameBoard[i] == 6) {
      imgBoard[i] = '<img src="/assets/ampersand.jpg" width="90px" ">';
    } else if (gameBoard[i] == 7) {
      imgBoard[i] = '<img src="/assets/triangle.jpg" width="90px" ">';
    } else if (gameBoard[i] == 8) {
      imgBoard[i] = '<img src="/assets/circle.jpg" width="90px" ">';
    }
  }
  document.getElementById("status").innerHTML = "Let's play memory game!";

  document.getElementById("score").innerHTML = score;
  document.getElementById("lives").innerHTML = lives;
  firstOrSecond = 0;
  correctPair = 0;
  selectingPair = 0;
  selectedIndex = [];

  resetImage();
}
//disable button beforehand if already chosen OR pair made
function cardFlipped(x) {
  if (canClick) {
    //first card
    if (firstOrSecond % 2 == 0) {
      selectingPair = x;
      //disable the selected card
      document.getElementById("b" + x).disabled = true;
      //change the flag
      firstOrSecond++;
      document.getElementById("status").innerHTML = "Pick a matching card!";
      document.getElementById("b" + x).innerHTML = imgBoard[x - 1];
    }
    //second card
    else {
      //change the flag
      firstOrSecond++;
      //card matches
      if (gameBoard[selectingPair - 1] == gameBoard[x - 1]) {
        correctPair++;
        document.getElementById("b" + x).disabled = true;
        document.getElementById("status").innerHTML =
          "Correct! Pick a new card!";
        document.getElementById("b" + x).innerHTML = imgBoard[x - 1];
      }

      //card does not Match
      else {
        canClick = false;
        lives--;
        document.getElementById("b" + x).innerHTML = imgBoard[x - 1];
        document.getElementById("status").innerHTML =
          "Try again! Pick a new card!";
        document.getElementById("lives").innerHTML = lives;
        document.getElementById("b" + selectingPair).disabled = false;
        document.getElementById("b" + x).disabled = false;

        setTimeout(() => {
          displayForASecond(x, selectingPair);
        }, time);
      }
    }
    gameOverCheck();
  }
}
function displayForASecond(x, selectingPair) {
  document.getElementById("b" + selectingPair).innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  document.getElementById("b" + x).innerHTML =
    '<img src="/assets/back.jpg" width="90px" ">';
  canClick = true;
}
function gameOverCheck() {
  if (correctPair == 8) {
    if (gameMode == 1) {
      score += 100;
    }
    if (gameMode == 2) {
      score += 200;
    }
    if (gameMode == 3) {
      score += 300;
    }

    document.getElementById("status").innerHTML = "You won!";
  }
  if (lives == 0) {
    score -= 50;
    document.getElementById("b1").disabled = true;
    document.getElementById("b2").disabled = true;
    document.getElementById("b3").disabled = true;
    document.getElementById("b4").disabled = true;
    document.getElementById("b5").disabled = true;
    document.getElementById("b6").disabled = true;
    document.getElementById("b7").disabled = true;
    document.getElementById("b8").disabled = true;
    document.getElementById("b9").disabled = true;
    document.getElementById("b10").disabled = true;
    document.getElementById("b11").disabled = true;
    document.getElementById("b12").disabled = true;
    document.getElementById("b13").disabled = true;
    document.getElementById("b14").disabled = true;
    document.getElementById("b15").disabled = true;
    document.getElementById("b16").disabled = true;
    document.getElementById("status").innerHTML = "You lost! Try again!";
  }
  document.getElementById("score").innerHTML = score;
}

//change the level and reset the game
function onChangeGameMode(x) {
  gameMode = x;
  init();
}

//helper functions
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
