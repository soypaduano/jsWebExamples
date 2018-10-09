const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos  = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

cargarEventListeners();


function cargarEventListeners(){
    cursos.addEventListener('click', comprarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
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
            console.log(e.target.parentElement.parentElement.remove());
        }
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



}