/**
 * Widget 4: Diccionario en inglés
 * Consume la API de Datamuse para buscar definiciones de palabras en inglés.
 */

// Diccionario de tipos de palabras
const tipos_palabra = {
  n: 'noun',
  v: 'verb',
  adj: 'adjective',
  adv: 'adverb'
};

// Función para buscar la definición de una palabra en la API
async function buscar_palabra(palabra, titulo_elemento, tipo_elemento, definicion_elemento) {
  const palabra_limpia = palabra.trim().toLowerCase();

  // Si está vacía o contiene números, no hacemos la consulta
  if (!palabra_limpia || /\d/.test(palabra_limpia)) {
    return;
  }

  try {
    const url = `https://api.datamuse.com/words?sp=${palabra_limpia}&md=d`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    // Buscamos si la palabra existe y tiene definiciones en los resultados
    const resultado = datos.find(
      (item) => item.word.toLowerCase() === palabra_limpia && item.defs
    );

    if (resultado && resultado.defs.length > 0) {
      // La API devuelve el tipo y la definición separados por un tabulador (ejemplo: "n\tDefinición...")
      const partes = resultado.defs[0].split('\t');
      const codigo_tipo = partes[0];
      const texto_definicion = partes[1] || resultado.defs[0];

      titulo_elemento.textContent = resultado.word;
      tipo_elemento.textContent = tipos_palabra[codigo_tipo] || codigo_tipo;
      definicion_elemento.textContent = texto_definicion.trim();
    } else {
      titulo_elemento.textContent = palabra_limpia;
      tipo_elemento.textContent = 'sin resultados';
      definicion_elemento.textContent = `No se encontró una definición para "${palabra_limpia}".`;
    }
  } catch (error) {
    console.error('Error al consultar la API:', error);
    titulo_elemento.textContent = palabra_limpia;
    tipo_elemento.textContent = 'error';
    definicion_elemento.textContent = 'No se pudo conectar con el servicio del diccionario en este momento.';
  }
}

// Montar el widget
function mount_dictionary_widget(container_id) {
  const contenedor = document.getElementById(container_id);
  if (!contenedor) return;

  // Estructura HTML del widget
  contenedor.innerHTML = `
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
        <button id="dict-btn" class="dict-btn" type="button" disabled>Buscar</button>
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

  // Obtenemos los elementos del DOM necesarios
  const input_palabra = contenedor.querySelector('#dict-input');
  const boton_buscar = contenedor.querySelector('#dict-btn');
  const titulo_palabra = contenedor.querySelector('.word-title');
  const tipo_palabra = contenedor.querySelector('.word-type');
  const definicion_palabra = contenedor.querySelector('.word-definition');

  // Habilita o deshabilita el botón según el texto del input
  function validar_boton() {
    const texto = input_palabra.value.trim();
    const tiene_numeros = /\d/.test(texto);
    boton_buscar.disabled = !texto || tiene_numeros;
  }

  // Palabra estática
  const palabra_estatica = 'developer';

  // Ejecuta la búsqueda de la palabra
  function ejecutar_busqueda() {
    const texto = input_palabra.value.trim();
    if (!texto || /\d/.test(texto)) return;

    // Limpiamos el input y deshabilitamos el botón
    input_palabra.value = '';
    validar_boton();

    // Se consulta la palabra estática
    buscar_palabra(palabra_estatica, titulo_palabra, tipo_palabra, definicion_palabra);
  }

  input_palabra.addEventListener('input', validar_boton);
  boton_buscar.addEventListener('click', ejecutar_busqueda);
  input_palabra.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
      evento.preventDefault();
      ejecutar_busqueda();
    }
  });

  // Mostar la definición de la palabra estática
  buscar_palabra(palabra_estatica, titulo_palabra, tipo_palabra, definicion_palabra);
}

// Compatibilidad para index.html
function mountDictionaryWidget(container_id) {
  mount_dictionary_widget(container_id);
}