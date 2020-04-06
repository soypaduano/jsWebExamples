let timeStarted = false, sec = 0, password = "", minutes = 0;
let gamePassed = false;
//f respects
let puedePulsarF = false; fPulsado = false;

$(document).ready(function () {
  seePasswordListener();
  listenerToRegister();
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
    $('#registerButton').removeClass('animated wobble');
    checkErrors();
  });
}

function checkErrors(){

  let allCorrects = true;
  for(let i = 0; i < Object.entries(errorsTest).length; i++){
    let element = Object.entries(errorsTest)[i];
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
      } else {
        addNewError(message, id);
        element[1].onTheList = true;
        return;
      }
    }
  }

  if(allCorrects) activateConfirmPassword();
}

function activateConfirmPassword(){
  $('.main-input-container.confirmPassword').show();
  $('.main-input-container.confirmPassword').addClass('animated bounceIn');
};

function startTimer(){
  timeStarted = true;
    setInterval( function(){
      minutes = pad(parseInt(sec/60,10));
      $('#timeText').text(pad(++sec%60) + ":" + pad(parseInt(sec/60,10)))
    }, 1000);
}

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

  $('#seePasswordConfirm').on('click touch', function () {
    let $textPassword = $('#textPasswordConfirm');

    if ($($textPassword).attr("type") === "password") {
      $($textPassword).attr("type", "text");
      $(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close')
    } else {
      $($textPassword).attr("type", "password");
      $(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open')
    }
  });
}

function listenerToRegister(){
  $('#registerButton').on('click touch', function () {
    let $this = this;
    if(!gamePassed){
      $(this).addClass('animated wobble');
      $('.main-input-container').addClass('error');
      setTimeout(function () { 
          $($this).removeClass('animated wobble');
          $('.main-input-container').removeClass('error');
      }, 1000);
    }
  });
}

let errorsTest = {
  "withOneNumber": {
    "function": () => {
      return /\d/.test(password);
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener un número.",
    "correct": false
  },
  "twoCaps": {
    "function": () => {
      return countUpperCaseChars(password) >= 2
    }, 
    "onTheList": false,
    "message": "La contraseña debe contener al menos 2 mayusculas",
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
  "todayYear": {
    "function": () => {
      let today = new Date();
      var yyyy = today.getFullYear();
      return password.includes(yyyy);
    }, 
    "onTheList": false,
    "message": "Debe contener el año en el que estamos",
    "correct": false
  }
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
  "twoCaps": {
    "function": () => {
      return countUpperCaseChars(password) >= 2
    }, 
    "onTheList": false,
    "message": "La contraseña debe contener al menos 2 mayusculas",
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
  "todayYear": {
    "function": () => {
      let today = new Date();
      var yyyy = today.getFullYear();
      return password.includes(yyyy);
    }, 
    "onTheList": false,
    "message": "Debe contener el año en el que estamos",
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
  "Zletter": {
    "function": () => {
      return password.includes('zz') || password.includes('ZZ') || password.includes('zZ') || password.includes('Zz');
    }, 
    "onTheList": false,
    "message": "La contraseña debe contener la letra z dos veces seguida",
    "correct": false
  },
  "squareRoot81": {
    "function": () => {
      return password.includes('9');
    }, 
    "onTheList": false,
    "message": "La contraseña debe incluir la raíz cuadrada de 81",
    "correct": false
  },
  "endsWithA": {
    "function": () => {
      return password[password.length - 1] === 'a';
    }, 
    "onTheList": false,
    "message": "La contraseña debe acabar con la letra 'a'",
    "correct": false
  },
  "currentMinute": {
    "function": () => {
      console.log(minutes);
      return password.includes(minutes);
    }, 
    "onTheList": false,
    "message": "La contraseña debe contener los minutos actuales del contador de arriba",
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
      return true;
      return isEmoji(password);
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener un emoji",
    "correct": false
  },
  "smallerThan13": {
    "function": () => {
      return password.length < 14;
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener menos de 13 caracteres",
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

function countUpperCaseChars(str) {
  var count=0,len=str.length;
  for(var i=0;i<len;i++) {
    if(/[A-Z]/.test(str.charAt(i))) count++;
  }
  return count;
}

function pad ( val ) { return val > 9 ? val : "0" + val; }

document.addEventListener('keyup', (e) => {
  if(puedePulsarF){
    if (e.code === "KeyF") {
      fPulsado = true;
      checkErrors();
  }
}
});

//Emoji: 😅