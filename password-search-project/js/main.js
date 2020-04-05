let errorTemplate, timeStarted = false, sec = 0;

$(document).ready(function () {
  seePasswordListener();
  inputTextChanged();
  errorTemplate = "<li class='error animated bounceInUp'><span></span><p class='errorText'>La contraseña debe tener al menos 1 número</p></li>"
});


function addNewError(errorMessage){
  $('#error-list').append(errorTemplate);
}


function inputTextChanged() {
  $('#textPassword').on('input', function (e) {
    if(!timeStarted) startTimer();
    
    //alert('Changed!')
  });
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