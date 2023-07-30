import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formEl = document.querySelector(`.form`);

formEl.addEventListener(`submit`, startCreate);

function startCreate(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  const inputValues = {
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  };

  if (inputValues.delay < 0 || inputValues.step < 0 || inputValues.amout <= 0) {
    return Notiflix.Report.failure(`❌Pick integral values only`);
  }
  let promDelay = inputValues.delay;
  for (let i = 1; i <= inputValues.amount; i += 1) {
    createPromise(i, inputValues.delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    inputValues.delay += inputValues.step;
    event.currentTarget.reset();
  }
}
