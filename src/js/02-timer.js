import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
let newObjectDate = {}; // створення пустого об'єкта для отримання вибранної дати

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const chooseDate = selectedDates[0].getTime();
        const todayDay = options.defaultDate.getTime();

        if (todayDay > chooseDate) {
            alert('Please choose a date in the future');
        } else {
            btnStart.disabled = false;
        }

        const valueForConvert = chooseDate - todayDay; // різниця в мілісекундах

        newObjectDate = convertMs(valueForConvert);

        console.log(newObjectDate);
    },
};

flatpickr('#datetime-picker', options);

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

btnStart.addEventListener('click', startTimer);

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

/**
 * 
 * @param {number} value - число (наприклад 4)
 * @returns {string} - відформатоване значення під формат xx:xx:xx:xx, для додавання до HTML сторінки (наприклад 04)
 */
const addLeadingZero = value => value.toString().padStart(2, "0");

function startTimer() {
    btnStart.disabled = true;
    input.disabled = true;

    // targetDate - представляє майбутню дату та час
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + newObjectDate.days);
    targetDate.setHours(targetDate.getHours() + newObjectDate.hours);
    targetDate.setMinutes(targetDate.getMinutes() + newObjectDate.minutes);
    targetDate.setSeconds(targetDate.getSeconds() + newObjectDate.seconds);

    const timer = setInterval(() => {
        const currentDate = new Date();
        const timeDiff = targetDate - currentDate;

        const day = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hour = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minute = Math.floor((timeDiff / 1000 / 60) % 60);
        const second = Math.floor((timeDiff / 1000) % 60);

        days.textContent = addLeadingZero(day);
        hours.textContent = addLeadingZero(hour);
        minutes.textContent = addLeadingZero(minute);
        seconds.textContent = addLeadingZero(second);

        if (day === 0 && hour === 0 && minute === 0 && second === 0) {
            clearInterval(timer);
            return;
        }
    }, 1000);
}