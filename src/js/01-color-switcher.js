const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let randomStylePage;

btnStart.addEventListener('click', startRandom);
btnStop.addEventListener('click', stopRandom);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function startRandom() {
    randomStylePage = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
        btnStart.disabled = true;
        btnStop.disabled = false;
    }, 1000);
}

function stopRandom() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(randomStylePage);
}