document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);


function cargarNombres(e){
    e.preventDefault();

    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;
    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;
    const cantidad = document.getElementById('numero').value;
    let url = '';
    url += 'http://uinames.com/api/?';
    // Si hay origen agregarlo a la URL
    if(origenSeleccionado !== '') {
    url += `region=${origenSeleccionado}&`;
    }
    // Si hay un genero agregarlo a la URL
    if(generoSeleccionado !== '') {
    url += `gender=${generoSeleccionado}&`;
    }
    // Si hay una cantidad agregarlo a la URL
    if(cantidad !== '') {
    url += `amount=${cantidad}&`;
    }

    console.log(url);
    doRequest(url)
}


function doRequest(url){

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function(){
        if(this.status === 200){
           const nombres = JSON.parse(this.responseText);
           let htmlNombres = '<h2>Nombres generados</h2>';
           htmlNombres += '<ul class="lista">';
           nombres.forEach(function(nombre) {
               htmlNombres += `<li>${nombre.name}</li>`;
           });

           htmlNombres += '</ul>';
           document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }
    xhr.send();
}