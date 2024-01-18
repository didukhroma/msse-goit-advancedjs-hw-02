import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

/**
 * Settings for iziToast
 *
 *  @type {{  timeout: number; position: string;  }}
 * @description Read more about iziToast settings at https://izitoast.marcelodolza.com/
 */
const iziToastSettings = {
  timeout: 50000,
  position: 'topRight',
  target: '.js-wrapper',
  targetFirst: false,
  maxWidth: 400,
};

/**
 *Reference Form
 * @type {HTMLElement} formRef - HTML Element Form
 */
const formRef = document.querySelector('.form');
/**iziToast base settings */
iziToast.settings(iziToastSettings);
// Event listeners
/**Form */
formRef.addEventListener('submit', handlerSubmit);

// FUNCTIONS
//----------------------------------------------

/**
 * After submit generate promises
 *
 * @param {Event} e submit-event
 */
function handlerSubmit(e) {
  e.preventDefault();
  const [startDelay, step, amount] = e.currentTarget.elements;
  const formData = {
    firstDelay: startDelay.value,
    step: step.value,
    amount: amount.value,
  };
  formRef.reset();
  let promiseIdx = 1;
  let delay = Number(formData.firstDelay);

  while (promiseIdx <= formData.amount) {
    createPromise(promiseIdx, delay)
      .then(({ position, delay }) =>
        iziToast.show({
          title: `✅ Fulfilled promise ${position} in ${delay}ms`,
          backgroundColor: 'green',
        })
      )
      .catch(({ position, delay }) =>
        iziToast.show({
          title: `❌ Rejected promise ${position} in ${delay}ms`,
          backgroundColor: 'red',
        })
      );

    promiseIdx += 1;
    delay += Number(formData.step);
  }
}

//----------------------------------------------

/**
 * Create  and return new Promise with position and delayed time
 *
 * @param {number} position position of new promise
 * @param {number} delay delay time of new promise
 * @returns {promise}
 */
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
