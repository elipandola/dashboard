function mountCalculatorWidget(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`No se encontró el contenedor #${containerId}`);
    return;
  }

  container.innerHTML = `
    <span class="tag" style="font-size: 13px; font-weight: 700; color: #4f92b8; letter-spacing: 0.5px; text-transform: uppercase;">Calculadora</span>

    <div class="calc-container">
      <input type="number" class="calc-input num1" placeholder="Número 1">
      <input type="number" class="calc-input num2" placeholder="Número 2">

      <div class="calc-ops-row">
        <button class="calc-btn" data-op="sum">+</button>
        <button class="calc-btn" data-op="sub">−</button>
        <button class="calc-btn" data-op="mul">×</button>
        <button class="calc-btn" data-op="div">÷</button>
      </div>

      <button class="calc-btn-equals">=</button>

      <div class="calc-result-container">
        Resultado: <span class="calc-result">0</span>
      </div>
    </div>
  `;

  const num1Input = container.querySelector('.num1');
  const num2Input = container.querySelector('.num2');
  const resultEl = container.querySelector('.calc-result');

  let selectedOperation = null;

  const opButtons = container.querySelectorAll('.calc-btn[data-op]');

  opButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      opButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedOperation = btn.dataset.op;
    });
  });

  const btnEquals = container.querySelector('.calc-btn-equals');
  btnEquals.addEventListener('click', () => {
    const val1 = parseFloat(num1Input.value) || 0;
    const val2 = parseFloat(num2Input.value) || 0;
    let result;
    switch (selectedOperation) {
      case 'sum':
        result = val1 + val2;
        break;
      case 'sub':
        result = val1 - val2;
        break;
      case 'mul':
        result = val1 * val2;
        break;
      case 'div':
        result = val2 !== 0 ? val1 / val2 : '∞';
        break;
      default:
        result = 'Select operation';
    }
    resultEl.textContent = result;
  });

  // Reset selection on input change
  num1Input.addEventListener('input', () => {
    opButtons.forEach(b => b.classList.remove('selected'));
    selectedOperation = null;
  });
  num2Input.addEventListener('input', () => {
    opButtons.forEach(b => b.classList.remove('selected'));
    selectedOperation = null;
  });
}
