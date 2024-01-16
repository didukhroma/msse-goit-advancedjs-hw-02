// Описаний в документації
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

/**
 * References Object
 *
 * @type {{ inputDateRef: HTMLElement | null; btnStartRef: HTMLElement | null; timerRef: HTMLElement | null; }}
 * @property {HTMLElement} inputDateRef - HTML Element Input where pick date
 * @property {HTMLElement} btnStartRef - HTML Element Button Start
 * @property {HTMLElement} timerRef -HTML Element where indicate timer
 *
};
 */
const refs = {
  inputDateRef: document.querySelector('#datetime-picker'),
  btnStartRef: document.querySelector('[data-start]'),
  timerRef: document.querySelector('.timer'),
};

/**
 * Initial time
 *
 * @type {number | null}
 *
 */
let timerMs = null;

/**
 * Settings for iziToast
 *
 * @type {{ title: string; message: string; timeout: number; position: string; backgroundColor: string; }}
 * @description Read more about iziToast settings at https://izitoast.marcelodolza.com/
 */
const settingsIziToast = {
  title: 'X',
  message: 'Please choose a date in the future',
  timeout: 2000,
  position: 'topCenter',
  backgroundColor: 'red',
};
/**
 * Options for flatpickr
 *
 * @type {{ enableTime: boolean; time_24hr: boolean; defaultDate: string; minuteIncrement: number; onClose(selectedDates: string): func; }}
 * @description Read more about flatpickr options at https://flatpickr.js.org/
 *
 */
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
      changeDisabledStatus(refs.btnStartRef);
    }
  },
};

/**iziToast base settings */
iziToast.settings(settingsIziToast);
/**Disabled start button */
changeDisabledStatus(refs.btnStartRef);
/**flatpickr base settings */
flatpickr(refs.inputDateRef, options);

// Event listeners
/**Start Button */
refs.btnStartRef.addEventListener('click', handleClickStart);

// FUNCTIONS
//----------------------------------------------
/**
 * Handler click-event on start button. After click disabled input and disabled start button. Every 1 second change time
 *
 * @param {*} e click-event
 */
function handleClickStart(e) {
  changeDisabledStatus(refs.inputDateRef);
  changeDisabledStatus(refs.btnStartRef);
  changeData(convertMs(timerMs));
  let timerId = setInterval(() => {
    timerMs -= 1000;
    if (timerMs <= 1000) {
      clearInterval(timerId);
      changeDisabledStatus(refs.inputDateRef);
    }
    changeData(convertMs(timerMs));
  }, 1000);
}
//----------------------------------------------

/**
 * Converting input miliseconds to object with properties days, hours, minutes and seconds
 *
 * @param {number} ms
 * @returns {{ days: number; hours: number; minutes: number; seconds: number; }}
 */
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
//----------------------------------------------

/**
 * Converting input value to string and if number less than 10 add before value symbol 0. If typeof value !== number function returns string "XX"
 *
 * @param {number} value
 * @returns {string}
 */
function addLeadingZero(value) {
  if (typeof value !== 'number') return 'XX';
  const strValue = String(value);
  return strValue.length > 1 ? strValue : strValue.padStart(2, '0');
}

//----------------------------------------------
/**
 * Change disabled status in HTML element
 *
 * @param {HTMLElement} element
 */
function changeDisabledStatus(element) {
  element.disabled = !element.disabled;
}

//----------------------------------------------
/**
 * Change data in HTML elements where indicate timer
 *
 * @param {object} data
 */
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
