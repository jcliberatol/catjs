Template.wd_analyst_navbar.events({
	"click .pure-menu-item":function(event) {
		var targetid = event.target.id;
		$(".pure-menu-selected").removeClass("pure-menu-selected");
		Session.set('wd_analyst_viewport_window',targetid);
		console.log("wd_analyst_viewport_window","enabled",targetid);
		$(event.target).addClass("pure-menu-selected");
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
});

Template.wd_analyst_item_edit.events({

	"click .pure-button-option":function(event) {
		$(".pure-button-option-selected").removeClass("pure-button-option-selected");
		var targetid = '[name='+'"'+this+'"]'
		$(targetid+".pure-button-option").addClass("pure-button-option-selected");
		return false;
	}	

});