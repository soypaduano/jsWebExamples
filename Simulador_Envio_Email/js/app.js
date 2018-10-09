const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');



eventListener();

function eventListener(){
    document.addEventListener('DOMContentLoaded', inicioApp);


    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
    btnEnviar.addEventListener('click', enviarEmail);
    resetBtn.addEventListener('click', resetForm);
}

function resetForm(e){
    e.preventDefault();
    formularioEnviar.reset();

}

function validarCampo(){
    validarLongitud(this);
    
    if(this.type === 'email'){
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');
    if(email.value !== '' && asunto.value !== '' && mensaje.value !==''){
        if(errores.length === 0){
            btnEnviar.disabled = false;
        }
    }
};


function enviarEmail(e){
    e.preventDefault();
    console.log("email enviado");
    const spinneGif = document.querySelector('#spinner');
    spinneGif.style.display = 'block';

    setTimeout(function() {
        spinneGif.style.display = 'none';
        const enviado = document.createElement('img');
        enviado.src = 'img/mail.gif';
        enviado.style.display = 'block';
        document.querySelector('#loaders').appendChild(enviado);
        setTimeout(function(){
            enviado.remove();
        }, 3000);
    }, 3000);
}

function validarEmail(campo){
    const mensaje = campo.value;
    if(mensaje.indexOf('@') !== -1){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');

    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarLongitud(campo){
    console.log(campo);
    if(campo.value.length > 0){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function inicioApp(){
    btnEnviar.disabled = true;
}