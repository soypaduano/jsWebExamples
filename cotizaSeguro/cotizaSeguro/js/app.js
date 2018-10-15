//Cotizador

function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}


//El objeto donde mostramos todo 
function Interfaz(){
}

Interfaz.prototype.mostrarError = function(msj, tipo){
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
    console.log(marcaSeleccionada);

    //Año seleccinado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    console.log(anioSeleccionado);

    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    console.log(tipo);

    const interfaz = new Interfaz();

    //Revisamos que los campos no estén vacios
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
        interfaz.mostrarError('Faltan datos, revisa el formulario', 'error');
    } else {
        //Instanciar seguros
    }

    console.log("Presionado");
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