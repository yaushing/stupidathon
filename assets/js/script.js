let boxesToOpen = 2
let timeToOpen = 2
let clicked = 0
let openedBox = 0
let darkMode = false
var snd = new Audio("../sound/shake.wav");
const root = document.getElementById('root');
const main = document.getElementById('main-container');
const closed = document.getElementById("box-close");
const opened = document.getElementById("box-open");
const openMore = document.getElementById("boxesNot");
const clicksMore = document.getElementById("boxesClick");
function openBox() {
  if ((clicked + 1) < timeToOpen) {
    clicked += 1
    clicksMore.innerHTML = "Clicks to open this box: " + (timeToOpen - clicked)
    closed.style.animation = "shake 0.5s linear";
    snd.play();
    snd.currentTime = 0;
    setTimeout(function () {closed.style.animation = "none";}, 500);
  } else {
    closed.style.animation = "shake 0.5s linear";
    clicksMore.innerHTML = "Clicks to open this box: " + (timeToOpen - clicked)
    snd.play();
    snd.currentTime = 0;
    setTimeout(function () {
      closed.style.display = "none";
      opened.classList.remove("hidden");
      main.style.animation = "revealNewBox 5s linear";
      setTimeout(function () {
        main.style.animation = "moveBox 3s linear infinite alternate";
        openedBox += 1
        openMore.innerHTML = "Boxes to open: " + (boxesToOpen - openedBox)
        if (openedBox == boxesToOpen) {
          alert("CONGRATS!!!");
          closed.style.animation = "none";
          opened.classList.add("hidden");
          openedBox = 0;
          clicked = 0;
          boxesToOpen = boxesToOpen * 2
          timeToOpen = timeToOpen * 2
          openMore.innerHTML = "Boxes to open: " + (boxesToOpen - openedBox)
          clicksMore.innerHTML = "Clicks to open this box: " + (timeToOpen - clicked)
        }
        closed.style.animation = "none";
        closed.style.display = "block";
        clicked = 0;
        opened.classList.add("hidden");
        clicksMore.innerHTML = "Clicks to open this box: " + (timeToOpen - clicked)
      }, 5000);
    }, 500);
  }
}

function toggleDarkMode () {
  darkMode = !darkMode;
  if (darkMode) {
    root.style.backgroundColor = "black";
    clicksMore.style.color = "white";
    openMore.style.color = "white";
  } else {
    root.style.backgroundColor = "white";
    clicksMore.style.color = "black";
    openMore.style.color = "black";
  }
}