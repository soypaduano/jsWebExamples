const listaTweets = document.getElementById('lista-tweets');


initEventListeners();


function initEventListeners(){
	document.querySelector('#formulario').addEventListener('submit', agregarTweet);
	//Borra tuits
	listaTweets.addEventListener('click', borrarTweet);
	//Contenido cargado
	document.addEventListener('DOMContentLoaded', localStorageListo);
}

function localStorageListo(){
	let tweets;
	tweets = obtenerTuitsLocalStorage();
	console.log(tweets);

	for(var i = 0; i < tweets.length; i++){
		const tweet = tweets[i];
		const li = document.createElement('li');
		const botonBorrar = document.createElement('a');
		botonBorrar.classList = 'borrar-tweet';
		botonBorrar.innerText = 'X';
		li.innerText = tweet;
		listaTweets.appendChild(li);
		li.appendChild(botonBorrar);
	}
}

function agregarTweet(e){
	e.preventDefault();
	console.log('Formulario enviado');
	const tweet = document.getElementById('tweet').value;
	const li = document.createElement('li');
	const botonBorrar = document.createElement('a');
	botonBorrar.classList = 'borrar-tweet';
	botonBorrar.innerText = 'X';
	li.innerText = tweet;
	listaTweets.appendChild(li);
	li.appendChild(botonBorrar);
	console.log(tweet);
	agregarTuitLocalStorage(tweet);

}

function obtenerTuitsLocalStorage(){
	let tweets;
	//revisamos valors
	if(localStorage.getItem('tweets') === null){
		tweets = [];
	} else {
		tweets = JSON.parse(localStorage.getItem('tweets'));
	}
	return tweets;
}

function agregarTuitLocalStorage(value){
	let tweets;
	tweets = obtenerTuitsLocalStorage();
	//agregamos a local storage
	tweets.push(value);
	localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(e){
	e.preventDefault();
	if(e.target.className === 'borrar-tweet'){
		console.log(e.target.parentElement.innerText)
		e.target.parentElement.remove();
		borrarTuitLocalStorage(e.target.parentElement.innerText);

	}
}

function borrarTuitLocalStorage(value){
	let tweets, tweetBorrar;
	tweetBorrar = value.substring(0, value.length - 1);
	console.log(tweetBorrar);
	console.log(tweetBorrar);
	console.log(tweetBorrar);
	tweets = obtenerTuitsLocalStorage();
	for(var i = 0; i < tweets.length; i++){
		if(tweetBorrar === tweets[i]){
			tweets.splice(i, 1);
		}
	}

	localStorage.setItem("tweets", JSON.stringify(tweets));
	console.log(value);


}



