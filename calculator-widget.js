function mountCalculatorWidget(containerId) {

    const container = document.getElementById(containerId);

    if (!container) {
    console.warn(`No se encontró el contenedor #${containerId}`);
    return;
    }


    container.innerHTML = `
    <span class="tag">Calculadora</span>
    <div class="calculator-container" style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
      <input type="number" class="calc-input num1" placeholder="Número 1" style="padding: 6px; border-radius: 4px; border: 1px solid #ccc;">
      <input type="number" class="calc-input num2" placeholder="Número 2" style="padding: 6px; border-radius: 4px; border: 1px solid #ccc;">
      
      <!-- Fila de operaciones (fácil de expandir más adelante) -->
      <div class="actions-row" style="display: flex; gap: 6px;">
        <button class="calc-btn btn-sum" style="flex: 1; padding: 6px; cursor: pointer; border-radius: 4px;">Sumar</button>
      </div>

      <div style="font-weight: 500; margin-top: 5px;">
        Resultado: <span class="calc-result">0</span>
      </div>
    </div>
    `;


    const num1Input = container.querySelector('.num1');
    const num2Input = container.querySelector('.num2');
    const btnSum = container.querySelector('.btn-sum');
    const resultEl = container.querySelector('.calc-result');

    function calculateSum() {
    const val1 = parseFloat(num1Input.value) || 0;
    const val2 = parseFloat(num2Input.value) || 0;
    resultEl.textContent = val1 + val2;
    }

    btnSum.addEventListener('click', calculateSum);
}
