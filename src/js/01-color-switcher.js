function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtnEl = document.querySelector(`button[data-start]`);
const stopBtnEl = document.querySelector(`button[data-stop]`);

startBtnEl.addEventListener(`click`, startSwitch);
stopBtnEl.addEventListener(`click`, stopSwitch);

function startSwitch() {
  startBtnEl.disabled = true;

  const timerId = setInterval(() => {
    document.querySelector(`body`).style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopSwitch() {
  startBtnEl.disabled = false;

  clearInterval(timerId);
}
