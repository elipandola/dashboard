
function getConverterContent() {


  return `

    <!-- Nombre del conversor -->
    <span class="tag">
      CONVERSOR
    </span>

    <!-- Contenedor principal del conversor -->
    <div class="conversion-static">

      <!-- Título -->
      <span class="conversion-title">
        Conversor de unidades
      </span>

      <!-- Campo donde el usuario coloca
           el número que quiere convertir -->
      <input
        type="number"
        id="conversion-input"
        placeholder="Ingresa un número"
      >

      <!-- Contenedor de los cuatro botones -->
      <div class="conversion-buttons">

        <!-- Botón 1 -->
        <button
          id="millas-kilometros"
          class="conversion-btn">
          Millas → Kilómetros
        </button>

        <!-- Botón 2 -->
        <button
          id="kilometros-millas"
          class="conversion-btn">
          Kilómetros → Millas
        </button>

        <!-- Botón 3 -->
        <button
          id="metros-pulgadas"
          class="conversion-btn">
          Metros → Pulgadas
        </button>

        <!-- Botón 4 -->
        <button
          id="pulgadas-metros"
          class="conversion-btn">
          Pulgadas → Metros
        </button>

      </div>

      <!-- Lugar donde se mostrará el resultado -->
      <span id="conversion-result"></span>

    </div>
  `;
}