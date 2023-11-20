// import { Notify } from "notiflix";
import 'notiflix/dist/notiflix-3.2.6.min.css'

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitBtnClick);

function onSubmitBtnClick(event) {
  event.preventDefault();

  const form = event.target;

  let firstDelay = Number(form.elements.delay.value);
  const delayStep = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  for (let repeat = 1; repeat <= amount; repeat += 1) {
    createPromise(repeat, firstDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    firstDelay += delayStep;
  }

  form.reset();
}

function createPromise(position, delay) {
  const value = { position, delay };
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res(value)
      } else {
        rej(value);
      }
    }, delay);
  })
}

