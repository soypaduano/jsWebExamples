let DB;

const form = document.querySelector('form'),
nombreMascota = document.querySelector('#mascota'),
nombreCliente = document.querySelector('#cliente'),
telefono = document.querySelector('#telefono'),
fecha = document.querySelector('#fecha'),
hora = document.querySelector('#hora'),
sintomas = document.querySelector('#sintomas'),
citas = document.querySelector('#citas'),
headingAministra = document.querySelector('#administra');


//Esperar por el DOM READY -> INDEX DB NECESITA 

document.addEventListener('DOMContentLoaded', () => {
    let createDB = window.indexedDB.open('citas', 1); //Always use numero enteros

    createDB.onerror = function(){
        console.log("Hubo un error");
    }

    createDB.onsuccess = function(){
        console.log("TODO LISTO");

        DB = createDB.result;
        console.log(DB);
        
        mostrarCitas();
    }

    //este metodo solo corre una vez y es ideal para crear el schema de la bd 
    createDB.onupgradeneeded = function(e){
        console.log("Solo una vez");

        let db = e.target.result;

        let objectStore = db.createObjectStore('citas', {keyPath: 'key', autoIncrement: true});
        //Crear indices y en la base de datos

        objectStore.createIndex('mascota', 'mascota', {unique: false});
        objectStore.createIndex('cliente', 'cliente', {unique: false});
        objectStore.createIndex('telefono', 'telefono', {unique: false});
        objectStore.createIndex('fecha', 'fecha', {unique: false});
        objectStore.createIndex('hora', 'hora', {unique: false});
        objectStore.createIndex('sintomas', 'sintomas', {unique: false});

    }

    form.addEventListener('submit', agregarDatos);

    function agregarDatos(e){
        e.preventDefault();

        const nuevaCita = {
            mascota: nombreMascota.value,
            cliente: nombreCliente.value,
            telefono: telefono.value,
            fecha: fecha.value,
            hora: hora.value,
            sintomas: sintomas.value
        }

        console.log(nuevaCita);

        let transaction = DB.transaction(['citas'], 'readwrite');
        let objectStore = transaction.objectStore('citas');
        console.log(objectStore);
        let peticion = objectStore.add(nuevaCita);


        peticion.onsuccess = () => {
            console.log("Cita agregada");
            form.reset();
            mostrarCitas();
        }

        transaction.oncomplete = () => {
            console.log("Cita agregada");
        }

        transaction.onerror = () => {
            console.log('Hubo un error');
        }
    }

    function mostrarCitas(){
        while(citas.firstChild){
            
        }

        let objectStore = DB.transaction('citas').objectStore('citas');

        objectStore.openCursor().onsuccess = function(e){
            let cursor = e.target.result;

            if(cursor){
                let citaHTML = document.createElement('li');
                citaHTML.setAttribute('data-cita-id', cursor.value.key);
                citaHTML.classList.add('list-group-item');
                citaHTML.innerHTML = `<p class="font-weight-bold">Mascota: <span class="font-weight-normal">${cursor.value.mascota}</span></p>
                <p class="font-weight-bold">Cliente: <span class="font-weight-normal">${cursor.value.cliente}</span></p>
                <p class="font-weight-bold">Fecha: <span class="font-weight-normal">${cursor.value.fecha}</span></p>
                <p class="font-weight-bold">Sintomas: <span class="font-weight-normal">${cursor.value.sintomas}</span></p>`

                const botonBorrar = document.createElement('btn');
                botonBorrar.classList.add('borrar', 'btn', 'btn-danger');
                botonBorrar.innerHTML = '<span aria-hidden= "true">x</span>Borrar'
                botonBorrar.onclick = borrarCita;
                citaHTML.appendChild(botonBorrar);

                citas.appendChild(citaHTML);
                cursor.continue();   
            } else {
                if(!citas.firstChild){
                headingAministra.textContent = "Agrega citas para comenzar";
                let listado = document.createElement('p');
                listado.classList.add('text-center');
                listado.textContent = 'No hay registros';
                citas.appendChild(listado);
                } else {
                    headingAministra.textContent = "Administra tus citas";
                }
            }
        }
    }

    function borrarCita(e){
        let citaID = e.target.parentElement.getAttribute('data-cita-id');
        
        let transaction = DB.transaction(['citas'], 'readwrite');
        let objectStore = transaction.objectStore('citas');

        let peticion = objectStore.delete(citaID);

        TransitionEvent.oncomplete = () => {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);

            if(!citas.firstChild){
                headingAministra.textContent = "Agrega citas para comenzar";
                let listado = document.createElement('p');
                listado.classList.add('text-center');
                listado.textContent = 'No hay registros';
                citas.appendChild(listado);
                } else {
                    headingAministra.textContent = "Administra tus citas";
                }

        }
    }

})