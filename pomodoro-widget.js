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

        <button
          class="pomodoro-btn pomodoro-btn-secondary"
          data-action="reset"
          disabled
        >
          Reiniciar
        </button>

      </div>

    </div>
  `;

  const timeEl = container.querySelector('.pomodoro-time');
  const startBtn = container.querySelector('[data-action="start"]');
  const resetBtn = container.querySelector('[data-action="reset"]');

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

    // Reiniciar se habilita solamente después de iniciar
    resetBtn.disabled = false;

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

  function resetTimer() {

    // Detiene el contador actual
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }

    // Regresa a 25 minutos
    totalSeconds = 25 * 60;

    renderTime();

    // Vuelve a iniciar automáticamente
    startTimer();
  }

  startBtn.addEventListener('click', startTimer);
  resetBtn.addEventListener('click', resetTimer);

  renderTime();
}