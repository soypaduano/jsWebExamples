const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos  = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

cargarEventListeners();


function cargarEventListeners(){
    cursos.addEventListener('click', comprarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //Al cargar el documento, 
    document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function vaciarCarrito(e){
    //listaCursos.innerHTML = "";
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false;
}

function eliminarCurso(e){
        e.preventDefault();
        let curso;
        if(e.target.classList.contains('borrar-curso')){
            e.target.parentElement.parentElement.remove();
            curso = e.target.parentElement.parentElement;
            cursoID = curso.querySelector('a').getAttribute('data-id');
            eliminarCursoLocalStorage(cursoID);
        }
}

function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    // Obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    // Iteramos comparando el ID del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    // Añadimos el arreglo actual a storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}



function comprarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        console.log(curso);
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent, 
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    };

    console.log(infoCurso);
    insertarCarrito(infoCurso);
}

function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td> 
    <img src="${curso.imagen}" width=100>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `;

    listaCursos.appendChild(row);
    insertarCarritoLocalStorage(curso);
}

function insertarCarritoLocalStorage(curso){
    console.log("Guardamos curso en local storage");
    let cursos = obtenerCursosLocalStorage();
    console.log(cursos);
    cursos.push(curso);
    console.log(cursos);
    localStorage.setItem("cursos", JSON.stringify(cursos));
}

function obtenerCursosLocalStorage() {
    let cursosLS;

    // comprobamos si hay algo en localStorage
    if(localStorage.getItem('cursos') === null) {
         cursosLS = [];
    } else {
         cursosLS = JSON.parse( localStorage.getItem('cursos') );
    }
    return cursosLS;

}


function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        // constrir el template
        const row = document.createElement('tr');
        row.innerHTML = `
             <td>  
                  <img src="${curso.imagen}" width=100>
             </td>
             <td>${curso.titulo}</td>
             <td>${curso.precio}</td>
             <td>
                  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
             </td>
        `;
        listaCursos.appendChild(row);

    });
}