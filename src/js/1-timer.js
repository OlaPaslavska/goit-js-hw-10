// Імпортуємо flatpickr і iziToast.

import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "~flatpickr/dist/flatpickr.min.css";
import "~izitoast/dist/css/iziToast.min.css";
// Оголошуємо змінні для елементів DOM і функцій.


const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.getElementById('start-btn');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

// Функція для перевірки, чи дата є в майбутньому
function isValidFutureDate(selectedDate) {
  const currentDate = new Date();
  return selectedDate > currentDate;
}

// Функція для відображення часу залишку у форматі xx:xx:xx:xx
function formatTime(days, hours, minutes, seconds) {
  return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Функція для обрахунку залишку часу
function calculateTimeRemaining(endTime) {
  const total = Date.parse(endTime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

// Функція для активації / деактивації кнопки "Start"
function toggleStartButton(active) {
  startBtn.disabled = !active;
}

// Функція для обробки події початку відліку
function startCountdown() {
  const selectedDate = new Date(datetimePicker.value);
  
  if (!isValidFutureDate(selectedDate)) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      timeout: 5000
    });
    return;
  }

  toggleStartButton(false);

  countdownInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = calculateTimeRemaining(selectedDate);
    daysElement.textContent = days;
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
        timeout: 5000
      });
      toggleStartButton(true);
    }
  }, 1000);
}

// Ініціалізація flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (!isValidFutureDate(selectedDate)) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        timeout: 5000
      });
      toggleStartButton(false);
    } else {
      toggleStartButton(true);
    }
  },
});

// Обробник події натискання кнопки "Start"
startBtn.addEventListener('click', startCountdown);


