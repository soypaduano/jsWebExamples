//Variables
const presupuestoUsuario = prompt("Cual es tu presupuesto semanal??");
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;



//Clases
class Presupuesto{
    constructor(presupuesto_){
        this.presupuesto = Number(presupuesto_);
        this.restante = Number(presupuesto_)
    }

    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}

class Interfaz {
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
        }, 3000);
    }

    //Inserta gastos a la lista
    agregarGasto(nombreGasto, cantidadGasto){
        const gastoListado = document.querySelector('#gastos ul');
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between-align-items-center';
        li.innerHTML = `${nombreGasto} <span class="badge badge-primary badge-pill">$   ${cantidadGasto} </span> `;
        gastoListado.appendChild(li);
    }
}


//Event listener
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    } else {
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    const ui = new Interfaz();

    if(nombreGasto === '' || cantidadGasto === ''){
        ui.imprimirMensaje("Hubo un error", "error"); //mensaje y tipo
    } else {
        ui.imprimirMensaje("Correcto", "correcto");
        ui.agregarGasto(nombreGasto, cantidadGasto);
    }
});