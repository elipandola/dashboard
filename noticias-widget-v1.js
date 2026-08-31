/*
 * Widget: Noticias
 * ----------------
 * Iteración 1 : bloque con título fijo "Noticias" con una noticia simulada (datos "hardcoded", sin red todavía).
 * 
 * Uso, desde index.html:
 *   <script src="noticias-widget-v1.js"></script>
 *   <script> mountNewsWidget('widget-1'); </script>
 */

function mountNewsWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`No se encontró el contenedor #${containerId}`);
    return;
  }

  container.innerHTML = `
    <span class="tag">Noticas</span>
    <div class="noticias">
      <h3>Gobierno de Rodrigo Paz define medidas ante crisis de combustibles y caso Cerimedo-Beller</h3>
    </div>
     `;
}