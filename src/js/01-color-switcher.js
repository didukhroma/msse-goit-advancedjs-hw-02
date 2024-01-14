const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

const ref = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let timerId = null;

const changeBgColor = color => (ref.body.style.background = color);

const handleClickStart = e => {
  e.target.disabled = true;
  timerId = setInterval(() => changeBgColor(getRandomHexColor()), 1000);
};

const handleClickStop = e => {
  ref.startBtn.disabled = false;
  if (!timerId) return;
  clearInterval(timerId);
};

ref.startBtn.addEventListener('click', handleClickStart);
ref.stopBtn.addEventListener('click', handleClickStop);
