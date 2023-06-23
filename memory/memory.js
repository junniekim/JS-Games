/////////////
lives = 10;
firstOrSecond = 0;
score = 0;
gameBoard = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
//prevent picking same card twice
selectingPair = 0;
correctPair = 0;
//1-easy 2-medium 3-hard
gameMode = 1;
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
    document.getElementById("gameModeName").innerHTML = "EASY";
    lives = 10;
  } else if (gameMode == 2) {
    document.getElementById("gameModeName").innerHTML = "MEDIUM";
    lives = 8;
  } else {
    document.getElementById("gameModeName").innerHTML = "HARD";
    lives = 5;
  }
  // shuffle(gameBoard);
  // shuffle(gameBoard);
  document.getElementById("status").innerHTML = "Let's play memory game";

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
  //first card
  if (firstOrSecond % 2 == 0) {
    selectingPair = x;
    //disable the selected card
    document.getElementById("b" + x).disabled = true;
    //change the flag
    firstOrSecond++;
    document.getElementById("status").innerHTML = "Pick one more";
  }
  //second card
  else {
    //change the flag
    firstOrSecond++;
    //card matches
    if (gameBoard[selectingPair - 1] == gameBoard[x - 1]) {
      correctPair++;
      document.getElementById("b" + x).disabled = true;
      document.getElementById("status").innerHTML = "Correct";
    }

    //card does not Match
    else {
      lives--;
      document.getElementById("status").innerHTML = "Wrong";
      document.getElementById("lives").innerHTML = lives;
      document.getElementById("b" + selectingPair).disabled = false;
      document.getElementById("b" + x).disabled = false;
    }
  }
  gameOverCheck();
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

    document.getElementById("status").innerHTML = "Won";
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
    document.getElementById("status").innerHTML = "Lost";
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
