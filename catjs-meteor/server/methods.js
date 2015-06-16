Meteor.methods({
	start_test_run : function(tid){

		//search for current test run.
		console.log("starting test run");
		current_run = core$test$run.findOne({testid : tid, state : "closed"});
		if(current_run){
			core$test$run.update({testid : tid},{ $set : "open"});
		}
		else{
			test = {
				openDate : Date(),
				testid : tid,
				responses : [],
				state : "open", //Or open, closed , finished
				group : "public",
			};
			core$test$run.insert(test);	
		}
	},
	update_test_state: function(test,statee){

		core$test.update(
			{_id:test},
			{
				$set: {
					state : statee
				}
			});
		console.log(core$test.findOne({_id : test}));
	},
	promote_to_verified: function(test){

		core$test.update(
			{_id:test},
			{
				$set: {
					state : "verificado"
				}
			});
		console.log(core$test.findOne({_id : test}));
	},
	add_item: function (item) {
		item.author = Meteor.userId();
		id = item._id;
		if(item.selected_option){
		if(id){
			core$item.update({_id : id},item,{upsert : true});	
		}
		else{
			core$item.insert(item);
		}}
		else{
			console.log("insert items only with an selected option")
		}
	},
	export_item:function (id){
		core$item.update(
			{_id:id},
			{
				$set: {
					state : "exported"
				}
			});
	},
	tag_as_new_item: function (id){
		core$item.update(
			{_id:id},
			{
				$set: {
					state : "new"
				}
			});
	},
	set_temporary_state: function (id,string){
		core$item.update(
			{_id:id},
			{
				$set: {
					state : string
				}
			});
		console.log(core$item.findOne({_id:id}));
	},
	delete_item: function (nam) {
		core$item.remove({_id : nam})
	},
	add_item_to_test: function(itemid,testid){
		it = core$item.findOne({_id : itemid});
		if(it){
			core$test.update({_id : testid},{ $push: { items : {name : it.name , _id : itemid}}});
		}
	},
	remove_test_item : function(id,itmid){
		console.log("rti "+id+" "+itmid)
		core$test.update({_id : id},{ $pull: { items: { _id: itmid} } });
		core$item.update({_id : itmid},{ $set:  { state: "exported"         } });
	},
	add_test: function () {
	test = {
			name: "Nuevo test",
			tags: [],
			items : [],
			description : "",
			author : Meteor.userId(),
			createdAt : Date(),
			state : "nuevo"
		}

	console.log(test.author);
	core$test.insert(test);
	},
	add_tag_test : function(id,tag){
		core$test.update({_id : id},{ $push : { tags : tag}})

	},
	update_test_name: function(tid,name){
		core$test.update({_id : tid},{ $set: {name: name}});
	},
	update_test_desc: function(tid,name){
		core$test.update({_id : tid},{ $set: {description: name}});
	},
	delete_test: function (nam) {
		core$test.remove({_id : nam})
	},
	delete_tag_test : function (id,tag){
		core$test.update({_id : id},{ $pull: { tags: tag}});
	}
});