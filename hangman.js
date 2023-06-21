//Declaration of variable
let startLife = 7;
let chosenWord = "";
let fakeString = "";
let guessedLetters = [];
let wrongLetters = [];
let currentScore = 0;
let hardFlag = false;
let timesWon = 0;
let timesLost = 0;

//Initialize on loading
window.onload = function () {
  init();
};
//Initialize upon reset
function onRefresh() {
  hardFlag = false;
  init();
}

//check if game is over
function gameOverCheck() {
  //player lose if life is 0
  if (startLife == 0) {
    timesLost++;
    document.getElementById("status").innerHTML = "You Lost";
    currentScore -= 50;
    document.getElementById("submit").disabled = true;
    document.getElementById("score").innerHTML = currentScore;
    document.getElementById("win").innerHTML = timesWon;
    document.getElementById("lose").innerHTML = timesLost;
    document.getElementById("guess").disabled = true;
    document.getElementById("hint").disabled = true;
    document.getElementById("cheat").disabled = true;

    document.getElementById("fakeString").style.color = "red";
  }
  //player wins if fakeString does not contain *
  if (!fakeString.includes("_")) {
    timesWon++;
    //if hard mode, double the point
    if (hardFlag == true) {
      currentScore += 200;
      document.getElementById("status").innerHTML =
        "Good job! You earned double points";
    } else {
      currentScore += 100;
      document.getElementById("status").innerHTML = "You Won";
    }
    //all buttons get disabled except reset buttons
    document.getElementById("win").innerHTML = timesWon;
    document.getElementById("lose").innerHTML = timesLost;
    document.getElementById("submit").disabled = true;
    document.getElementById("guess").disabled = true;
    document.getElementById("hint").disabled = true;
    document.getElementById("cheat").disabled = true;
    document.getElementById("fakeString").style.color = "blue";
    document.getElementById("score").innerHTML = currentScore;
  }
}

//Allow submitting answer with enter key
document.addEventListener("keyup", function (event) {
  if (
    event.key === "Enter" &&
    document.getElementById(guess) != "" &&
    startLife > 0
  ) {
    guessSubmit();
  }
});

//Reset the game.
function init() {
  //clear input, reset the image, previous guesses, enable all buttons, reset life to 7
  document.getElementById("guess").value = "";
  let img = document.getElementById("theMan");
  img.src = "assets/1.jpg";
  wrongLetters = [];
  document.getElementById("submit").disabled = false;
  document.getElementById("hard").disabled = false;
  document.getElementById("fakeString").style.color = "black";
  document.getElementById("win").innerHTML = timesWon;
  document.getElementById("lose").innerHTML = timesLost;
  document.getElementById("hint").disabled = false;
  document.getElementById("warning").innerHTML = "";
  document.getElementById("cheat").disabled = false;
  document.getElementById("reset").disabled = false;
  document.getElementById("status").innerHTML = "";
  document.getElementById("status").innerHTML = "Let's play Hangman!";
  document.getElementById("score").innerHTML = currentScore;
  document.getElementById("guess").disabled = false;
  startLife = 7;
  document.getElementById("life").innerHTML = startLife;
  chosenWord = "";
  fakeString = "";
  guessedLetters = [];
  document.getElementById("guessedLetters").innerHTML = "";
  //if hard mode, change some setting
  if (hardFlag) {
    document.getElementById("status").innerHTML =
      "Hard mode doesn't allow you to get a hint, and you only get 3 lives ";
    document.getElementById("warning").innerHTML = "Hard Mode";
    document.getElementById("hint").disabled = true;
    document.getElementById("cheat").disabled = false;
    startLife = 3;
    let img = document.getElementById("theMan");
    img.src = "assets/5.jpg";
    document.getElementById("life").innerHTML = startLife;
  }
  //each round, new word is generated from the bank
  const wordBank = [
    "apple",
    "banana",
    "cat",
    "construction",
    "computer",
    "keyboard",
    "python",
    "orange",
    "avocado",
    "pizza",
    "bread",
    "toy",
    "eggplant",
    "bird",
    "animal",
    "tiger",
    "lion",
    "ape",
    "mango",
    "police",
    "attorney",
    "lawyer",
    "kentucky",
    "bank",
    "netflix",
    "school",
    "teacher",
    "icecream",
    "dessert",
    "meme",
    "league",
    "rainbow",
    "watermelon",
    "california",
    "cucumber",
    "oyster",
    "monster",
    "hero",
    "silver",
    "earth",
    "chemistry",
    "biology",
    "calculus",
    "sandwich",
    "barbeque",
    "movie",
    "spider",
    "assassin",
    "advertisement",
    "instagram",
    "facebook",
    "dove",
    "dragonfly",
    "duck",
    "goat",
    "jellyfish",
    "kangaroo",
    "goldfish",
    "goose",
    "gorilla",
  ];
  let randomIndex = Math.floor(Math.random() * wordBank.length);
  chosenWord = wordBank[randomIndex].toLowerCase();

  // fake string for display
  fakeString = "";
  for (let i = 0; i < chosenWord.length; i++) {
    fakeString += " _ ";
  }
  document.getElementById("fakeString").innerHTML = fakeString;
}

