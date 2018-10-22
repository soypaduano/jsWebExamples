class Interfaz{

    constructor(){
        this.construirSelect();
    }

    init(){
        //Para no sobrecargar el metodo constructor, nos creamos init(), que se hace en algunos frameworks como Angular

    }

    construirSelect(){
        cotizador.obtenerMonedasApi()
        .then(monedas => {
            console.log(monedas);
            const arregloMonedas = monedas;
            const select = document.getElementById('criptomoneda');
            //Construimos el select desde la API
            arregloMonedas.forEach(moneda => {
                const option = document.createElement('option');
                option.value = moneda.id;
                option.appendChild(document.createTextNode(moneda.name));
                select.appendChild(option);
            });
        });
    }

    mostrarMensaje(mensaje, classes){

        const div = document.createElement('div');
        div.className = classes;
        div.appendChild(document.createTextNode(mensaje));
        //div para mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 1000);
    }

    mostrarResultado(resultado, moneda){

        const resultadoAnterior  = document.querySelector('#resultado > div');
        if(resultadoAnterior){
            resultadoAnterior.remove();
        }


        this.mostrarSpinner();
        //etiqueta precios
        const etiquetaMoneda = `price_${moneda}`;
        //leer valor resultado
        const valor = resultado[etiquetaMoneda];
        const monedaUpper = moneda.toUpperCase();
        const hora = new Date(resultado.last_updated * 1000);
        const horaActualizada = `${hora.getHours()}:${hora.getMinutes()}`

        //Constuir el template
        let templateHTML = '';
        templateHTML += `<div class="card cyan darken-3">
        <div class="card-content white-text">
        <span class="card-title">resultado: </span>
        <p> El precio de ${resultado.name} a moneda ${monedaUpper} es de: ${valor}</p>
        <p> Ultima hora: ${resultado.percent_change_1h}%</p>
        <p> Ultimo dia : ${resultado.percent_change_24h}%</p>
        <p> Ultimos 7 dias: ${resultado.percent_change_7d}%</p>
        <p> Ultima actualizacion: ${horaActualizada}</p>
        </div>
        </div> `;

        setTimeout(() => {
            document.querySelector('#resultado').innerHTML = templateHTML;
            document.querySelector('.spinner img').remove();
        }, 1000);
    }

    mostrarSpinner(){
        const spinnerGif = document.createElement('img');
        spinnerGif.src = 'img/spinner.gif';
        document.querySelector('.spinner').appendChild(spinnerGif);
    }
}