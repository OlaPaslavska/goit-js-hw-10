// Імпортуємо flatpickr і iziToast.

import flatpickr from "flatpickr";
import iziToast from "izitoast";

// Оголошуємо змінні для елементів DOM і функцій.


const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.getElementById('start-timer');
const timerElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

let countdownInterval;
// addLeadingZero форматує числа з менше ніж двох цифр, додаючи 0 спереду.
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// convertMs перетворює мілісекунди в дні, години, хвилини та секунди.
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
// updateTimerUI оновлює інтерфейс таймера з використанням значень днів, годин, хвилин і секунд.
function updateTimerUI(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  timerElements.days.textContent = addLeadingZero(days);
  timerElements.hours.textContent = addLeadingZero(hours);
  timerElements.minutes.textContent = addLeadingZero(minutes);
  timerElements.seconds.textContent = addLeadingZero(seconds);
}
// startTimer запускає таймер зворотного відліку до обраної дати, оновлюючи інтерфейс кожну секунду.
function startTimer(targetDate) {
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      updateTimerUI(0);
      iziToast.success({
        title: 'Timer Finished!',
        message: 'The countdown has ended.'
      });
      datetimePicker.disabled = false;
      startBtn.disabled = false;
    } else {
      updateTimerUI(distance);
    }
  }, 1000);
}
// flatpickr налаштовує поле вибору дати, обмежує вибір майбутніх дат і показує помилку, якщо користувач обрав минулу дату.
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  minDate: "today",
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      iziToast.error({
        title: 'Error!',
        message: 'Please choose a future date.',
        position: 'topCenter'
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  }
});
// Обробник подій для кнопки startBtn запускає таймер, вимикає поля вводу і кнопку Start, оновлює інтерфейс таймера, і відображає повідомлення, коли таймер завершується.
startBtn.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(datetimePicker.value);
  datetimePicker.disabled = true;
  startBtn.disabled = true;
  startTimer(selectedDate);
});




