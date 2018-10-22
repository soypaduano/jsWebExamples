//Instanciamos clases

const cotizador = new Cotizador();
const ui = new Interfaz();

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Enviando");


    //Leemos normal
    const monedaSelect = document.getElementById('moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    console.log(monedaSeleccionada);
    //Leemos criptomoneda
    const criptoMonedaSelect = document.getElementById('criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[monedaSelect.selectedIndex].value;
    console.log(criptoMonedaSeleccionada);

    //Comprobar que los campos tenga datos
    if(monedaSeleccionada === "" || criptoMonedaSeleccionada === ''){
        //Faltan datos
        ui.mostrarMensaje('Ambos campos son obligatorios', 'deep-orange darken-4 card-panel');
    } else {
        //todo correcto
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
        .then(data => {
            ui.mostrarResultado(data.resultado[0], monedaSeleccionada.toLowerCase());
            
        });
    }
});