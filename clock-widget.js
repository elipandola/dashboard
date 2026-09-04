let timerId = null;

function mountClockWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  container.innerHTML = `
    <span class="tag">RELOJ DIGITAL</span>
    <div class="clock-content"><h1></h1></div>
  `;

  const clock = container.querySelector('.clock-content h1');

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    clock.textContent = `${hours}:${minutes}`;
  }

  if (timerId !== null) {
    clearInterval(timerId);
  }

  updateClock();
  timerId = setInterval(updateClock, 1000);
}
