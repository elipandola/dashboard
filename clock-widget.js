function mountClockWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  container.innerHTML = `
    <span class="tag">RELOJ DIGITAL</span>
    <div class="clock-content"><h1>${hours}:${minutes}</h1></div>
  `;
}
