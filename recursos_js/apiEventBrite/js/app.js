const eventBrite = new EventBrite();
const ui = new Interfaz();

//busqueda 
document.getElementById('buscarBtn').addEventListener('click', (e) => {
    e.preventDefault();
    //busqueda de texto
    const textoBuscador = document.getElementById('evento').value;
    const categorias = document.getElementById('listado-categorias');
    const categoriaSeleccionada = categorias.options[categorias.selectedIndex].value;

    console.log(textoBuscador);
    console.log(categoriaSeleccionada);

    if(textoBuscador === '' || categoriaSeleccionada === ''){
        ui.mostrarMensaje('Escribe algo en el buscador', 'alert alert-danger mt-4');
    } else {
        eventBrite.obtenerEventos(textoBuscador, categoriaSeleccionada)
        .then(eventos => {
            console.log(eventos);
            if(eventos.eventos.events.length > 0){
                ui.mostrarEventos(eventos.eventos.events);
            } else {
               ui.mostrarMensaje("No hay resultados", 'alert alert-danger mt-4');
            }
        })
    }
});