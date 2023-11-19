import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css'

const btnStart = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (options.defaultDate >= selectedDates[0]) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            Notiflix.Notify.success('You can press "Start"');
            btnStart.disabled = false;
        }
    },
};

flatpickr('#datetime-picker', options);
btnStart.addEventListener('click', startTimer);

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


/**
 * 
 * @param {number} value - число (наприклад 4)
 * @returns {string} - відформатоване значення під формат xx:xx:xx:xx, для додавання до HTML сторінки (наприклад 04)
 */
const addLeadingZero = value => value.toString().padStart(2, "0");

function startTimer() {
    btnStart.disabled = true;
    input.disabled = true;

    const timer = setInterval(() => {
        const currentDate = new Date();
        const targetDate = new Date(input.value);
        const timeDiff = targetDate - currentDate;

        const { days, hours, minutes, seconds } = convertMs(timeDiff);

        day.textContent = addLeadingZero(days);
        hour.textContent = addLeadingZero(hours);
        minute.textContent = addLeadingZero(minutes);
        second.textContent = addLeadingZero(seconds);

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(timer);
            btnStart.disabled = false;
            input.disabled = false;
        }
    }, 1000);
}