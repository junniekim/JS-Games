/////////////////////////////////////////////////////
// 1-blank 2-O 3-X
gameBoard = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];
//selected buttons
selectedButtons = [];
//turnCount
turnCount = 0;
//1-play against a human 2-easy cpu 3-hard cpu
gameMode = 1;
//stat
oWin = 0;
xWin = 0;

//somebody won flag
winFlag = false;

//true: player 1's turn
//false: player 2's turn
turn = true;
/////////////////////////////////////////////////////

window.onload = function () {
  init();
};
function onReset() {
  init();
}
function onChangeGameMode(x) {
  oWin = 0;
  xWin = 0;
  gameMode = x;

  init();
}

function init() {
  //reset the board and turn
  document.getElementById("status").innerHTML = "Let's play Tic Tac Toe.";
  selectedButtons = [];
  winFlag = false;
  turnCount = 0;
  if (gameMode == 1) {
    document.getElementById("gameModeName").style.color = "green";
    document.getElementById("gameModeName").innerHTML =
      "Friendly Match with a friend";
  } else if (gameMode == 2) {
    document.getElementById("gameModeName").style.color = "blue";
    document.getElementById("gameModeName").innerHTML =
      "Warm up match with a bot";
  } else if (gameMode == 3) {
    document.getElementById("gameModeName").style.color = "red";
    document.getElementById("gameModeName").innerHTML =
      "Challege: Beat the bot";
  }
  turn = true;
  gameBoard = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  displayAfterMove();
  document.getElementById("b1").disabled = false;
  document.getElementById("b2").disabled = false;
  document.getElementById("b3").disabled = false;
  document.getElementById("b4").disabled = false;
  document.getElementById("b5").disabled = false;
  document.getElementById("b6").disabled = false;
  document.getElementById("b7").disabled = false;
  document.getElementById("b8").disabled = false;
  document.getElementById("b9").disabled = false;

  //display score
  if (gameMode == 1) {
    document.getElementById("player1Name").innerHTML = "Player 1";
    document.getElementById("player2Name").innerHTML = "Player 2";
    document.getElementById("friend").disabled = true;
    document.getElementById("easyBot").disabled = false;
    document.getElementById("hardBot").disabled = false;
  } else if (gameMode == 2) {
    document.getElementById("easyBot").disabled = true;
    document.getElementById("friend").disabled = false;
    document.getElementById("hardBot").disabled = false;
    document.getElementById("player1Name").innerHTML = "Player";
    document.getElementById("player2Name").innerHTML = "Easy Computer";
  } else if (gameMode == 3) {
    document.getElementById("hardBot").disabled = true;
    document.getElementById("friend").disabled = false;
    document.getElementById("easyBot").disabled = false;
    document.getElementById("player1Name").innerHTML = "Player";
    document.getElementById("player2Name").innerHTML = "Hard Computer";
  }

  document.getElementById("player1Win").innerHTML = oWin;
  document.getElementById("player2Win").innerHTML = xWin;
}
//change the gameboard array upon click, as well as disable button
function move(selectedButton) {
  turnCount++;
  selectedButtons.push(selectedButton);
  if (selectedButton == 0) {
    document.getElementById("b1").disabled = true;
    if (turn) {
      gameBoard[0][0] = 2;
    } else {
      gameBoard[0][0] = 3;
    }
  } else if (selectedButton == 1) {
    document.getElementById("b2").disabled = true;
    if (turn) {
      gameBoard[0][1] = 2;
    } else {
      gameBoard[0][1] = 3;
    }
  } else if (selectedButton == 2) {
    document.getElementById("b3").disabled = true;
    if (turn) {
      gameBoard[0][2] = 2;
    } else {
      gameBoard[0][2] = 3;
    }
  } else if (selectedButton == 3) {
    document.getElementById("b4").disabled = true;
    if (turn) {
      gameBoard[1][0] = 2;
    } else {
      gameBoard[1][0] = 3;
    }
  } else if (selectedButton == 4) {
    document.getElementById("b5").disabled = true;
    if (turn) {
      gameBoard[1][1] = 2;
    } else {
      gameBoard[1][1] = 3;
    }
  } else if (selectedButton == 5) {
    document.getElementById("b6").disabled = true;
    if (turn) {
      gameBoard[1][2] = 2;
    } else {
      gameBoard[1][2] = 3;
    }
  } else if (selectedButton == 6) {
    document.getElementById("b7").disabled = true;
    if (turn) {
      gameBoard[2][0] = 2;
    } else {
      gameBoard[2][0] = 3;
    }
  } else if (selectedButton == 7) {
    document.getElementById("b8").disabled = true;
    if (turn) {
      gameBoard[2][1] = 2;
    } else {
      gameBoard[2][1] = 3;
    }
  } else if (selectedButton == 8) {
    document.getElementById("b9").disabled = true;
    if (turn) {
      gameBoard[2][2] = 2;
    } else {
      gameBoard[2][2] = 3;
    }
  }
  //display the change
  displayAfterMove();
  //check if the game is over
  gameOverCheck();
  if (gameMode == 2 && turn == false && turnCount < 8) {
    setTimeout(() => {
      easyRoboPicks();
    }, 200);
  }
  if (gameMode == 3 && turn == false && turnCount < 8) {
    setTimeout(() => {
      hardRoboPicks();
    }, 200);
  }
}
function hardRoboPicks() {
  hardRoboMove();
}
function hardRoboMove() {
  corners = [0, 2, 6, 8];
  selectedButton = 10;
  //first move, always get a corner
  if (turnCount == 1) {
    if (
      selectedButtons.includes(0) ||
      selectedButtons.includes(2) ||
      selectedButtons.includes(6) ||
      selectedButtons.includes(8)
    ) {
      selectedButton = 4;
    } else {
      selectedButton = corners[Math.floor(Math.random() * 4)];
      while (selectedButtons.includes(selectedButton)) {
        selectedButton = corners[Math.floor(Math.random() * 4)];
      }
    }
  }

  //starting from second move
  else {
    //also check if it's taken

    //from second move, block if two consecutive found, other wise randomly place
    //There are 24 possible case where 2 in a row exist (counting a blank in the middle as well)
    if (selectedButton == 10) {
      for (let i = 0; i < 3; i++) {
        //check horizontal first
        //if not empty

        if (gameBoard[i][0] != 1 && gameBoard[i][0] == gameBoard[i][1]) {
          if (i == 0 && !selectedButtons.includes(2)) {
            selectedButton = 2;
            break;
          }
          if (i == 1 && !selectedButtons.includes(5)) {
            selectedButton = 5;
            break;
          }
          if (i == 2 && !selectedButtons.includes(8)) {
            selectedButton = 8;
            break;
          }
        } else if (gameBoard[i][0] != 1 && gameBoard[i][0] == gameBoard[i][2]) {
          if (i == 0 && !selectedButtons.includes(1)) {
            selectedButton = 1;
            break;
          }
          if (i == 1 && !selectedButtons.includes(4)) {
            selectedButton = 4;
            break;
          }
          if (i == 2 && !selectedButtons.includes(7)) {
            selectedButton = 7;
            break;
          }
        } else if (gameBoard[i][2] != 1 && gameBoard[i][2] == gameBoard[i][1]) {
          if (i == 0 && !selectedButtons.includes(0)) {
            selectedButton = 0;
            break;
          }
          if (i == 1 && !selectedButtons.includes(3)) {
            selectedButton = 3;
            break;
          }
          if (i == 2 && !selectedButtons.includes(6)) {
            selectedButton = 6;
            break;
          }
        }
      }
    }
    if (selectedButton == 10) {
      for (let i = 0; i < 3; i++) {
        //check vertical next
        //if not empty

        if (gameBoard[0][i] != 1 && gameBoard[0][i] == gameBoard[1][i]) {
          if (i == 0 && !selectedButtons.includes(6)) {
            selectedButton = 6;
            break;
          }
          if (i == 1 && !selectedButtons.includes(7)) {
            selectedButton = 7;
            break;
          }
          if (i == 2 && !selectedButtons.includes(8)) {
            selectedButton = 8;
            break;
          }
        } else if (gameBoard[0][i] != 1 && gameBoard[0][i] == gameBoard[2][i]) {
          if (i == 0 && !selectedButtons.includes(3)) {
            selectedButton = 3;
            break;
          }
          if (i == 1 && !selectedButtons.includes(4)) {
            selectedButton = 4;
            break;
          }
          if (i == 2 && !selectedButtons.includes(5)) {
            selectedButton = 5;
            break;
          }
        } else if (gameBoard[2][i] != 1 && gameBoard[2][i] == gameBoard[1][i]) {
          if (i == 0 && !selectedButtons.includes(0)) {
            selectedButton = 0;
            break;
          }
          if (i == 1 && !selectedButtons.includes(1)) {
            selectedButton = 1;
            break;
          }
          if (i == 2 && !selectedButtons.includes(2)) {
            selectedButton = 2;
            break;
          }
        }
      }
    }
    if (selectedButton == 10) {
      //hard code 6 diagonal cases
      if (
        gameBoard[0][0] != 1 &&
        gameBoard[0][0] == gameBoard[1][1] &&
        !selectedButtons.includes(8)
      ) {
        selectedButton = 8;
      } else if (
        gameBoard[0][0] != 1 &&
        gameBoard[0][0] == gameBoard[2][2] &&
        !selectedButtons.includes(4)
      ) {
        selectedButton = 4;
      } else if (
        gameBoard[1][1] != 1 &&
        gameBoard[2][2] == gameBoard[1][1] &&
        !selectedButtons.includes(0)
      ) {
        selectedButton = 0;
      } else if (
        gameBoard[0][2] != 1 &&
        gameBoard[1][1] == gameBoard[0][2] &&
        !selectedButtons.includes(6)
      ) {
        selectedButton = 6;
      } else if (
        gameBoard[0][2] != 1 &&
        gameBoard[0][2] == gameBoard[2][0] &&
        !selectedButtons.includes(4)
      ) {
        selectedButton = 4;
      } else if (
        gameBoard[2][0] != 1 &&
        gameBoard[2][0] == gameBoard[1][1] &&
        !selectedButtons.includes(2)
      ) {
        selectedButton = 2;
      }
    }

    //all fails, do random
    if (selectedButton == 10) {
      if (turnCount == 3) {
        if (!selectedButtons.includes(4)) {
          selectedButton = 4;
        } else {
          while (
            selectedButton == 10 ||
            selectedButtons.includes(selectedButton)
          ) {
            selectedButton = Math.floor(Math.random() * 9);
          }
        }
      } else {
        while (
          selectedButton == 10 ||
          selectedButtons.includes(selectedButton)
        ) {
          selectedButton = Math.floor(Math.random() * 9);
        }
      }
    }
  }
  turnCount++;

  //eventuall store the value in selectedButton

  selectedButtons.push(selectedButton);
  if (selectedButton == 0) {
    document.getElementById("b1").disabled = true;

    gameBoard[0][0] = 3;
  } else if (selectedButton == 1) {
    document.getElementById("b2").disabled = true;

    gameBoard[0][1] = 3;
  } else if (selectedButton == 2) {
    document.getElementById("b3").disabled = true;

    gameBoard[0][2] = 3;
  } else if (selectedButton == 3) {
    document.getElementById("b4").disabled = true;

    gameBoard[1][0] = 3;
  } else if (selectedButton == 4) {
    document.getElementById("b5").disabled = true;

    gameBoard[1][1] = 3;
  } else if (selectedButton == 5) {
    document.getElementById("b6").disabled = true;

    gameBoard[1][2] = 3;
  } else if (selectedButton == 6) {
    document.getElementById("b7").disabled = true;

    gameBoard[2][0] = 3;
  } else if (selectedButton == 7) {
    document.getElementById("b8").disabled = true;

    gameBoard[2][1] = 3;
  } else if (selectedButton == 8) {
    document.getElementById("b9").disabled = true;

    gameBoard[2][2] = 3;
  }
  //display the change
  displayAfterMove();
  //check if the game is over
  gameOverCheck();
}
function easyRoboPicks() {
  let random = 10;
  while (random == 10 || selectedButtons.includes(random)) {
    random = Math.floor(Math.random() * 9);
  }
  easyRoboMove(random);
}
function easyRoboMove(selectedButton) {
  turnCount++;
  selectedButtons.push(selectedButton);
  if (selectedButton == 0) {
    document.getElementById("b1").disabled = true;

    gameBoard[0][0] = 3;
  } else if (selectedButton == 1) {
    document.getElementById("b2").disabled = true;

    gameBoard[0][1] = 3;
  } else if (selectedButton == 2) {
    document.getElementById("b3").disabled = true;

    gameBoard[0][2] = 3;
  } else if (selectedButton == 3) {
    document.getElementById("b4").disabled = true;

    gameBoard[1][0] = 3;
  } else if (selectedButton == 4) {
    document.getElementById("b5").disabled = true;

    gameBoard[1][1] = 3;
  } else if (selectedButton == 5) {
    document.getElementById("b6").disabled = true;

    gameBoard[1][2] = 3;
  } else if (selectedButton == 6) {
    document.getElementById("b7").disabled = true;

    gameBoard[2][0] = 3;
  } else if (selectedButton == 7) {
    document.getElementById("b8").disabled = true;

    gameBoard[2][1] = 3;
  } else if (selectedButton == 8) {
    document.getElementById("b9").disabled = true;

    gameBoard[2][2] = 3;
  }
  //display the change
  displayAfterMove();
  //check if the game is over
  gameOverCheck();
}
//followed by the move function, display according to the change in gameboard
function displayAfterMove() {
  //go through gameboard
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[0].length; j++)
      //game board marked O
      if (gameBoard[i][j] == 2) {
        if (i == 0 && j == 0) {
          document.getElementById("b1").innerHTML = "O";
        } else if (i == 0 && j == 1) {
          document.getElementById("b2").innerHTML = "O";
        } else if (i == 0 && j == 2) {
          document.getElementById("b3").innerHTML = "O";
        } else if (i == 1 && j == 0) {
          document.getElementById("b4").innerHTML = "O";
        } else if (i == 1 && j == 1) {
          document.getElementById("b5").innerHTML = "O";
        } else if (i == 1 && j == 2) {
          document.getElementById("b6").innerHTML = "O";
        } else if (i == 2 && j == 0) {
          document.getElementById("b7").innerHTML = "O";
        } else if (i == 2 && j == 1) {
          document.getElementById("b8").innerHTML = "O";
        } else if (i == 2 && j == 2) {
          document.getElementById("b9").innerHTML = "O";
        }
      }
      //gameBoard marked X
      else if (gameBoard[i][j] == 3) {
        if (i == 0 && j == 0) {
          document.getElementById("b1").innerHTML = "X";
        } else if (i == 0 && j == 1) {
          document.getElementById("b2").innerHTML = "X";
        } else if (i == 0 && j == 2) {
          document.getElementById("b3").innerHTML = "X";
        } else if (i == 1 && j == 0) {
          document.getElementById("b4").innerHTML = "X";
        } else if (i == 1 && j == 1) {
          document.getElementById("b5").innerHTML = "X";
        } else if (i == 1 && j == 2) {
          document.getElementById("b6").innerHTML = "X";
        } else if (i == 2 && j == 0) {
          document.getElementById("b7").innerHTML = "X";
        } else if (i == 2 && j == 1) {
          document.getElementById("b8").innerHTML = "X";
        } else if (i == 2 && j == 2) {
          document.getElementById("b9").innerHTML = "X";
        }
      } else {
        if (i == 0 && j == 0) {
          document.getElementById("b1").innerHTML = "";
        } else if (i == 0 && j == 1) {
          document.getElementById("b2").innerHTML = "";
        } else if (i == 0 && j == 2) {
          document.getElementById("b3").innerHTML = "";
        } else if (i == 1 && j == 0) {
          document.getElementById("b4").innerHTML = "";
        } else if (i == 1 && j == 1) {
          document.getElementById("b5").innerHTML = "";
        } else if (i == 1 && j == 2) {
          document.getElementById("b6").innerHTML = "";
        } else if (i == 2 && j == 0) {
          document.getElementById("b7").innerHTML = "";
        } else if (i == 2 && j == 1) {
          document.getElementById("b8").innerHTML = "";
        } else if (i == 2 && j == 2) {
          document.getElementById("b9").innerHTML = "";
        }
      }
  }
}
//is game over?
function gameOverCheck() {
  //must be not a blank
  // check horizontal and vertical
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i][0] != 1 &&
      gameBoard[i][0] == gameBoard[i][1] &&
      gameBoard[i][1] == gameBoard[i][2]
    ) {
      winFlag = true;
      break;
    }
    if (
      gameBoard[0][i] != 1 &&
      gameBoard[0][i] == gameBoard[1][i] &&
      gameBoard[1][i] == gameBoard[2][i]
    ) {
      winFlag = true;
      break;
    }
    if (i == 0) {
      if (
        gameBoard[i][i] != 1 &&
        gameBoard[i][i] == gameBoard[i + 1][i + 1] &&
        gameBoard[i + 2][i + 2] == gameBoard[i + 1][i + 1]
      ) {
        winFlag = true;
        break;
      }
      if (
        gameBoard[0][2] != 1 &&
        gameBoard[0][2] == gameBoard[1][1] &&
        gameBoard[1][1] == gameBoard[2][0]
      ) {
        winFlag = true;
        break;
      }
    }
  }
  if (winFlag) {
    gameover();
    return;
  }
  //if game over, disable all buttons and give game over message

  //change turn
  turn = !turn;
  if (turn) document.getElementById("status").innerHTML = "O goes next ";
  else document.getElementById("status").innerHTML = "X goes next ";
  if (turnCount == 9) {
    document.getElementById("status").innerHTML = "Tied Game!";
  }
}

function gameover() {
  if (gameMode == 1 && turn == true) {
    document.getElementById("status").innerHTML = "Player 1 is the winner!";
    oWin++;
  } else if (gameMode == 1 && turn == false) {
    document.getElementById("status").innerHTML = "Player 2 is the winner!";
    xWin++;
  } else if (turn == true) {
    document.getElementById("status").innerHTML = "You are the winner!";
    oWin++;
  } else {
    xWin++;
    document.getElementById("status").innerHTML = "You lost to a computer";
  }
  document.getElementById("b1").disabled = true;
  document.getElementById("b2").disabled = true;
  document.getElementById("b3").disabled = true;
  document.getElementById("b4").disabled = true;
  document.getElementById("b5").disabled = true;
  document.getElementById("b6").disabled = true;
  document.getElementById("b7").disabled = true;
  document.getElementById("b8").disabled = true;
  document.getElementById("b9").disabled = true;
  document.getElementById("player1Win").innerHTML = oWin;
  document.getElementById("player2Win").innerHTML = xWin;
}
