/**
 * References Object
 *
 * @type {{ body: HTMLElement | null; startBtn: HTMLElement | null; stopBtn: HTMLElement | null; }}
 *  @property {HTMLElement} body - HTML Element body
 * @property {HTMLElement} startBtn - HTML Element Button Start
 * @property {HTMLElement} stopBtn -HTML Element Button Stop
 */
const ref = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

/**
 * Initial timer ID
 *
 * @type {number | null}
 *
 */
let timerId = null;
/**Disabled stop button */
changeStatusBtn(ref.stopBtn);
// Event listeners
/**Start Button */
ref.startBtn.addEventListener('click', handleClickStart);
/**Stop Button */
ref.stopBtn.addEventListener('click', handleClickStop);

// FUNCTIONS
//----------------------------------------------
/**
 * Change body background color
 *
 * @param {string} color
 *
 */
function changeBgColor(color) {
  if (typeof color !== 'string') return;
  ref.body.style.background = color;
}
//----------------------------------------------
/**
 * Random hexadecimal color
 *
 * @returns {string}  hexadecimal color
 *
 * @example
 * console.log(getRandomHexColor());
 * //Logs: '#5a42ef'
 *
 */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
//----------------------------------------------
/**
 * Handler click-event on start button. After click disabled start button and enabled stop button. Every 1 second change background color in body
 *
 * @param {Event} e click-event
 */
function handleClickStart(e) {
  changeStatusBtn(e.target);
  changeStatusBtn(ref.stopBtn);
  timerId = setInterval(() => changeBgColor(getRandomHexColor()), 1000);
}

//----------------------------------------------
/**
 * Handler click-event on stop button. After click enabled start button and disabled stop button.
 *
 * @param {Event} e click-event
 */
function handleClickStop(e) {
  changeStatusBtn(e.target);
  changeStatusBtn(ref.startBtn);
  if (!timerId) return;
  clearInterval(timerId);
}
//----------------------------------------------
/**
 * Change disabled status in button element
 *
 * @param {HTMLElement} element
 */
function changeStatusBtn(element) {
  element.disabled = !element.disabled;
}
