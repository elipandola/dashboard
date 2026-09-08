
function mountConverterWidget(containerId) {

  
  const container =
    document.getElementById(containerId);

  if (!container) {


    console.warn(
      `No se encontró el contenedor #${containerId}`
    );

    return;
  }

  
  container.innerHTML =
    getConverterContent();


 
  const input =
    document.getElementById('conversion-input');

  
  const result =
    document.getElementById('conversion-result');



  const millasKilometros =
    document.getElementById('millas-kilometros');

 
  const kilometrosMillas =
    document.getElementById('kilometros-millas');


  const metrosPulgadas =
    document.getElementById('metros-pulgadas');


  const pulgadasMetros =
    document.getElementById('pulgadas-metros');



  function obtenerNumero() {

  
    const numero =
      parseFloat(input.value);

   
    if (isNaN(numero)) {

   
      result.textContent =
        'Ingresa un número válido.';

     
      return null;
    }

    return numero;
  }




  millasKilometros.addEventListener(
    'click',
    function () {

     
      const millas =
        obtenerNumero();

      
      if (millas === null) {
        return;
      }

      
      const kilometros =
        millas * 1.60934;


      result.textContent =
        `Resultado: ${kilometros.toFixed(2)} kilómetros`;
    }
  );




  kilometrosMillas.addEventListener(
    'click',
    function () {

      const kilometros =
        obtenerNumero();

    
      if (kilometros === null) {
        return;
      }


      const millas =
        kilometros * 0.621371;

      
      result.textContent =
        `Resultado: ${millas.toFixed(2)} millas`;
    }
  );


 
  metrosPulgadas.addEventListener(
    'click',
    function () {

      
      const metros =
        obtenerNumero();

      if (metros === null) {
        return;
      }

      const pulgadas =
        metros * 39.3701;

     
      result.textContent =
        `Resultado: ${pulgadas.toFixed(2)} pulgadas`;
    }
  );



  pulgadasMetros.addEventListener(
    'click',
    function () {

      const pulgadas =
        obtenerNumero();

      if (pulgadas === null) {
        return;
      }

    
      const metros =
        pulgadas * 0.0254;

     
      result.textContent =
        `Resultado: ${metros.toFixed(2)} metros`;
    }
  );

}