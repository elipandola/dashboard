/**
 * Widget: To-Do List
 * -------------------
 * Iteración 1: agregar tareas con input + botón (máx 5 tareas).
 * Iteración 2: persistencia en localStorage (las tareas sobreviven al recargar la página).
 *
 * Uso, desde index.html:
 *   <script src="todo-widget.js"></script>
 *   <script> mountTodoWidget('widget-2'); </script>
 */
function mountTodoWidget(containerId) {
  const MAX_TAREAS = 5;
  const STORAGE_KEY = `todo-widget:${containerId}`;
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`No se encontró el contenedor #${containerId}`);
    return;
  }
  container.innerHTML = `
    <span class="tag">To-Do List</span>
    <form class="todo-form">
      <input
        type="text"
        class="todo-input"
        placeholder="Escribe una tarea..."
        maxlength="100"
        autocomplete="off"
      >
      <button type="submit" class="todo-add-btn">Agregar</button>
    </form>
    <p class="todo-error"></p>
    <ul class="todo-list"></ul>
  `;
  const form = container.querySelector('.todo-form');
  const input = container.querySelector('.todo-input');
  const lista = container.querySelector('.todo-list');
  const errorMsg = container.querySelector('.todo-error');

  
  function cargarTareas() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const tareas = JSON.parse(data);
      if (!Array.isArray(tareas)) return [];
      return tareas.filter((t) => typeof t === 'string');
    } catch (err) {
      console.warn('No se pudieron cargar las tareas guardadas:', err);
      return [];
    }
  }

  function guardarTareas() {
    try {
      const tareas = Array.from(lista.querySelectorAll('.todo-item span')).map(
        (span) => span.textContent
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
    } catch (err) {
      console.warn('No se pudieron guardar las tareas:', err);
    }
  }

  function crearItemTarea(texto) {
    const item = document.createElement('li');
    item.classList.add('todo-item');
    const textoTarea = document.createElement('span');
    textoTarea.textContent = texto;
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.type = 'button';
    botonEliminar.addEventListener('click', () => {
      item.remove();
      guardarTareas();
    });
    item.appendChild(textoTarea);
    item.appendChild(botonEliminar);
    return item;
  }

  // tareas guardadas al cargar el widget
  function renderizarTareasGuardadas() {
    const tareasGuardadas = cargarTareas().slice(0, MAX_TAREAS);
    tareasGuardadas.forEach((texto) => {
      lista.appendChild(crearItemTarea(texto));
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    agregarTarea();
  });

  function agregarTarea() {
    const texto = input.value.trim();
    errorMsg.textContent = '';
    if (texto === '') {
      errorMsg.textContent = 'La tarea no puede estar vacía.';
      return;
    }
    if (lista.children.length >= MAX_TAREAS) {
      errorMsg.textContent = `Solo se permiten un máximo de ${MAX_TAREAS} tareas.`;
      return;
    }
    const item = crearItemTarea(texto);
    lista.appendChild(item);
    guardarTareas();
    input.value = '';
    input.focus();
  }

  renderizarTareasGuardadas();
}