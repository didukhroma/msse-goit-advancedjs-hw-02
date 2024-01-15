// Описаний в документації
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';
// Refs
const refs = {
  inputDateRef: document.querySelector('#datetime-picker'),
  btnStartRef: document.querySelector('[data-start]'),
  timerRef: document.querySelector('.timer'),
};
// Timer time
let timerMs = null;
// Settings for iziToast
iziToast.settings({
  iconUrl: './img/warning-icon.png',
  message: 'Please choose a date in the future',
  timeout: 2000,
  position: 'topCenter',
  backgroundColor: 'red',
});

// Options for flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let dateDiff = selectedDates[0] - this.now;
    if (dateDiff <= 0) {
      iziToast.show();
    } else {
      timerMs = dateDiff;
      enableStartBtn();
    }
  },
};
// Logic
disableStartBtn();
flatpickr(refs.inputDateRef, options);
refs.btnStartRef.addEventListener('click', handleClickStart);
//functions
//------------------------
function handleClickStart(e) {
  disableStartBtn();
  changeData(convertMs(timerMs));
  let timerId = setInterval(() => {
    timerMs -= 1000;
    if (timerMs <= 0) clearInterval(timerId);
    changeData(convertMs(timerMs));
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  let strValue = String(value);
  return strValue.length > 1 ? strValue : strValue.padStart(2, '0');
}

function disableStartBtn() {
  refs.btnStartRef.disabled = true;
}
function enableStartBtn() {
  refs.btnStartRef.disabled = false;
}

function changeData(data) {
  // all spans from html with class value
  const timerSpanArray = Array.from(refs.timerRef.children)
    .flatMap(el => [...el.children])
    .filter(el => el.classList.contains('value'));
  // find needed span and change text from data
  Object.keys(data).forEach(el => {
    timerSpanArray.find(span =>
      Object.keys(span.dataset).includes(el)
    ).textContent = addLeadingZero(data[el]);
  });
}
