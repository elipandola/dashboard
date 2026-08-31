
function mountConverterWidget(containerId) {

  
  const container = document.getElementById(containerId);

  if (!container) {

    
    console.warn(
      `No se encontró el contenedor #${containerId}`
    );

    
    return;
  }

  
  container.innerHTML = getConverterContent();

  
  const convertButton =
    document.getElementById('convert-button');

 
  const result =
    document.getElementById('conversion-result');

  
  if (!convertButton || !result) {

   
    console.warn(
      'No se encontró el botón o el resultado'
    );

   
    return;
  }

  
  convertButton.addEventListener('click', function () {

    
    const metros = 1;
    const centimetros = metros * 100;

     result.textContent =
      `Resultado: ${centimetros} centímetros`;
  });
}