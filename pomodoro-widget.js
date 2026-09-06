function mountPomodoroWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`No se encontró el contenedor #${containerId}`);
    return;
  }

  let totalSeconds = 25 * 60;
  let timerId = null;

  container.innerHTML = `
    <span class="tag">Pomodoro</span>

    <div class="pomodoro">

      <div class="pomodoro-circle">
        <span class="pomodoro-time">25:00</span>
      </div>

      <div class="pomodoro-actions">
        <button class="pomodoro-btn" data-action="start">
          <span class="pomodoro-play">▶</span>
          Iniciar
        </button>
      </div>

    </div>
  `;

  const timeEl = container.querySelector('.pomodoro-time');
  const startBtn = container.querySelector('[data-action="start"]');

  function renderTime() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const minutesText = String(minutes).padStart(2, '0');
    const secondsText = String(seconds).padStart(2, '0');

    timeEl.textContent = `${minutesText}:${secondsText}`;
  }

  function startTimer() {
    if (timerId !== null || totalSeconds === 0) {
      return;
    }

    startBtn.disabled = true;

    timerId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        renderTime();
      }

      if (totalSeconds === 0) {
        clearInterval(timerId);
        timerId = null;
      }
    }, 1000);
  }

  startBtn.addEventListener('click', startTimer);

  renderTime();
}