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
            citas.removeChild();
        }

        let objectStore = DB.transaction('citas').objectStore('citas');    }


})