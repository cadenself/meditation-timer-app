const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const musicToggle = document.getElementById("music-toggle");
const backgroundMusic = document.getElementById("background-music");

let countdown;
let totalSeconds = 10 * 60; // 10 minutes default
let remainingSeconds = totalSeconds;
let isRunning = false;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;

  countdown = setInterval(() => {
    if (remainingSeconds <= 0) {
      clearInterval(countdown);
      isRunning = false;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      alert("🧘 Session Complete! Namaste 🙏");
      if(musicToggle.checked) backgroundMusic.pause();
      remainingSeconds = totalSeconds;
      updateTimerDisplay();
      return;
    }
    remainingSeconds--;
    updateTimerDisplay();
  }, 1000);

  if(musicToggle.checked) backgroundMusic.play();
}

function pauseTimer() {
  if(!isRunning) return;
  clearInterval(countdown);
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  if(musicToggle.checked) backgroundMusic.pause();
}

function resetTimer() {
  clearInterval(countdown);
  isRunning = false;
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  if(musicToggle.checked) backgroundMusic.pause();
}

// Music toggle control
musicToggle.addEventListener("change", () => {
  if(musicToggle.checked && isRunning) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
});

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialize display on page load
updateTimerDisplay();
