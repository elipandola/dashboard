/**
 * Widget: Contador
 * -----------------
 * Este archivo es un ejemplo de cómo estructurar un widget en su propio
 * archivo JS e insertarlo dentro de uno de los contenedores del panel
 * (definidos en index.html como #widget-1 ... #widget-8).
 *
 * Uso, desde index.html:
 *   <script src="counter-widget.js"></script>
 *   <script> mountCounterWidget('widget-1'); </script>
 */

function mountCounterWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`No se encontró el contenedor #${containerId}`);
    return;
  }

  // Estado del widget
  let count = 0;

  // Reemplaza el contenido placeholder del widget por el markup real
  container.innerHTML = `
    <span class="tag">Contador</span>
    <div class="counter">
      <button class="counter-btn" data-action="decrement" aria-label="Restar">−</button>
      <span class="counter-value">0</span>
      <button class="counter-btn" data-action="increment" aria-label="Sumar">+</button>
    </div>
  `;

  const valueEl = container.querySelector('.counter-value');
  const buttons = container.querySelectorAll('.counter-btn');

  function render() {
    valueEl.textContent = count;
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      count = action === 'increment' ? count + 1 : count - 1;
      render();
    });
  });

}
