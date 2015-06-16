//item.js

/*
Order of the file 

    analyst item view events
    				  helpers

    analyst item edit events

*/

Template.wd_analyst_items_view.events({
	"click .pure-export" : function(event) {
		Helpers.slidetext("Exportando el item a tests");
		newid = $('.pure-item-selected').attr('title');
		Meteor.call("export_item",newid);
	},
	"click .pure-item": function(event) {
		$(".pure-item-selected").removeClass("pure-item-selected");
		var targetid = '[title='+'"'+event.target.title+'"]'
		Session.set('wd_analyst_item',event.target.title);
		$(targetid+".pure-item").addClass("pure-item-selected");
		return false;
	},
	"click .pure-edit" : function(event){
		Helpers.slidetext("Editando item !");
		//Load this item in the personal viewport database
		newid = $(".pure-item-selected").attr('title');
		//Cargar el objeto con el nombre name de la DB grande
		obj = core$item.findOne({_id : newid});

		//Call the viewport from the event on DB.
		GUI$arrays._collection.update({name : "item"},{
				name : "item",
				item : obj},
			{upsert : true}
		);
		GUI$arrays._collection.update({name : "options"},{
				name : "options",
				options : obj.options},
			{upsert : true}
		);
		GUI$arrays._collection.update({name : "tags"},{
				name : "tags",
				tags : obj.tags},
			{upsert : true}
		);
		// select obj.selected_option
		$(".pure-button-option-selected").removeClass("pure-button-option-selected");
		var targetid = '[name='+'"'+obj.selected_option+'"]'
		$(targetid+".pure-button-option").addClass("pure-button-option-selected");
		setTimeout(function(){
			$(targetid+".pure-button-option").addClass("pure-button-option-selected");
			console.log("2safter");
		},300);
		console.log($(targetid+".pure-button-option"));
		Session.set('selected_option',obj.selected_option);

	},
	"click .pure-minus" : function(event){
		Helpers.slidetext("Item borrado de la Base de Datos");
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
			state : "new"
		}
		GUI$arrays._collection.update({name : "options"},{
				name : "options",
				options : [],
			},
			{
				upsert : true
			}
		);
		GUI$arrays._collection.update({name : "tags"},{
				name : "tags",
				tags : [],
			},
			{
				upsert : true
			}
		);
		GUI$arrays._collection.update({name : "item"},{
				name : "item",
				item : item,
			},
			{
				upsert : true
			}
		);
		console.log(GUI$arrays._collection.findOne({name: "item"}));		
	}
});



Template.wd_analyst_items_view.helpers({
	items : function(){
		return core$item.find({ state: "new"});
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
			currentItem = itm.item;
			currentItem.options = opt;
			currentItem.tags = tgs;
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
				createdBy : Meteor.userId()
			}
		}


		
		return currentItem;
	},
});

Template.wd_analyst_item_edit.events({
	"blur .itemopti" : function(event){
		val = event.target.value;
		orgnam = event.target.name;
		console.log(orgnam);
		var targetid = '[name='+'"'+orgnam+'"]';
		$(targetid).each(
			function(){
				if(this.name){
					this.name = val;
				}
				else{
				//this.attr('name',val);
				this.setAttribute("name",val);
				}
			});
		orgnam = event.target.name;
		console.log(orgnam);
	},
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
		options.push(Helpers.randomID(5));
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
		tags.push(Helpers.randomID(5));
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
		console.log(event.target);
		tm = event.target;
		Session.set('selected_option',tm.getAttribute('name'));
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
		var itm = GUI$arrays._collection.findOne({name : "item"});
		cid = 99;
		if(itm){cid = itm.item._id;
		console.log(cid);}

		item = {
			_id : cid,
			name : itemname,
			description : itemdesc,
			text : itemtext,
			question : itemques,
			options : options,
			tags : tags,
			CreatedAt : CreatedAt,
			state : "new",
			author : Meteor.userId(),
			selected_option : Session.get("selected_option")
		}	

		if(cid==99) {
			delete item._id;
			console.log("item for insertion");
			console.log(item);
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
			if(options.length>2 && tags.length>1){
				item.author=Meteor.userId();
				if(Session.get('selected_option')){
					console.log('selected_option');
					Meteor.call("add_item",item);
					Session.set('selected_option',false);
					$(".pure-plus").trigger("click");
					console.log("item added to db");
				Helpers.slidetext("Item Guardado en Base de Datos");
				}
				else{
					Helpers.slidetext("Cuidado, no seleccionaste una opcion");
				}
			}
			else {
				if(tags.length<2){window.alert("Mas Etiquetas harian un mejor item");}
					else{
						window.alert("Mas opciones harian un mejor item");
				}
			}
		}
			else {
				window.alert("Aun te faltan algunos campos por llenar");
			}

	}
});
