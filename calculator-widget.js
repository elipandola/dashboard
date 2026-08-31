function mountCalculatorWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`No se encontró el contenedor #${containerId}`);
    return;
  }

  container.innerHTML = `
    <span class="tag" style="font-size: 13px; font-weight: 700; color: #4f92b8; letter-spacing: 0.5px; text-transform: uppercase;">Calculadora</span>

    <div class="calculator-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
      <input type="number" class="calc-input num1" placeholder="Número 1" style="padding: 10px 12px; border-radius: 10px; border: 1px solid #e0e6ed; outline: none; font-size: 14px;">
      <input type="number" class="calc-input num2" placeholder="Número 2" style="padding: 10px 12px; border-radius: 10px; border: 1px solid #e0e6ed; outline: none; font-size: 14px;">
      
      <div class="actions-row" style="display: flex; gap: 8px; margin-top: 4px;">
        <!-- Botón de operación (+) -->
        <button class="calc-btn btn-op-sum" style="flex: 1; padding: 10px; cursor: pointer; border-radius: 12px; border: none; background-color: #4f92b8; color: white; font-weight: 600; font-size: 16px; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center;">
          +
        </button>
        
        <!-- Botón de Resultado (=) -->
        <button class="calc-btn btn-equals" style="flex: 1; padding: 10px; cursor: pointer; border-radius: 12px; border: none; background-color: #4f92b8; color: white; font-weight: 600; font-size: 16px; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center;">
          =
        </button>
      </div>

      <!-- Resultado movido a la parte inferior -->
      <div style="font-size: 20px; font-weight: 700; color: #1e3a4c; margin-top: 6px;">
        Resultado: <span class="calc-result">0</span>
      </div>
    </div>
  `;

  const num1Input = container.querySelector('.num1');
  const num2Input = container.querySelector('.num2');
  const btnOpSum = container.querySelector('.btn-op-sum');
  const btnEquals = container.querySelector('.btn-equals');
  const resultEl = container.querySelector('.calc-result');

  let selectedOperation = null;

  // Marcar/desmarcar la operación de suma
  btnOpSum.addEventListener('click', () => {
    if (selectedOperation === 'sum') {
      selectedOperation = null;
      btnOpSum.style.backgroundColor = '#4f92b8';
      btnOpSum.style.boxShadow = 'none';
    } else {
      selectedOperation = 'sum';
      btnOpSum.style.backgroundColor = '#386e8e'; // Tono más oscuro para denotar selección
      btnOpSum.style.boxShadow = '0 0 0 2px #264e66';
    }
  });

  // Ejecutar el cálculo solo al presionar '='
  btnEquals.addEventListener('click', () => {
    if (selectedOperation === 'sum') {
      const val1 = parseFloat(num1Input.value) || 0;
      const val2 = parseFloat(num2Input.value) || 0;
      resultEl.textContent = val1 + val2;
    }
  });
}