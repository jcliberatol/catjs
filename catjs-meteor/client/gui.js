//gui.js
/*
Custom localizing js for accounts
*/


Helpers = {
	slidetext : function(text) {
		$('.state-text').css("opacity",1).css("display","block").css("top",0);
		$('.state-text').text(text).stop(true, false).animate({
			opacity: 0,
			top: "100%"
		},4000,function(){
			$('.state-text').css("opacity",1).css("display","none").css("top",0);
		});
		//
	},
	randomID: function(num)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < num; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
},
	firelocalize : function(){
		setTimeout(Helpers.localize,100);
		setTimeout(Helpers.localize,200);
		setTimeout(Helpers.localize,300);
		setTimeout(Helpers.localize,500);
		setTimeout(Helpers.localize,1000);
		setTimeout(Helpers.localize,2000);
		setTimeout(Helpers.localize,5000);
	},
	localize : function(){
  $("#login-sign-in-link").text('Registrate');
  $('.login-close-text').text('Cerrar Dialogo');
  $('#login-username-or-email-label').text('Email');
  $('#login-password-label').text('Contraseña');
  $('#signup-link').text('Registrarse!');
  $('#forgot-password-link').text('Olvide mi Contraseña');
  $('#login-buttons-forgot-password').text('Restaurar Contraseña');
  $('#back-to-login-link').text('Atras');
  $('#login-username-label').text('Usuario');
  $('#login-buttons-open-change-password').text('Cambiar Contraseña');
  $('#login-buttons-logout').text('Salir');
  $('#reset-password-new-password-label').text('Nueva Contraseña');
  $('#login-old-password-label').text('Contraseña Actual');
  $('#login-password-label').text('Nueva Contraseña');
  $('#login-buttons-do-change-password').text('Cambiar Contraseña');
  $('#login-buttons-password').text('Crear Cuenta');
  if ($('#login-buttons-password').text()=='Reset password') {
  	$('.message.error-message').text('Restaurar Contraseña');
  }
  if ($('#login-buttons-password').text()=='Sign in') {
  	$('.message.error-message').text('Registrarse');
  }
  if ($('#login-buttons-password').text()=='Create account') {
  	$('.message.error-message').text('Crear Cuenta');
  }
  if ($('.message.error-message').text()=='Invalid email') {
  	$('.message.error-message').text('Email Incorrecto');
  }
  if ($('.message.error-message').text().indexOf('Username must be at least 3 characters long') != -1) {
    $('.message.error-message').text('El nombre de usuario debe tener al menos tres caracteres');
  } else if ($('.message.error-message').text().indexOf('Incorrect password') != -1 || $('.message.error-message').text().indexOf('User not found') != -1) {
    $('.message.error-message').text('Contraseña incorrecta');
  }
	}
}

Template.loginButtons.onRendered(function() {
	setTimeout(Helpers.firelocalize,10);

  
});

Template.loginButtons.events({
	"click .login-link-and-dropdown-list":function(){
		Helpers.firelocalize();
	},
	"click .additional-link-container":function(){
		Helpers.firelocalize();
	},
	"click .login-button":function(){
		Helpers.firelocalize();
	},
	"click .login-container":function(){
		Helpers.firelocalize();
	},
	"click #back-to-login-link":function(){
		Helpers.firelocalize();
	}
});
