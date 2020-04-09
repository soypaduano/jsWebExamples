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

  (async function load() {
    // await
    // action
    // terror
    // animation
    async function getData(url) {
      const response = await fetch(url);
      const data = await response.json()
      return data;
    }
  
    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
    const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
    const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation')
    console.log(actionList, dramaList, animationList)
  })()

  //Selectores
  