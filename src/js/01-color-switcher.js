function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const ref = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  timerId: null,
};

const changeBgColor = color => (ref.body.style.background = color);

const handleClickStart = e => {
  ref.timerId = setInterval(() => changeBgColor(getRandomHexColor()), 1000);
  e.target.disabled = true;
};

const handleClickStop = e => {
  ref.startBtn.disabled = false;
  if (!ref.timerId) return;
  clearInterval(ref.timerId);
};

ref.startBtn.addEventListener('click', handleClickStart);
ref.stopBtn.addEventListener('click', handleClickStop);
