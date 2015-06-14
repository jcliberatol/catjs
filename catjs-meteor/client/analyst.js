GUI$arrays = new Mongo.Collection("gui.arrays");

Template.wd_analyst_navbar.events({
	"click .pure-menu-item":function(event) {
		var targetid = event.target.id;
		$(".pure-menu-selected").removeClass("pure-menu-selected");
		Session.set('wd_analyst_viewport_window',targetid);
		console.log("wd_analyst_viewport_window","enabled",targetid);
		$(event.target).addClass("pure-menu-selected");
	}
});

Template.wd_analyst_items_view.events({
	"click .pure-item": function(event) {
		$(".pure-item-selected").removeClass("pure-item-selected");
		var targetid = '[title='+'"'+event.target.title+'"]'
		Session.set('wd_analyst_item',event.target.title);
		$(targetid+".pure-item").addClass("pure-item-selected");
		return false;
	},
	"click .pure-edit" : function(event){
		//Load this item in the personal viewport database
		name = $(".pure-item-selected").attr('title');
		//Cargar el objeto con el nombre name de la DB grande
		obj = core$item.findOne({name : name});
		console.log(obj);
		//Call the viewport from the event on DB.
		GUI$arrays._collection.update({name : "item"},{
				name : "item",
				item : obj},
			{upsert : true}
		);
	},
	"click .pure-minus" : function(event){
		//Load the item
		name = $(".pure-item-selected").attr('title');
		//Call delete method on name of item
		Meteor.call('delete_item',name);
	},
	"click .pure-plus" : function(event){
		//Reload the viewport with new elements
		item = {
			name : "",
			description : "",
			text : "",
			question : "",
			options : "",
			tags : "",
			CreatedAt : Date(),
		}
		GUI$arrays._collection.update({name : "item"},{
				name : "item",
				item : item,
			},
			{
				upsert : true
			}
		);
	}
});

Template.wd_analyst_viewport.helpers({
	items_selected : function(){
		console.log('viewport request for analyst window');
		return Session.get('wd_analyst_viewport_window')=="nav-items";
	},
	tests_selected : function(){
		console.log('viewport request for analyst window');
		return Session.get('wd_analyst_viewport_window')=="nav-tests";
	},
	results_selected : function(){
		console.log('viewport request for analyst window');
		return Session.get('wd_analyst_viewport_window')=="nav-results";
	},
	profile_selected : function(){
		console.log('viewport request for analyst window');
		return Session.get('wd_analyst_viewport_window')=="nav-profile";
	}
});

Template.wd_analyst_items_view.helpers({
	items2 : [
		{ name : "mate1",
		  tags : ["calculo","funciones"] },
		{ name : "mate2",
		  tags : ["calculo","limites" ,"precalculo","biologia de focas"] },
		{ name : "mate3",
		  tags : ["calculo","ecuacion del calor"] },
		{ name : "mate4",
		  tags : ["calculo","ley del emparedado","dificiles de calculo"] },
	],

	items : function(){
		return core$item.find({});
	},
	selected_item : {
			name: "historia1",
			text: "Si napoleon bonaparte conquistara america hoy en dia.",
			question: "¿Como le iria?",
			options : ["bien","mal","regular sinh","muy mal"],
			selected_option : "bien",
			iframe : "none",
			tags : ["historia","random","napoleon"],
			description : "Un item sencillo",
			createdBy : "Juanito",
	},

	selected_item2 : function(){
		//Now replace this by the GUI item collection which is 
		//either loaded from the DB on button click , or created new
		//and then loaded from the DB on button click, also when edition is finalized
		//New document is created again.
		var dct = GUI$arrays._collection.findOne({name : "options"});
		if (dct){opt = dct.options;}
		else {opt = [];}
		var dct = GUI$arrays._collection.findOne({name : "tags"});
		if (dct){tgs = dct.tags;}
		else {tgs = [];}
		var itm = GUI$arrays._collection.findOne({name : "item"});
		if (itm){
			console.log("item from db");
			currentItem = itm.item;
			currentItem.options = opt;
			currentItem.tags = tgs;
			console.log(currentItem);
		}
			else {
				currentItem = {
					name: "",
					text: "",
					question : "",
					options : opt,
					selected_option : "",
					tags : tgs,
					description : "",
					createdBy : Meteor.user()
				}
			}


		
		return currentItem;
	},
});

