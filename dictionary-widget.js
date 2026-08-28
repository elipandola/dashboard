/**
 * Widget 4: Diccionario en inglés (Iteración 1)
 */
function mountDictionaryWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`No se encontró el contenedor #${containerId}`);
    return;
  }


  container.innerHTML = `
    <span class="tag">Diccionario inglés</span>
    <div class="dictionary-box">
      <div class="word-header">
        <h3 class="word-title">Developer</h3>
        <span class="word-type">noun</span>
      </div>
      <ul class="word-definitions">
        <li>A person that develops software or multimedia applications.</li>
        <li>A person or entity that creates or enhances something.</li>
      </ul>
    </div>
  `;
}