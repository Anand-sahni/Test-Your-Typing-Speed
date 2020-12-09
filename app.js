let time_text = document.querySelector(".static_time");
let words_text = document.querySelector(".static_wpm");
let wpm_group = document.querySelector(".wpm");
let input_box = document.querySelector(".inbox");
let content_text = document.querySelector(".content");
let restart_btn = document.querySelector(".restart");
let start_btn = document.querySelector(".start");

let time_left = 60;
let time_passed = 0;
let typed = 0;
let typed_text = "";
let timer = null;


function textInput() {
  input = input_box.value;
  input_array = input.split("");
  typed++;
  errors = 0;
  quoteSpanArray = content_text.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typed = input_array[index];
    if (typed == null) {
      char.classList.remove("correct");
    } else if (typed === char.innerText) {
      char.classList.add("correct");
    } else {
      errors++;
    }
  });
}

function ChangeContent() {
  content_text.textContent = null;
  typed_text = "You should write this in the inbox to check the speed of your typing. The typing skill can be improved by playing some typing game. The result of typing speed may vary if you already remembered the text which you are going to write in inbox.";
    typed_text.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    content_text.appendChild(charSpan);
  });
}


function updateTimer() {
  if (time_left > 0) {
    time_left--;
    time_passed++;
    time_text.textContent = time_left;
  } else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  input_box.disabled = true;
  content_text.style.display = "none";
  wpm = Math.round((typed / 5 / time_passed) * 60);
  words_text.textContent = wpm;
  wpm_group.style.display = "block";
}

function startGame() {
  content_text.style.display = "block";
  resetGame();
  ChangeContent();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetGame() {
  time_left = 60;
  time_passed = 0;
  typed = 0;
  input_box.disabled = false;
  input_box.value = "";
  content_text.textContent = "";
  time_text.textContent = time_left;
  restart_btn.style.display = "none";
  wpm_group.style.display = "none";
}
