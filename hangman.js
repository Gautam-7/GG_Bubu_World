const words = ["FOUNTAIN","TAJSKYLINE","SUNFLOWER","ABUDHABI","CHELSEA","OLDSONGS","JUJU",
    "ADORABLE","SUNDARI","CUTU","FOOTBALL","GAMBLE","LAUGHING","BROKENBED","AIRBNB",
    "AIRPORT","TOGETHER","ANNIVERSARY","WEDDING","TRIPS","VACATIONS","FUTURE","EFFORTS",
    "GOOGLEMEET","VIDEOCALL","CHATS","INSTAGRAM","SNAPCHAT","MEMORIES","CHURCHURNAAN",
    "QUACKY","TINGUMINGU","JERSEY","BOUQUET","CUDDLES","HUGS","KISSES","HILOCK","BUFFET",
    "FOOD","BALCONY","SLEEP","WATER","RING","PROPOSAL","DREAMS","REALITY","DOGS","KERALA",
    "AHMEDABAD","VADODARA","THRISSUR","DANCE","SMILE","HYDRANGEA","SUDOKU","LINKEDINGAMES",
    "DATE","PERFUME","BIRTHDAY","LOVE"];

let selectedWord = "";
let guessed = [];

function pickWord(){
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessed = [];
    guesses = 7;

    createWordBox();
    createAlphaBox();
}

function createWordBox() {
  const wordDiv = document.getElementById("word");
  wordDiv.innerHTML = "";

  for (let letter of selectedWord) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerText = "";
    wordDiv.appendChild(box);
  }

  updateWord();
}

function createAlphaBox() {
  const lettersDiv = document.getElementById("letters");
  lettersDiv.innerHTML = "";

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);

    const btn = document.createElement("div");
    btn.classList.add("letter");
    btn.innerText = letter;

    btn.onclick = () => guessLetter(letter, btn);
    lettersDiv.appendChild(btn);
  }
}

function updateWord() {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box, i) => {
    const letter = selectedWord[i];

    if (guessed.includes(letter)) {
      box.innerText = letter;
      box.classList.add("revealed");
    }
  });
}
function guessLetter(letter, btn) {
    if(guessed.includes(letter)) return;
    btn.classList.add("used");
    guessed.push(letter);

    if(!selectedWord.includes(letter)){
        guesses --;
        document.getElementById("message").innerText = `${guesses} guesses left!`;
    }
    updateWord();
    checkGame();
}

function checkGame() {
  const wordComplete = selectedWord
    .split("")
    .every(l => guessed.includes(l));

  if (wordComplete) {
    document.getElementById("message").innerText = "🎉 YOU WIN!";
    return;
  }

  if (guesses <= 0) {
    document.getElementById("message").innerText =
      `💀 YOU LOST! WORD WAS ${selectedWord}`;
  }
}
pickWord()
