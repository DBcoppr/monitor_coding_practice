let hrInp = document.getElementById("hourInp");
let minInp = document.getElementById("minInp");
let secInp = document.getElementById("secInp");
let resetBtn = document.getElementById("resetBtn");
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
var timeId = null;

var isTimeout = () =>
  hrInp.value == 0 || minInp.value == 0 || secInp.value == 0;

function startTimer(cb) {
  startBtn.style.display = "none";
  stopBtn.style.display = "initial";
  timeId = setInterval(cb, 1000);
}

function stopTimer(state) {
  startBtn.innerText = state === "pause" ? "continue" : "start";
  startBtn.style.display = "initial";
  stopBtn.style.display = "none";
  clearInterval(timeId);
}

function timeShow() {
  if (hrInp.value == 0 && minInp.value == 0 && secInp.value == 0) {
    hrInp.value = "";
    minInp.value = "";
    secInp.value = "";
    stopTimer();
  }
  if (secInp.value > 60) {
    minInp.value += 1;
    secInp.value = secInp.value % 60;
  }
  if (minInp.value > 60) {
    hourInp.value += 1;
    minInp.value = minInp.value % 60;
  }
  if (secInp.value > 0) {
    secInp.value =
      secInp.value > 10 ? secInp.value - 1 : `0${secInp.value - 1}`;
  } else if (minInp.value > 0 && secInp.value == 0) {
    minInp.value =
      minInp.value > 10 ? minInp.value - 1 : `0${minInp.value - 1}`;
    secInp.value = "60";
  } else if (hrInp.value > 0 && minInp.value == 0) {
    hrInp.value = hrInp.value > 10 ? hrInp.value - 1 : `0${hrInp.value - 1}`;
    minInp.value = "60";
  }
}

startBtn.addEventListener("click", () => {
  if (hrInp.value && minInp.value && secInp.value) return;
  if (!(hrInp.value || minInp.value || secInp.value)) return;
  startBtn.style.display = "none";
  stopBtn.style.display = "initial";
  startTimer(timeShow);
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  hrInp.value = "";
  secInp.value = "";
  minInp.value = "";
});

stopBtn.addEventListener("click", () => {
  stopBtn.style.display = "none";
  stopTimer("pause");
});
