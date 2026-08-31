function getConverterContent() {


  return `

    <!-- Nombre del conversor -->
    <span class="tag">BRN_CONVERSOR</span>

    <!-- Contenedor de los elementos del conversor -->
    <div class="conversion-static">

      <!-- Valor que vamos a convertir -->
      <span class="conversion-value">
        1 metro
      </span>

      <!-- Botón que realizará la conversión -->
      <button id="convert-button">
        ▶ &nbsp; Convertir
      </button>

      <!-- Aquí aparecerá el resultado
           después de presionar el botón -->
      <span id="conversion-result"></span>

    </div>
  `;
}