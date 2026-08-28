/*
 * Widget: Reloj digital
 * ---------------------
 * Monta un reloj digital que soporta formato 12h/24h y actualiza cada segundo.
 * Uso desde index.html:
 *   <script src="clock-widget.js"></script>
 *   <script> mountClockWidget('#widget-05'); </script>
 *
 * La función acepta un selector CSS (ej. '#widget-05', '.mi-clase') o un id
 * sin prefijo (ej. 'widget-05' o 'widget-5'). Devuelve un objeto con método
 * `destroy()` para limpiar el interval si es necesario.
 */

function mountClockWidget(containerSelector) {
  if (!containerSelector) return null;

  // Resolver el elemento objetivo (acepta '#id', 'id' o un elemento DOM)
  let container = null;
  if (typeof containerSelector === 'string') {
    // Preferir querySelector para selectores CSS válidos
    try { container = document.querySelector(containerSelector); } catch (e) { container = null; }

    if (!container) {
      // Si se pasó un id como '#widget-05' o 'widget-05', intentar alternativas
      const idName = containerSelector.replace(/^#/, '');
      container = document.getElementById(idName) || document.getElementById(idName.replace(/([a-zA-Z-_]+)0+(\d+)$/, '$1$2'));
    }
  } else if (containerSelector instanceof HTMLElement) {
    container = containerSelector;
  }

  if (!container) {
    console.warn('mountClockWidget: contenedor no encontrado para', containerSelector);
    return null;
  }

  // HTML base del widget
  container.innerHTML = `
    <div class="clock-container">
      <div class="clock-display" aria-live="polite">--:--:--</div>
      <div class="clock-controls">
        <button type="button" class="clock-toggle" aria-pressed="false" title="Alternar 12/24 horas">24h</button>
      </div>
    </div>
  `;

  const display = container.querySelector('.clock-display');
  const toggle = container.querySelector('.clock-toggle');

  let format24 = true;
  let intervalId = null;

  function two(n){ return String(n).padStart(2, '0'); }

  function formatTime(date){
    const h24 = date.getHours();
    const m = two(date.getMinutes());
    const s = two(date.getSeconds());
    if (format24) {
      return `${two(h24)}:${m}:${s}`;
    }
    const ampm = h24 >= 12 ? 'PM' : 'AM';
    const h12 = h24 % 12 || 12;
    return `${two(h12)}:${m}:${s} ${ampm}`;
  }

  function update(){
    const now = new Date();
    if (display) display.textContent = formatTime(now);
  }

  // Inicializar y arrancar interval
  update();
  intervalId = setInterval(update, 1000);

  // Toggle formato 12/24
  if (toggle) {
    toggle.addEventListener('click', () => {
      format24 = !format24;
      toggle.textContent = format24 ? '24h' : '12h';
      toggle.setAttribute('aria-pressed', String(!format24));
      update();
    });
  }

  // Devolver handle para limpiar si es necesario
  return {
    destroy() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  };
}

// Exponer en window para usos simples en páginas sin módulos
window.mountClockWidget = mountClockWidget;