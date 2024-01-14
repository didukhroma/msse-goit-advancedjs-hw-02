// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDateRef: document.querySelector('#datetime-picker'),
  btnStartRef: document.querySelector('[data-start]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const choiceDate = selectedDates[0];
    console.log(this);

    alert('Please choose a date in the future');
  },
};

refs.btnStartRef.disabled = true;

flatpickr(refs.inputDateRef, options);

// console.log(refs);
