import {API} from './api.js';
import * as UI from './interfaz.js'; //Mejor exportar solo el resultado

console.log(UI);

UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();
    //Obtenemos datos del formulario
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    console.log(artista);
    console.log(cancion);

    if(artista === '' || cancion === ''){
        //No hacemos query a la rest API
        UI.divMensajes.innerHTML = 'Error, todos los campso deben ser obligatorios';
        UI.divMensajes.classList.add('error');
        setTimeout(() => {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        }, 2000)
    } else {
        //Hacemos la llamada a la API
        const api = new API(artista, cancion);
        api.consultarAPI()
        .then(data => {
            
            if(data.respuesta.lyrics){
                //La cancion existe
                const letra = data.respuesta.lyrics;s
                UI.divResultado.textContent = letra;

            } else {
                UI.divMensajes.innerHTML = 'La cancion no existe, prueba con otra busqueda';
                UI.divMensajes.classList.add('error');
                setTimeout(() => {
                    UI.divMensajes.innerHTML = '';
                    UI.divMensajes.classList.remove('error');
                    UI.formularioBuscar.reset();
                }, 2000)


            }




        });
    }

});

