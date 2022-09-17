let sentenceSpan;

//appel a l'api
async function GetSentence() {
  const response = await fetch(`http://api.quotable.io/random`);
  const sentence = await response.json();

  randomSentence(sentence);
}
GetSentence();

const sentenceToWrite = document.querySelector(".sentence-to-write");
//Function pour gégérer une phrase alèatoire
function randomSentence(sentence) {
  sentence.content.split("").forEach((character) => {
    const spanCharacter = document.createElement("span");
    spanCharacter.textContent = character;
    sentenceToWrite.appendChild(spanCharacter);
  });
  sentenceSpan = sentenceToWrite.querySelectorAll(".sentence-to-write span");
}
sentenceSpan = sentenceToWrite.querySelectorAll(".sentence-to-write span");
const timecolor = document.querySelector(".time");
const timer = document.querySelector(".timer");
const scoreColor = document.querySelector(".score");
let timerdisplay;
const valueInitial = 60;
let chrono = 60;
let lockTime = true;
timer.textContent = chrono;
let scro = 0;

// fucntions pour le chronomètre
window.addEventListener("keydown", handleTimer);
function handleTimer(e) {
  if (chrono > 0 && e.keyCode != 27 && lockTime) {
    timecolor.classList.add("active");
    timerdisplay = setInterval(play, 1000);
    lockTime = false;
  }
  if (e.keyCode === 27) {
    clearInterval(timerdisplay);
    timer.textContent = valueInitial;
  }
}

function play() {
  if (!lockTime && chrono > 0) {
    chrono--;
    timer.textContent = chrono;
  } else {
    timer.textContent = chrono;
  }
  if (chrono === 0) {
    timecolor.classList.remove("active");
    scoreColor.classList.add("active");
    sentenceToWrite.textContent = `Fin de partie`;
    textArea.removeEventListener("input", vericationString);
  }
}

// Function pour recommencer
window.addEventListener("keydown", handleRestart);
function handleRestart(e) {
  if (e.keyCode === 27) {
    chrono = valueInitial;
    timecolor.classList.remove("active");
    scoreColor.classList.remove("active");
    lockTime = true;
    textArea.value = "";
    scro = 0;
    score.textContent = scro;
    sentenceToWrite.textContent = "";
    textArea.addEventListener("input", vericationString);
    GetSentence();
  }
}

const textArea = document.querySelector(".textarea-to-test");
const score = document.querySelector(".scoreNB");

textArea.addEventListener("input", vericationString);

// Function pour verifier le resultat et incrémenter le score
function vericationString() {
  let stringUser = textArea.value.split("");
  let stringCPU = sentenceToWrite.textContent.split("");

  let count = 0;

  for (let i = 0; i < sentenceSpan.length; i++) {
    if (stringUser[i] === undefined) {
      sentenceSpan[i].className = "";
    } else if (stringUser[i] === sentenceSpan[i].textContent) {
      sentenceSpan[i].classList.add("right");
      sentenceSpan[i].classList.remove("wrong");
      count++;
    } else {
      sentenceSpan[i].classList.add("wrong");
      sentenceSpan[i].classList.remove("right");
    }
    score.textContent = count;
  }

  score.textContent = scro + count;
  if (textArea.value.length === stringCPU.length) {
    sentenceToWrite.textContent = "";
    scro += count;
    textArea.value = "";
    score.textContent = scro;
    GetSentence();
  }
}
