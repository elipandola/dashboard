/**
 * Widget 4: Diccionario en inglés - Grupo Bilingües
 * Iteración 3: Búsqueda dinámica con Datamuse API (Sin bloqueos de CORS)
 */

async function buscar_palabra(palabra, titulo_elemento, definicion_elemento, error_elemento) {
  const palabra_limpia = palabra.trim().toLowerCase();
  
  // Estado de carga
  titulo_elemento.textContent = "Buscando...";
  definicion_elemento.textContent = "";
  error_elemento.textContent = "";

  try {
    // Usamos Datamuse API porque la anterior te está bloqueando (CORS error)
    // 'md=d' pide la definición. 'max=1' trae solo el primer resultado.
    const url = `https://api.datamuse.com/words?sp=${palabra_limpia}&md=d&max=1`;
    
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    // Verificamos si la API encontró la palabra y si tiene definiciones
    if (datos.length > 0 && datos[0].defs) {
      const palabra_encontrada = datos[0].word;
      
      // La definición viene como "n\tdefinition", separamos el tipo del texto
      const partes = datos[0].defs[0].split('\t');
      const solo_definicion = partes[1] || partes[0];

      // ÉXITO: Mostramos los datos reales (NADA QUEMADO/HARDCODEADO)
      titulo_elemento.textContent = palabra_encontrada.toUpperCase();
      definicion_elemento.textContent = solo_definicion;
      error_elemento.textContent = ""; 
    } else {
      throw new Error("No encontrado");
    }

  } catch (error) {
    // Requerimiento 6 y 10: "texto no encontrado"
    titulo_elemento.textContent = "";
    definicion_elemento.textContent = "";
    error_elemento.textContent = "texto no encontrado";
  }
}

function mount_dictionary_widget(container_id) {
  const contenedor = document.getElementById(container_id);
  if (!contenedor) return;

  contenedor.innerHTML = `
    <span class="tag">DICCIONARIO</span>
    <div class="dict-container">
      <div class="dict-search-box">
        <input 
          type="text" 
          id="dict-input" 
          class="dict-input" 
          maxlength="50" 
          placeholder="Escribe una palabra..." 
          autocomplete="off"
        >
        <button id="dict-btn" class="dict-btn" type="button" disabled>Enviar</button>
      </div>

      <div class="dict-result" style="margin-top: 15px;">
        <h3 class="word-title" style="color: #1f3b4d; font-family: 'Outfit', sans-serif;"></h3>
        <p class="word-definition" id="word-def" style="color: #5c7a8a; font-size: 0.9rem; line-height: 1.4;"></p>
      </div>
      
      <p id="dict-error" style="color: #dc2626; font-size: 0.9rem; font-weight: bold; margin-top: 10px; text-align: center;"></p>
    </div>
  `;

  const input_palabra = contenedor.querySelector('#dict-input');
  const boton_buscar = contenedor.querySelector('#dict-btn');
  const titulo_palabra = contenedor.querySelector('.word-title');
  const definicion_palabra = contenedor.querySelector('#word-def');
  const error_msg = contenedor.querySelector('#dict-error');

  // Requerimiento 9: Validar que no haya números y no esté vacío
  input_palabra.addEventListener('input', () => {
    const texto = input_palabra.value.trim();
    const tiene_numeros = /\d/.test(texto);
    const solo_letras = /^[a-zA-Z\s]*$/.test(texto);

    boton_buscar.disabled = !texto || tiene_numeros || !solo_letras;
    error_msg.textContent = tiene_numeros ? "No se permiten números." : "";
  });

  function ejecutar() {
    const palabra_usuario = input_palabra.value.trim();
    buscar_palabra(palabra_usuario, titulo_palabra, definicion_palabra, error_msg);
  }

  boton_buscar.addEventListener('click', ejecutar);
  
  // Requerimiento 11: Enter para buscar
  input_palabra.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !boton_buscar.disabled) ejecutar();
  });
}

function mountDictionaryWidget(container_id) {
  mount_dictionary_widget(container_id);
}