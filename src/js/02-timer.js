import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('button[data-start]');
let newObjectDate = {};

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

        const valueForConvert = chooseDate - todayDay;
        newObjectDate = convertMs(valueForConvert);
        console.log(newObjectDate);
        return newObjectDate;
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

// {days: 1, hours: 23, minutes: 59, seconds: 26}
function startTimer() {
    const day = newObjectDate.days;
    const hour = newObjectDate.hours;
    const minute = newObjectDate.minutes;
    const second = newObjectDate.seconds;


    days.textContent = day
        .toString()
        .padStart(2, "0");
    hours.textContent = hour
        .toString()
        .padStart(2, "0");
    minutes.textContent = minute
        .toString()
        .padStart(2, "0");
    seconds.textContent = second
        .toString()
        .padStart(2, "0");
}
