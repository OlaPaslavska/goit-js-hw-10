import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const delay = parseInt(delayInput.value); // Затримка в мілісекундах

  const stateInput = document.querySelector('input[name="state"]:checked');
  const state = stateInput ? stateInput.value : null; // Стан: 'fulfilled' або 'rejected'

  // Створення нового промісу
  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else if (state === 'rejected') {
      setTimeout(() => reject(delay), delay);
    } else {
      // Якщо не обрано жодного стану, проміс не створюємо
      return;
    }
  });

  // Обробка результату промісу
  promise.then(
    (delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        timeout: 5000, // Показувати повідомлення 5 секунд
      });
    },
    (delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        timeout: 5000, // Показувати повідомлення 5 секунд
      });
    }
  );
});
