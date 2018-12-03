console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUser = new Promise(function(todoBien, todoMal) {
  //Llamar un API
  setTimeout(function(){
    todoMal("Se acabó el tiempo");
  }, 4000);
});

getUser
  .then(function(){
    console.log("Todo está bien");
  }).catch(function(message){
    console.log("Algo fue mal y la razón fue " + message);
  });


  //Varias promesas -> Cuando una sola está mal, se sale de todas las promesas, en caso de que todas estén bien, imprime todos los mensajes. 
  //Si quieres el mensaje de aquella que llegue primera: promise.race.
  Promise.all([
    getUser,
    getUser,
    getUser
  ]).then(function(){
    console.log("Promesas finalizadas");
  }).catch(function(message){
    console.log()
  });


  //Funciones asincronas! 