Template.wd_analyst_item_edit.events({
	"submit .pure-form" : function(event){
		return false;
	},
	"click .button-tag-remove":function(event){
		rem = event.target.name;
		var targetid = '[name='+'"'+rem+'"]'
		$(targetid+'.pure-button-tag').remove();
		//renegotiate with db
		var tags = Array();
		$('.itemtags').each(
			function(){
				tags.push(this.value);
			}
		);
		GUI$arrays._collection.update({name : "tags"},{
				name : "tags",
				tags : tags,
			},
			{
				upsert : true
			}
		);
		return false
	},
	"click .button-option-remove":function(event){
		rem = event.target.name;
		var targetid = '[name='+'"'+rem+'"]'
		$(targetid+'.pure-button-option').remove();
		//renegotiate with db
		var options = Array();
		$('.itemopti').each(
			function(){
				options.push(this.value);
			}
		);
		GUI$arrays._collection.update({name : "options"},{
				name : "options",
				options : options,
			},
			{
				upsert : true
			}
		);
		return false
	},
	"click .option-add-button":function(event){
		//Current options must go to the DB first
		var options = Array();
		$('.itemopti').each(
			function(){
				options.push(this.value);
			}
		);
		options.push(" Opcion ");
		GUI$arrays._collection.update({name : "options"},{
				name : "options",
				options : options,
			},
			{
				upsert : true
			}
		);
		return false;
	},
	"click .tag-add-button": function(event){
		//Current options must go to the DB first
		var tags = Array();
		$('.itemtags').each(
			function(){
				tags.push(this.value);
			}
		);
		tags.push(" Etiqueta");
		GUI$arrays._collection.update({name : "tags"},{
				name : "tags",
				tags : tags,
			},
			{
				upsert : true
			}
		);
		return false;
	},
	"click .pure-button-option":function(event) {
		//Save options in database to name reaction
	var options = Array();
		$('.itemopti').each(
			function(){
				options.push(this.value);
			}
		);
		//
		GUI$arrays._collection.update({name : "options"},{
				name : "options",
				options : options,
			},
			{
				upsert : true
			}
		);
		
		$(".pure-button-option-selected").removeClass("pure-button-option-selected");
		var targetid = '[name='+'"'+this+'"]'
		$(targetid+".pure-button-option").addClass("pure-button-option-selected");
		return false;
	},
	"click .pure-button-tag":function(event) {
		//Save options in database to name reaction
		var tags = Array();
		$('.itemtags').each(
			function(){
				tags.push(this.value);
			}
		);
		//
		GUI$arrays._collection.update({name : "tags"},{
				name : "tags",
				tags : tags,
			},
			{
				upsert : true
			}
		);
		$(".pure-button-tag-selected").removeClass("pure-button-tag-selected");
		var targetid = '[name='+'"'+this+'"]'
		$(targetid+".pure-button-tag").addClass("pure-button-tag-selected");
		return false;
	},	
	"click .item-button-finish":function(event) {
		//Let's bring everything boys, here's the market list :
		/*
		Nombre del item   class = .itemname
		Descripcion       class = .itemdesc
		Texto                     .itemtext
		Pregunta                  .itemques
		Opciones                  .itemopti
		Etiquetas                 .itemtags

		Autofills :
		CreatedBy :
		CreatedAt :
		*/
		itemname = $('.itemname')[0].value;
		itemdesc = $('.itemdesc')[0].value;
		itemtext = $('.itemtext')[0].value;
		itemques = $('.itemques')[0].value;
		console.log(itemname);
		console.log(itemdesc);
		console.log(itemtext);
		console.log(itemques);
		var options = Array();
		$('.itemopti').each(
			function(){
				options.push(this.value);
			}
		);
		console.log(options);
		var tags = Array();
		$('.itemtags').each(
			function(){
				tags.push(this.value);
			}
		);
		console.log(tags);
		CreatedAt = Date();
		console.log(CreatedAt);

		

		/**
		Ceremony is finished, push to the moon
		**/
		item = {
			name : itemname,
			description : itemdesc,
			text : itemtext,
			question : itemques,
			options : options,
			tags : tags,
			CreatedAt : CreatedAt
		}
		GUI$arrays._collection.update({name : "item"},{
				name : "item",
				item : item,
			},
			{
				upsert : true
			}
		);
		console.log(item);

		//Before meteor.call we must validate

		if(itemname!=""&&itemdesc!=""&&itemtext!=""&&itemques!=""){
			console.log("Make sure ur not missing options");
			if(options.length>2){
			Meteor.call("add_item",item);
			console.log("item added to db");
		}
		}

	}
});



/*
Custom localizing js for accounts
*/


Helpers = {
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