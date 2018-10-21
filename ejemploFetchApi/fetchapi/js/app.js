document.getElementById('txtBtn').addEventListener('click', cargarTXT);
document.getElementById('jsonBtn').addEventListener('click', cargarJSON);
document.getElementById('apiBTN').addEventListener('click', cargarAPI);

function cargarTXT(){
    fetch('datos.txt').then(function(res){
        return res.text();
    })
    .then(function(data){
        console.log(data);
        document.getElementById('resultado').innerHTML = data;
    })
    .catch(function(error){
        console.log(error);
    });
}


function cargarJSON(){
    fetch('empleados.json')
    .then(function(res){
        return res.json(); //Lo convertimos directamente a JSON. 
    })
    .then(function(data){
        console.log(data);
        let html = '';
        data.array.forEach(function(empleado) {
            html += `<li> ${empleado.nombre} ${empleado.puesto} </li>
            `;
        });
        document.getElementById('resultado').innerHTML = html; 
    })
}

function cargarAPI(){
    fetch('https://picsum.photos/list')
    .then(function(res){
        return res.json();
    })
    .then(function(imagenes){
        let html = '';
        imagenes.forEach(function(imagen){
            html += `<li> 
                <a href="${imagen.post_url}">Ver imagen </a> 
                ${imagen.author}
                </li>
                `;
        });

        document.getElementById('resultado').innerHTML = html;
        
    });

}