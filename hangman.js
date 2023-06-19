let startLife = 7;
let chosenWord = "";
let fakeString = "";
let guessedLetters = [];
let wrongLetters = [];
window.onload = function () {
  init();
};
function onRefresh() {
  init();
}
function init() {
  let img = document.getElementById("theMan");
  img.src = "assets/1.PNG";
  wrongLetters = [];
  document.getElementById("submit").disabled = false;
  document.getElementById("status").innerHTML = "";
  startLife = 7;
  document.getElementById("life").innerHTML = startLife;
  chosenWord = "";
  fakeString = "";
  guessedLetters = [];
  document.getElementById("guessedLetters").innerHTML = "";
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
  ];
  let randomIndex = Math.floor(Math.random() * wordBank.length);
  chosenWord = wordBank[randomIndex];

  // fake string for display
  fakeString = "";
  for (let i = 0; i < chosenWord.length; i++) {
    fakeString += " * ";
  }
  document.getElementById("fakeString").innerHTML = fakeString;
}
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}
function isLetter(str) {
  let s = str.toLowerCase();
  return s.length === 1 && s.match(/[a-z]/i);
}
function guessSubmit() {
  let guess = document.getElementById("guess").value.toLowerCase();
  if (!isLetter(guess)) {
    document.getElementById("status").innerHTML =
      "Please only enter a letter between a-z";
    document.getElementById("guess").value = "";

    return;
  }

  if (guess == false) {
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
          fakeString = setCharAt(fakeString, 1 + i * 3, guess);
        }
      }
      document.getElementById("status").innerHTML = "Good guess! Keep it up!";
      document.getElementById("fakeString").innerHTML = fakeString;
    }
    //wrong guess
    else {
      wrongLetters.push(guess);
      let output = "";
      for (let i = 0; i < wrongLetters.length; i++) {
        output += wrongLetters[i] + " ";
        document.getElementById("guessedLetters").innerHTML = output;
      }
      startLife--;
      document.getElementById("status").innerHTML = "Wrong guess. Try again";

      document.getElementById("life").innerHTML = startLife;
    }

    //game ending check
    if (startLife == 0) {
      document.getElementById("status").innerHTML = "You Lost.";
      document.getElementById("submit").disabled = true;
    }
    if (!fakeString.includes("*")) {
      document.getElementById("status").innerHTML = "You Won";
      document.getElementById("submit").disabled = true;
    }
  }

  //clear input
  document.getElementById("guess").value = "";

  //update picture
  let img = document.getElementById("theMan");
  if (startLife == 6) {
    img.src = "assets/2.PNG";
  } else if (startLife == 5) img.src = "assets/3.PNG";
  else if (startLife == 4) img.src = "assets/4.PNG";
  else if (startLife == 3) img.src = "assets/5.PNG";
  else if (startLife == 2) img.src = "assets/6.PNG";
  else if (startLife == 1) img.src = "assets/7.PNG";
  else if (startLife == 0) img.src = "assets/8.PNG";
}
