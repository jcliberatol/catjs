GUI$arrays = new Mongo.Collection("gui.arrays");

Meteor.startup(function () { 
  var map = [];
  $(document).on('keydown', function (e) {
  	map[e.keyCode] = e.type =='keydown';

  	//Conditionals run here
  	//crtl 17
  	//enter 13
  	//alt 18
  	// 37 & 39 flechas
  	// o 79  Insertar Opcion
  	// e 69  Insertar etiqueta
  	// n 78  Nombre del item
  	// d 68  
  	// t 84 
  	// p 89  
  	if(map[17] && map[8]){
  		$('.test-state-new').trigger("click");
  	}
  	if(map[17] && map[13]){
  		$('.item-button-finish').trigger("click");
  		$('.test-state-released').trigger("click");
  	}
  	if(map[17] && map[37]){
  		$("#nav-items").trigger("click");
  		return false;
  	}
  	if(map[17] && map[39]){
  		$("#nav-tests").trigger("click");
  		return false;
  	}
  	if(map[17] && map[79]){
  		$(".option-add-button").trigger("click");
  		return false;
  	}
  	if(map[17] && map[69]){
  		$(".tag-add-button").trigger("click");
  		return false;
  	}
  	if(map[17] && map[78]){
  		if(map[18]){
  			$(".pure-plus").trigger("click");
  			console.log("ctrlaltn");
  			return false;
  			}
  		else{
  			$(".itemname").focus();
  			console.log("ctrl-n");
  			return false;
  			}
  		}

  });
  $(document).on('keyup',function (e){
  	map[e.keyCode] = e.type == 'keydown';
  });

});


Template.wd_analyst_navbar.events({
	"click .pure-menu-item":function(event) {
		var targetid = event.target.id;
		$(".pure-menu-selected").removeClass("pure-menu-selected");
		Session.set('wd_analyst_viewport_window',targetid);
		$(event.target).addClass("pure-menu-selected");
	}
});

Template.wd_analyst_tests_edit.helpers({
	open_test : function(){
		log = core$test$run.findOne({testid : this._id , state : "open"});
		return log;
	},
	item_full : function(){
		return core$item.findOne({ _id : this._id});
	},
	exporteditems : function(){
		console.log(core$item.find({ state: "exported"}));
		console.log(core$item.findOne({ state: "exported"}));
		return core$item.find({ state: "exported"});
	},
	test_state_new : function(){
		tid = Session.get('wd_analyst_test');
		ctest = core$test.findOne({_id : tid});
		return ctest.state=="nuevo";
	},
	test_state_verified : function(){
		tid = Session.get('wd_analyst_test');
		ctest = core$test.findOne({_id : tid});
		return ctest.state=="verificado";
	},
	test_state_released : function(){
		tid = Session.get('wd_analyst_test');
		ctest = core$test.findOne({_id : tid});
		return ctest.state=="liberado";
		//Crear un test asociado a este que contenga respuestas y todo
	},
});

