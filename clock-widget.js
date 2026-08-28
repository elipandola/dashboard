/**
 * Widget: Reloj digital
 * ---------------------
 * Monta un reloj digital estático con la hora actual del sistema.
 *
 * Uso, desde index.html:
 *   <script src="clock-widget.js"></script>
 *   <script> mountClockWidget('widget-05'); </script>
 *
 * @param {string} containerId - ID del contenedor donde se montará el widget.
 */
function mountClockWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`No se encontró el contenedor #${containerId}`);
    return;
  }

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  container.innerHTML = `
    <span class="tag">RELOJ DIGITAL</span>
    <div class="clock-display">${hours}:${minutes}:${seconds}</div>
  `;
}