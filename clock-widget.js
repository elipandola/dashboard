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

  // Resolver elemento: acepta selector '#id' o id sin '#'
  let container = null;
  if (typeof containerSelector === 'string') {
    try { container = document.querySelector(containerSelector); } catch (e) { container = null; }
    if (!container) {
      const idName = containerSelector.replace(/^#/, '');
      container = document.getElementById(idName);
    }
  } else if (containerSelector instanceof HTMLElement) {
    container = containerSelector;
  }

  if (!container) {
    console.warn('mountClockWidget: contenedor no encontrado para', containerSelector);
    return null;
  }

  // Generar hora estática en el momento de la invocación (MVP Iteración 1)
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  // Inyectar HTML simple (Iteración 1 - solo hora y minuto)
  container.innerHTML = `
    <div class="clock-container">
      <div class="clock-display">${hours}:${minutes}</div>
    </div>
  `;

  return {
    // No hay interval que limpiar en la iteración 1, pero se devuelve un handle mínimo
    destroy() { /* noop for MVP */ }
  };
}

// Exponer en window para uso directo
window.mountClockWidget = mountClockWidget;