"use strict";

function mountConverterWidget(containerId) {
  var container = document.getElementById(containerId);

  if (!container) {
    console.warn("No se encontr\xF3 el contenedor #".concat(containerId));
    return;
  }

  container.innerHTML = getConverterContent();
  var input = document.getElementById('conversion-input');
  var result = document.getElementById('conversion-result');
  var millasKilometros = document.getElementById('millas-kilometros');
  var kilometrosMillas = document.getElementById('kilometros-millas');
  var metrosPulgadas = document.getElementById('metros-pulgadas');
  var pulgadasMetros = document.getElementById('pulgadas-metros');

  function obtenerNumero() {
    var numero = parseFloat(input.value);

    if (isNaN(numero)) {
      result.textContent = 'Ingresa un número válido.';
      return null;
    }

    return numero;
  }

  millasKilometros.addEventListener('click', function () {
    var millas = obtenerNumero();

    if (millas === null) {
      return;
    }

    var kilometros = millas * 1.60934;
    result.textContent = "Resultado: ".concat(kilometros.toFixed(2), " kil\xF3metros");
  });
  kilometrosMillas.addEventListener('click', function () {
    var kilometros = obtenerNumero();

    if (kilometros === null) {
      return;
    }

    var millas = kilometros * 0.621371;
    result.textContent = "Resultado: ".concat(millas.toFixed(2), " millas");
  });
  metrosPulgadas.addEventListener('click', function () {
    var metros = obtenerNumero();

    if (metros === null) {
      return;
    }

    var pulgadas = metros * 39.3701;
    result.textContent = "Resultado: ".concat(pulgadas.toFixed(2), " pulgadas");
  });
  pulgadasMetros.addEventListener('click', function () {
    var pulgadas = obtenerNumero();

    if (pulgadas === null) {
      return;
    }

    var metros = pulgadas * 0.0254;
    result.textContent = "Resultado: ".concat(metros.toFixed(2), " metros");
  });
}
//# sourceMappingURL=converter-widget.dev.js.map
