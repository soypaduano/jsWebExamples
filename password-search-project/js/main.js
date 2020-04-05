let timeStarted = false, sec = 0, password = "";
//f respects
let puedePulsarF = false; fPulsado = false;

$(document).ready(function () {
  seePasswordListener();
  inputTextChanged();
  checkErrors();
});


function addNewError(errorMessage, id){
  errorTemplate = "<li id='" + id + "' class='error animated bounceInUp'><span></span><p class='errorText'>" + errorMessage + "</p></li>"
  $(errorTemplate).prependTo('#error-list');
}

function setCorrect(id){
  $('#' + id).removeClass('error animated bounceInUp');
  $('#' + id).addClass('correct');
  $('#' + id).appendTo('#error-list');
}

function updateCorrectToErrorAgain(id){
  if($('#' + id).hasClass('correct')){
    $('#' + id).removeClass('correct');
    $('#' + id).prependTo('#error-list');
    $('#' + id).addClass('error animated bounceInUp');
  }

}

function inputTextChanged() {
  $('#textPassword').on('input', function (e) {
    if(!timeStarted) startTimer();
    password = $(this).val();
    checkErrors();
  });
}

function checkErrors(){

  let allCorrects = true;
  for(let i = 0; i < Object.entries(errorsToCheck).length; i++){
    let element = Object.entries(errorsToCheck)[i];
    let id = element[0];
    let func = element[1].function;
    let onTheList = element[1].onTheList;
    let correct = element[1].correct;
    let message = element[1].message;

    if(onTheList){
      if(func()){
        setCorrect(id);
      } else {
        updateCorrectToErrorAgain(id);
        allCorrects = false;
      }
    }

    if(!onTheList && allCorrects){
      if(func()){
        addNewError(message, id);
        element[1].onTheList = true;
        setCorrect(id);
        return;
      } else {
        addNewError(message, id);
        element[1].onTheList = true;
        return;
      }
    }
  }
}

function startTimer(){
  timeStarted = true;
    setInterval( function(){
      $('#timeText').text(pad(++sec%60) + ":" + pad(parseInt(sec/60,10)))
    }, 1000);
}

function pad ( val ) { return val > 9 ? val : "0" + val; }
function addOneToCounter(){
  ++totalSeconds;

}

function seePasswordListener() {
  $('#seePassword').on('click touch', function () {
    let $textPassword = $('#textPassword');

    if ($($textPassword).attr("type") === "password") {
      $($textPassword).attr("type", "text");
      $(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close')
    } else {
      $($textPassword).attr("type", "password");
      $(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open')
    }
  });
}

let errorsToCheck = {
  "withOneNumber": {
    "function": () => {
      return /\d/.test(password);
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener un número.",
    "correct": false
  },
  "FtoPayRespects": {
    "function": () => {
      puedePulsarF = true;
      return fPulsado;
    }, 
    "onTheList": false,
    "message": "Pulsa F para dar respetos",
    "correct": false
  },
  "longerThan8": {
    "function": () => {
      return password.length > 8;
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener más de 8 caracteres",
    "correct": false
  },
  "startWithCaps": {
    "function": () => {
      return /[A-Z]/.test(password[0]);
    }, 
    "onTheList": false,
    "message": "La contraseña debe empezar por mayusculas",
    "correct": false
  },
  "withEmoji": {
    "function": () => {
      return isEmoji(password);
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener un emoji",
    "correct": false
  },
  "Zletter": {
    "function": () => {
      return password.includes('z') || password.includes('Z');
    }, 
    "onTheList": false,
    "message": "La contraseña debe contener la letra Z",
    "correct": false
  }
 
}


function isEmoji(str) {
  var ranges = [
      '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
  ];
  if (str.match(ranges.join('|'))) {
      return true;
  } else {
      return false;
  }
}

document.addEventListener('keyup', (e) => {
  if(puedePulsarF){
    if (e.code === "KeyF") {
      fPulsado = true;
      checkErrors();
  }
}
});