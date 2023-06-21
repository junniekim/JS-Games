/////////////
lives = 8;
score = 0;
gameBoardEasy = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
gameBoard = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
//prevent picking same card twice
selectingPair = 0;
//prevent picking cards that already has a pair
selectedIndex = [];
//1-easy 2-medium 3-hard
gameMode = 2;
/////////////
window.onload = function () {
  init();
};
function onReset() {
  init();
}

//reset the game
function init() {
  //based on the game mode, shuffle the board and start with the different life
  if (gameMode == 1) {
    shuffle(gameBoardEasy);
    shuffle(gameBoardEasy);
    lives = 8;
  } else if (gameMode == 2) {
    lives = 8;
    shuffle(gameBoard);
    shuffle(gameBoard);
  } else if (gameMode == 3) {
    lives = 5;
    shuffle(gameBoard);
    shuffle(gameBoard);
  }
}

//change the level and reset the game
function onGameModeChange(x) {
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
