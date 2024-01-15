import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Settings for iziToast
iziToast.settings({
  timeout: 3000,
  position: 'topRight',
});

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', handlerSubmit);

function handlerSubmit(e) {
  e.preventDefault();
  const formData = {
    firstDelay: e.currentTarget.elements.delay.value,
    step: e.currentTarget.elements.step.value,
    amount: e.currentTarget.elements.amount.value,
  };

  let promiseIdx = 1;
  let delay = Number(formData.firstDelay);
  while (promiseIdx <= formData.amount) {
    createPromise(promiseIdx, delay)
      .then(value =>
        iziToast.show({
          title: value,
          backgroundColor: 'green',
        })
      )
      .catch(error =>
        iziToast.show({
          title: error,
          backgroundColor: 'red',
        })
      );

    promiseIdx += 1;
    delay += Number(formData.step);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
