let boxesToOpen = 2
let timeToOpen = 2
let clicked = 0
let openedBox = 0
let darkMode = false
let openDelay = 1000
var snd = new Audio("assets/sound/shake.wav");
var opensnd = new Audio("assets/sound/boxOpenSound.mp3");
var tada = new Audio("assets/sound/finalSound.mp3")
var stunned = new Audio("assets/sound/tooStunned.mp3")
var encouragement = new Audio("assets/sound/encourage/1.mp3")
const modal = document.getElementById("video-container")
const text = document.getElementById("text")
const vid = document.getElementById("video")
const root = document.getElementById('root');
const main = document.getElementById('main-container');
const closed = document.getElementById("box-close");
const opened = document.getElementById("box-open");
const openMore = document.getElementById("boxesNot");
const clicksMore = document.getElementById("boxesClick");
function openBox() {
  if (Math.floor(Math.random() * 10) <= 1) {playEncouragement()}
  if (clicked < timeToOpen - 1) {
    clicked += 1
    clicksMore.innerHTML = "Clicks to open this box: " + (timeToOpen - clicked)
    closed.style.animation = "shake 0.5s linear";
    snd.play();
    setTimeout(function () {closed.style.animation = "none";}, 500);
  } else {
    clicked = timeToOpen
    closed.style.animation = "shake 0.5s linear";
    clicksMore.innerHTML = "Clicks to open this box: " + (timeToOpen - clicked)
    snd.play();
    closed.style.display = "none";
    opened.classList.remove("hidden");
    openMore.innerHTML = "Boxes to open: " + (boxesToOpen - openedBox - 1)
    if ((openedBox + 1) == boxesToOpen) {
      opensnd.play()
      openDelay = 7000
      main.style.animation = "revealNewBox 7s linear";
    } else {
      tada.play()
      openDelay = 1000
      main.style.animation = "revealNewBox 1s linear";
    }
    openedBox += 1
    console.log("1")
    setTimeout(function () {
      main.style.animation = "moveBox 0.5s linear infinite";
      openMore.innerHTML = "Boxes to open: " + (boxesToOpen - openedBox)
      if (openedBox >= boxesToOpen) {
        if (Math.floor(Math.random() * 10) <= 1) {
          stunned.play();
          closed.style.animation = "none";
          opened.classList.add("hidden");
          openedBox = 0;
          clicked = 0;
          boxesToOpen = boxesToOpen * 4
          timeToOpen = timeToOpen * 4
          openMore.innerHTML = "Boxes to open: " + (boxesToOpen - openedBox)
          clicksMore.innerHTML = "Clicks to open this box: " + (timeToOpen - clicked)
        } else {
          modal.style.display = "block";
          vid.src = "assets/vid/" + Math.floor((Math.random()*4)+1) + ".mp4";
          vid.play()
          clicked = 0;
          setTimeout(function () {
            modal.style.display = "none";
            closed.style.animation = "none";
            opened.classList.add("hidden");
            openedBox = 0;
            boxesToOpen = boxesToOpen * 2
            timeToOpen = timeToOpen * 2
            openMore.innerHTML = "Boxes to open: " + (boxesToOpen - openedBox)
            clicksMore.innerHTML = "Clicks to open this box: " + (timeToOpen - clicked)
          }, 2000)
        }
      }
      closed.style.animation = "none";
      closed.style.display = "block";
      clicked = 0;
      opened.classList.add("hidden");
      clicksMore.innerHTML = "Clicks to open this box: " + (timeToOpen - clicked)
    }, openDelay);
  }
}

function toggleDarkMode () {
  darkMode = !darkMode;
  if (darkMode) {
    root.style.backgroundColor = "black";
    clicksMore.style.color = "white";
    openMore.style.color = "white";
    text.style.color = "white";
  } else {
    root.style.backgroundColor = "white";
    clicksMore.style.color = "black";
    openMore.style.color = "black";
    text.style.color = "black";
  }
}

function playEncouragement() {
  encouragement = new Audio("assets/sound/encourage/" + Math.floor((Math.random()*7)+1) + ".mp3")
  encouragement.play()
}