Template.wd_analyst_tests_edit.events({
	"click .pure-item": function(event) {
		$(".pure-item-selected").removeClass("pure-item-selected");
		var targetid = '[title='+'"'+event.target.title+'"]'
		Session.set('wd_analyst_item',event.target.title);
		$(targetid+".pure-item").addClass("pure-item-selected");
		return false;
	},
	"click .pure-back": function(event){
		Helpers.slidetext("Quitando el item de items exportados");
		newid = $('.pure-item-selected').attr('title');
		Meteor.call("tag_as_new_item",newid);
		return false;
	},
	"click .pure-check":function(event){
		Helpers.slidetext("Item seleccionado");
		itemid = $(".pure-item-selected").attr("title");
		testid = Session.get('wd_analyst_test');
		Meteor.call("add_item_to_test",itemid,testid);
		Meteor.call("set_temporary_state",itemid,"ontest");
		return false;
	},
	"submit .pure-form":function(event){
		return false;
	},
	"blur .testname":function(event){
		testid = Session.get('wd_analyst_test');
		Meteor.call('update_test_name',testid,event.target.value);
	},
	"blur .testdesc":function(event){
		testid = Session.get('wd_analyst_test');
		Meteor.call('update_test_desc',testid,event.target.value);
	},
	"click .tag-add-button": function(event){
		testid = Session.get('wd_analyst_test');
		tag = $(".itemtags")[0].value;
		if(!tag){
			Helpers.slidetext('Inserta algun texto en la etiqueta');
		}
		else{
		Helpers.slidetext("Etiqueta añadida :"+tag);
		Meteor.call('add_tag_test',testid,tag);
		$(".itemtags")[0].value="";
		}
	},
	"click .delete-tag" : function(event){
		console.log(event.target.name);
		testid = Session.get('wd_analyst_test');
		Meteor.call('delete_tag_test',testid,event.target.name);
	},
	"click #item-remove": function(event){
		console.log(event.target.name);
		testid = Session.get('wd_analyst_test');
		Meteor.call('remove_test_item',testid,event.target.name);	
	},
	"click .test-state-new":function(event){
		testid = Session.get('wd_analyst_test');
		Meteor.call("update_test_state",testid,"nuevo");
	},
	"click .test-state-released":function(event){
		testid = Session.get('wd_analyst_test');
		Meteor.call('start_test_run',tid);
		Meteor.call("update_test_state",testid,"liberado");
	},
	"click .item-button-finish":function(event){
		//Esto cambia el estado del item a item verificado y listo para salir al publico
		testid = Session.get('wd_analyst_test');
		//Verificaciones
		test = core$test.findOne({_id : testid});
		verified = true;
		if(test.tags.length < 1){
			Helpers.slidetext("Mas etiquetas servirian tal vez. ...");
			verified = false;
		}
		if(test.items.length < 1){
			Helpers.slidetext("Mas items servirian tal vez. ...");
			verified = false;
		}
		if(test.description == ""){
			Helpers.slidetext("Una descripcion mas descriptiva ? ...  tal vez. ...");
			verified = false;
		}

		if(verified){
		Helpers.slidetext("Item verificado !");
		Meteor.call('promote_to_verified',testid);
		}
	},
	"keypress input" : function(event){
		console.log(event);
		if(event.key=="Enter"){
			$(".tag-add-button").trigger("click");
		return false;
		}
		if (event.ctrlKey && event.key=="Enter"){
			Helpers.slidetext('control enter');
		}
	}
});
Template.wd_analyst_tests_view.events({
	"click .pure-item": function(event) {
		$(".pure-test-selected").removeClass("pure-test-selected");
		var targetid = '[title='+'"'+event.target.title+'"]'
		Session.set('wd_analyst_test',event.target.title);
		$(targetid+".pure-item").addClass("pure-test-selected");
		return false;
	},
	"click .pure-minus": function(event){
		testid = Session.get('wd_analyst_test');
		Meteor.call('delete_test',testid);
	},
	"click .pure-plus": function(event){
		Meteor.call('add_test');
	},
});

Template.wd_analyst_tests_view.helpers({
	tests : function(){
		return core$test.find({});
	},
	selected_test : function(){
		newid = Session.get('wd_analyst_test');
		//Seleccionar el test que esta en la seccion con jquery
		var targetid = '[title='+'"'+newid+'"]';
		$(targetid+".pure-test").addClass("pure-test-selected");
		test=core$test.findOne({_id : newid});
		return test;
	}
	
});

Template.wd_analyst_viewport.helpers({
	items_selected : function(){
		return Session.get('wd_analyst_viewport_window')=="nav-items";
	},
	tests_selected : function(){
		return Session.get('wd_analyst_viewport_window')=="nav-tests";
	},
	results_selected : function(){
		return Session.get('wd_analyst_viewport_window')=="nav-results";
	},
	profile_selected : function(){
		return Session.get('wd_analyst_viewport_window')=="nav-profile";
	}
});





/*
UI del test

navbar
__________________________________________________________________________________
						|							|
						|	Nombre del test			|	Total items : 5
	Test Viewport		|							|
				Btns	|	Descripcion				|	item item item item item
						|							|
	Test List			|	Etiquetas				|
						|		tag1		-		|
						|		tag2		-		|
						|		tag3		-		|
						|					+		|
						|							|
						|							|
						|							|
						|________________________________________________________							
						|						add to test      return to maker	
						|	Item list						
						|							
						|
						|

Roadmap

Add usegroups

Sanitize to show interface only when logged in
Show in the window a helper that retrieves the core.test.run of the actual item that is open.
Receive this open test by open and public in a list of tests on other part of the app


Items shown are only the user created ones, and the last 10 Same for tests
*/