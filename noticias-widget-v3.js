/*
 * Widget: Noticias – Iteración 3
 * --------------------------------
 * Permite al usuario elegir la categoría de noticias
 * (tecnología, deportes, política) y muestra los titulares
 * más recientes de esa categoría usando GNews API.
 *
 * La iteración 2 ya consumía la API; aquí se agrega el selector
 * de categorías y se ajusta la URL de la petición para filtrar
 * por categoría.
 *
 * Nota sobre la categoría "política": GNews no tiene una categoría
 * específica de política, por lo que se usa "world" (noticias
 * internacionales, que suelen incluir temas políticos).
 * Si prefieres noticias nacionales, cambia a "nation".
 */
(function () {
  const GNEWS_API_KEY = '1d27679ab409a627ce92b95412023bf7'; // Tu clave existente
  const NOTICIAS_MAX = 3;
  const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutos

  // Mapeo de categorías mostradas al usuario a las que acepta GNews
  const CATEGORIAS_GNEWS = {
    tecnologia: 'technology',
    deportes: 'sports',
    politica: 'world'   // o 'general' si prefieres noticias variadas
  };

  // Titulares de respaldo por si falla la API
  const FALLBACK_POR_CATEGORIA = {
    tecnologia: [
      'Nuevo avance en inteligencia artificial revoluciona la industria',
      'Lanzan el primer procesador cuántico comercial',
    ],
    deportes: [
      'El equipo local se clasifica a la final del torneo continental',
      'Récord mundial en los 100 metros planos',
    ],
    politica: [
      'El parlamento aprueba reforma clave para la transparencia',
      'Cumbre internacional aborda la crisis climática',
    ],
  };

  function mountNewsWidget(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`No se encontró el contenedor #${containerId}`);
        return;
    }

    // Render inicial con selector y mensaje de carga
    renderWidget(container, 'tecnologia', ['Cargando noticias...']);

    // DELEGACIÓN DE EVENTOS: Escuchar el cambio en el contenedor (que nunca se borra)
    container.addEventListener('change', (evento) => {
        // Verificamos que el cambio ocurrió en el selector
        if (evento.target.classList.contains('categoria-select')) {
        const categoria = evento.target.value;
        // Mostrar "Cargando..." mientras se obtienen los datos
        renderWidget(container, categoria, ['Cargando noticias...']);
        
        cargarNoticias(categoria)
            .then((titulares) => renderWidget(container, categoria, titulares))
            .catch((error) => {
            console.warn('Error al cargar noticias:', error);
            const fallback = FALLBACK_POR_CATEGORIA[categoria] || ['No hay noticias disponibles'];
            renderWidget(container, categoria, fallback);
            });
        }
    });

    // Carga inicial
    cargarNoticias('tecnologia')
        .then((titulares) => renderWidget(container, 'tecnologia', titulares))
        .catch((error) => {
        console.warn('Error al cargar noticias iniciales:', error);
        renderWidget(container, 'tecnologia', FALLBACK_POR_CATEGORIA.tecnologia);
        });
  }

  function renderWidget(container, categoriaActual, titulares) {
    const containerId = container.id;
    const opciones = [
      { valor: 'tecnologia', texto: 'Tecnología' },
      { valor: 'deportes', texto: 'Deportes' },
      { valor: 'politica', texto: 'Política' },
    ];

    const opcionesHtml = opciones
      .map((op) => {
        const selected = op.valor === categoriaActual ? 'selected' : '';
        return `<option value="${op.valor}" ${selected}>${op.texto}</option>`;
      })
      .join('');

    const itemsHtml = titulares
      .map((titulo) => `<h3 style="margin:0;">${escapeHtml(titulo)}</h3>`)
      .join('');

    container.innerHTML = `
      <span class="tag">Noticias</span>
      <div class="noticias-categoria">
        <label for="categoria-${containerId}">Categoría:</label>
        <select id="categoria-${containerId}" class="categoria-select">
          ${opcionesHtml}
        </select>
      </div>
      <div class="noticias" style="flex:1; min-height:0; overflow-y:auto; display:flex; flex-direction:column; gap:12px;">
        ${itemsHtml}
      </div>
    `;
}

  /**
   * Obtiene las noticias más recientes de una categoría dada.
   * Usa caché en sessionStorage para no agotar la cuota de la API.
   */
  async function cargarNoticias(categoriaUsuario) {
    const categoriaAPI = CATEGORIAS_GNEWS[categoriaUsuario] || 'general';
    const cacheKey = `noticias-widget-cache-${categoriaUsuario}`;

    // Intentar leer de caché
    const cached = leerCache(cacheKey);
    if (cached) return cached;

    const url = `https://gnews.io/api/v4/top-headlines?lang=es&max=${NOTICIAS_MAX}&category=${categoriaAPI}&apikey=${GNEWS_API_KEY}`;

    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`GNews respondió con estado ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const titulares = (datos.articles || [])
      .map((articulo) => articulo.title)
      .filter(Boolean)
      .slice(0, NOTICIAS_MAX);

    if (titulares.length === 0) {
      throw new Error('La respuesta de GNews no contiene artículos');
    }

    guardarCache(cacheKey, titulares);
    return titulares;
  }

  function leerCache(key) {
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return null;
      const { titulares, timestamp } = JSON.parse(raw);
      if (Date.now() - timestamp > CACHE_TTL_MS) return null;
      return titulares;
    } catch (error) {
      return null;
    }
  }

  function guardarCache(key, titulares) {
    try {
      sessionStorage.setItem(key, JSON.stringify({ titulares, timestamp: Date.now() }));
    } catch (error) {
      // sessionStorage no disponible – no es crítico
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Exponer la función globalmente
  window.mountNewsWidget = mountNewsWidget;
})();