//replace method
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

//check if valid input
function isLetter(str) {
  let s = str.toLowerCase();
  return s.length === 1 && s.match(/[a-z]/i);
}

//hardmode
function onHard() {
  hardFlag = true;
  init();
}

function onCheat() {
  for (let i = 0; i < fakeString.length; i++) {
    if (fakeString.charAt(i) == "_") {
      // console.log(chosenWord.charAt((i - 1) / 3));
      fakeString = setCharAt(
        fakeString,
        i,
        chosenWord.charAt((i - 1) / 3).toUpperCase()
      );
      guessedLetters += chosenWord.charAt((i - 1) / 3);
    }
  }
  document.getElementById("fakeString").innerHTML = fakeString;
  //gameOverCheck();
  cheatEnd();
}

function cheatEnd() {
  document.getElementById("status").innerHTML = "Cheaters earn no points";
  document.getElementById("submit").disabled = true;
  document.getElementById("guess").disabled = true;
  document.getElementById("hint").disabled = true;
  document.getElementById("cheat").disabled = true;
}

function onHint() {
  for (let i = 0; i < fakeString.length; i++) {
    if (fakeString.charAt(i) == "_") {
      fakeString = setCharAt(
        fakeString,
        i,
        chosenWord.charAt((i - 1) / 3).toUpperCase()
      );
      guessedLetters.push(chosenWord.charAt((i - 1) / 3));
      document.getElementById("status").innerHTML = "I hope this helps";
      document.getElementById("fakeString").innerHTML = fakeString;
      break;
    }
  }
  document.getElementById("hint").disabled = true;
  gameOverCheck();
}

function guessSubmit() {
  let guess = document.getElementById("guess").value.toLowerCase();

  if (guess == false || guess == null) {
    return;
  }

  if (!isLetter(guess)) {
    document.getElementById("status").innerHTML =
      "Please only enter a letter between a-z";
    document.getElementById("guess").value = "";

    return;
  }

  //if already guessed
  if (guessedLetters.includes(guess)) {
    document.getElementById("status").innerHTML =
      "You already guessed '" + guess + "' ";
  }
  //new guess
  else {
    guessedLetters.push(guess);

    // correct guess
    if (chosenWord.includes(guess)) {
      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord.charAt(i) == guess) {
          fakeString = setCharAt(fakeString, 1 + i * 3, guess.toUpperCase());
        }
      }
      document.getElementById("status").innerHTML = "Good guess! Keep it up!";
      document.getElementById("fakeString").innerHTML = fakeString;
    }
    //wrong guess
    else {
      wrongLetters.push(guess.toUpperCase());
      let output = "";
      for (let i = 0; i < wrongLetters.length; i++) {
        output += wrongLetters[i] + " ";
        document.getElementById("guessedLetters").innerHTML = output;
      }
      startLife--;
      document.getElementById("status").innerHTML = "Wrong guess";

      document.getElementById("life").innerHTML = startLife;
    }

    //game ending check
    gameOverCheck();
  }

  //clear input
  document.getElementById("guess").value = "";

  //update picture
  let img = document.getElementById("theMan");
  if (startLife == 6) {
    img.src = "assets/2.jpg";
  } else if (startLife == 5) img.src = "assets/3.jpg";
  else if (startLife == 4) img.src = "assets/4.jpg";
  else if (startLife == 3) img.src = "assets/5.jpg";
  else if (startLife == 2) img.src = "assets/6.jpg";
  else if (startLife == 1) img.src = "assets/7.jpg";
  else if (startLife == 0) img.src = "assets/8.jpg";
}
