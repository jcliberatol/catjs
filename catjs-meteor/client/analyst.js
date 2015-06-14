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
	items : [
		{ name : "mate1",
		  tags : ["calculo","funciones"] },
		{ name : "mate2",
		  tags : ["calculo","limites" ,"precalculo","biologia de focas"] },
		{ name : "mate3",
		  tags : ["calculo","ecuacion del calor"] },
		{ name : "mate4",
		  tags : ["calculo","ley del emparedado","dificiles de calculo"] },
	],

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
		var dct = GUI$arrays._collection.findOne({name : "options"});
		if (dct){opt = dct.options;}
		else {opt = [];}
		var dct = GUI$arrays._collection.findOne({name : "tags"});
		if (dct){tgs = dct.tags;}
		else {tgs = [];}
		return {
			name: "historia1",
			text: "Si napoleon bonaparte conquistara america hoy en dia.",
			question: "¿Como le iria?",
			options : opt,
			selected_option : "bien",
			iframe : "none",
			tags : tgs,
			description : "Un item sencillo",
			createdBy : "Juanito",
		}
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
		options.push("");
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
		tags.push("");
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

		//At this point , get ready to push to the moon.



	}
});