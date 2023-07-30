import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnEl = document.querySelector(`button[data-start]`);
const selectEl = document.querySelector(`input[type="text"]`);
const timerEl = {
  days: document.querySelector(`span[data-days]`),
  hours: document.querySelector(`span[data-hours]`),
  minutes: document.querySelector(`span[data-minutes]`),
  seconds: document.querySelector(`span[data-seconds]`),
};

startBtnEl.disabled = true;
let pickedDate;
let dateDiff;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(`input[type="text"]`, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Report.failure(
        'Wrong Date',
        'Please choose a date in the future',
        'Okay'
      );
      return;
    }
    startBtnEl.disabled = false;
    pickedDate = selectedDates[0];
  },
});

function timerCount() {
  selectEl.disabled = true;
  dateDiff = pickedDate - new Date();
  timerEl.days.textContent = `${convertMs(dateDiff).days}`.padStart(2, '0');
  timerEl.hours.textContent = `${convertMs(dateDiff).hours}`.padStart(2, '0');
  timerEl.minutes.textContent = `${convertMs(dateDiff).minutes}`.padStart(
    2,
    '0'
  );
  timerEl.seconds.textContent = `${convertMs(dateDiff).seconds}`.padStart(
    2,
    '0'
  );
  if (dateDiff === 0) {
    clearInterval(timerId);
  }
}

startBtnEl.addEventListener(`click`, startTimer);

function startTimer() {
  const timerId = setInterval(timerCount, 1000);
}
