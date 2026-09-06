/*
 * Widget: Noticias
 * ----------------
 * Iteración 2: consume la API pública de GNews (https://gnews.io) para mostrar
 * el titular de noticias más reciente en español. Si la petición falla (sin
 * red, cuota agotada, CORS en producción, etc.) se muestra un titular de
 * respaldo para que el widget nunca quede vacío.
 *
 * Nota: el plan gratuito de GNews solo habilita CORS para localhost, así que
 * este widget debe probarse sirviendo el proyecto con un servidor local
 * (ej. `python -m http.server`), no abriendo index.html como file://.
 *
 * Todo lo de aquí adentro (IIFE) es privado a este archivo, excepto
 * `mountNewsWidget`, que se expone en window porque index.html la llama
 * directamente. Así se evita que estas constantes/funciones choquen con las
 * de otros widgets, ya que todos los <script> del panel comparten el mismo
 * scope global.
 *
 * Uso, desde index.html:
 *   <script src="noticias-widget-v1.js"></script>
 *   <script> mountNewsWidget('widget-1'); </script>
 */
(function () {
  const GNEWS_API_KEY = '1d27679ab409a627ce92b95412023bf7';
  const NOTICIAS_MAX = 3;
  const GNEWS_ENDPOINT = `https://gnews.io/api/v4/top-headlines?lang=es&max=${NOTICIAS_MAX}&apikey=${GNEWS_API_KEY}`;
  const NOTICIAS_CACHE_KEY = 'noticias-widget-cache';
  const NOTICIAS_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutos, para no gastar la cuota diaria (100 requests)

  const NOTICIAS_FALLBACK_TITULARES = [
    'Gobierno de Rodrigo Paz define medidas ante crisis de combustibles y caso Cerimedo-Beller',
  ];

  function mountNewsWidget(containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
      console.warn(`No se encontró el contenedor #${containerId}`);
      return;
    }

    renderNoticias(container, ['Cargando noticias...']);

    loadNoticias()
      .then((titulares) => renderNoticias(container, titulares))
      .catch((error) => {
        console.warn('No se pudo obtener los titulares de noticias:', error);
        renderNoticias(container, NOTICIAS_FALLBACK_TITULARES);
      });
  }

  function renderNoticias(container, titulares) {
    const items = titulares
      .map((titulo) => `<h3 style="margin:0;">${escapeHtml(titulo)}</h3>`)
      .join('');

    container.innerHTML = `
    <span class="tag">Noticias</span>
    <div class="noticias" style="flex:1; min-height:0; overflow-y:auto; display:flex; flex-direction:column; gap:12px;">
      ${items}
    </div>
     `;
  }

  async function loadNoticias() {
    const cached = readNoticiasCache();
    if (cached) return cached;

    const response = await fetch(GNEWS_ENDPOINT);

    if (!response.ok) {
      throw new Error(`GNews respondió con estado ${response.status}`);
    }

    const data = await response.json();
    const titulares = (data.articles || [])
      .map((articulo) => articulo.title)
      .filter(Boolean)
      .slice(0, NOTICIAS_MAX);

    if (titulares.length === 0) {
      throw new Error('La respuesta de GNews no contiene artículos');
    }

    writeNoticiasCache(titulares);
    return titulares;
  }

  function readNoticiasCache() {
    try {
      const raw = sessionStorage.getItem(NOTICIAS_CACHE_KEY);
      if (!raw) return null;

      const { titulares, timestamp } = JSON.parse(raw);
      if (Date.now() - timestamp > NOTICIAS_CACHE_TTL_MS) return null;

      return titulares;
    } catch (error) {
      return null;
    }
  }

  function writeNoticiasCache(titulares) {
    try {
      sessionStorage.setItem(NOTICIAS_CACHE_KEY, JSON.stringify({ titulares, timestamp: Date.now() }));
    } catch (error) {
      // sessionStorage no disponible (modo privado, cuota llena, etc.) — no es crítico
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  window.mountNewsWidget = mountNewsWidget;
})();
