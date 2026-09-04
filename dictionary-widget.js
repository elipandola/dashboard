/**
 * Widget 4: Diccionario en inglés
 */
function mountDictionaryWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`No se encontró el contenedor #${containerId}`);
    return;
  }

  // Estructura de la Iteración 1 con input, botón y visualización estática
  container.innerHTML = `
    <span class="tag">DICCIONARIO</span>
    <div class="dict-container">
      <div class="dict-search-box">
        <input 
          type="text" 
          id="dict-input" 
          class="dict-input" 
          maxlength="50" 
          placeholder="Buscar palabra..." 
          autocomplete="off"
        >
        <button id="dict-btn" class="dict-btn" type="button">Buscar</button>
      </div>

      <div class="dict-result" id="dict-result">
        <div class="word-header">
          <h3 class="word-title">Developer</h3>
          <span class="word-type">noun</span>
        </div>
        <p class="word-definition">
          A person that develops software or multimedia applications.
        </p>
      </div>
    </div>
  `;

  const input = container.querySelector('#dict-input');
  const btn = container.querySelector('#dict-btn');
  const wordTitle = container.querySelector('.word-title');

  // Función para manejar la acción de búsqueda
  function triggerSearch() {
    const term = input.value.trim();
    if (term) {
      wordTitle.textContent = term; // Actualización visual básica
    }
  }

  // Evento para clic en el botón
  btn.addEventListener('click', triggerSearch);

  // Evento para activar búsqueda con tecla Enter
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      triggerSearch();
    }
  });
}