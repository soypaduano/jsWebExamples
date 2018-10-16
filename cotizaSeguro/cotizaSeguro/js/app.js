//Cotizador

function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(informacion){
    /* 1 americano = 1.15
    2 asitico = 1.05
    3 europeo = 1.35
    */
    const base = 2000;
    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
         case '3':
            cantidad = base * 1.35;
            break;
    }



    //Leer el año
    const diferencia = new Date().getFullYear() - this.anio;
    //Cada año de diferencia hay que reducir 3% la cantidad.
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    

    //Si el seguro es básico, por 30% y si es completo, 50%
    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50
    }



    return cantidad;
}


//El objeto donde mostramos todo 
function Interfaz(){
}

Interfaz.prototype.mostrarResultado = function(seguro, cantidad)
{
    const resultado = document.getElementById('resultado');
    let marca;
    switch(seguro.marca){
        case '1':
        marca = 'Americano'
        break;
        case '2':
        marca = 'Asiatico'
        break;
        case '3':
        marca = 'Europeo'
        break;
    }

    const div = document.createElement('div');
    div.innerHTML = `Tu resumen: 
    Marca: ${marca}
    Año: ${seguro.anio}
    Tipo: ${seguro.tipo}
    Total: ${cantidad}`;

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 2000);
}


Interfaz.prototype.mostrarMensaje = function(msj, tipo){
    const div = document.createElement('div');


    if(tipo === 'error'){
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }
    div.innerHTML = `${msj}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    }, 3000);
}

//Listeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;


    //Año seleccinado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;


    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    const interfaz = new Interfaz();

    //Revisamos que los campos no estén vacios
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
        interfaz.mostrarMensaje('Faltan datos, revisa el formulario', 'error');
    } else {

        const resultados = document.querySelector('#resultado div');
        if(resultados != null ){
            resultados.remove();
        }

       const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);

       const cantidad = seguro.cotizarSeguro(seguro);
       //Mostrar el resultado
       interfaz.mostrarResultado(seguro, cantidad);
    } 
});


const max = new Date().getFullYear();
const min = max - 20;


const selectAnios = document.getElementById('anio');
for(let i = max; i > min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}