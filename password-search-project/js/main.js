

$(document).ready(function(){
    $('#seePassword').on('click touch', function(){
        let $textPassword = $('#textPassword');
        
        if ($($textPassword).attr("type") === "password") {
            $($textPassword).attr("type", "text");
            $(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close')
          } else {
            $($textPassword).attr("type", "password");
            $(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open')
          }
        });
    });