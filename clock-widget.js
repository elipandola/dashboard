let timerId = null;

function mountClockWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  container.innerHTML = `
    <span class="tag">RELOJ DIGITAL</span>
    <div class="clock-content">
      <h1 class="clock-display" aria-live="polite">
        <span class="clock-time"></span><span class="clock-meridiem"></span>
      </h1>
      <button class="clock-toggle" type="button">Cambiar a 24h</button>
    </div>
  `;

  const clock = container.querySelector('.clock-time');
  const meridiemDisplay = container.querySelector('.clock-meridiem');
  const toggle = container.querySelector('.clock-toggle');
  let format = '12';

  function updateClock() {
    const now = new Date();
    const hours24 = now.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const hours = String(format === '24' ? hours24 : hours12).padStart(2, '0');

    clock.textContent = `${hours}:${minutes}:${seconds}`;
    meridiemDisplay.textContent = format === '12'
      ? (hours24 < 12 ? 'AM' : 'PM')
      : '';
    toggle.textContent = `Cambiar a ${format === '24' ? '12h' : '24h'}`;
  }

  if (timerId !== null) {
    clearInterval(timerId);
  }

  toggle.addEventListener('click', () => {
    format = format === '24' ? '12' : '24';
    updateClock();
  });

  updateClock();
  timerId = setInterval(updateClock, 1000);
}
