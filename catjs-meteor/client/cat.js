Template.cat.helpers({
	test_list : function(){
		console.log("this");
		console.log(this.collection._docs._map);
		return this;
	},
	test_view : function(){
		return core$test.findOne({_id : this.testid});
	},
	item_list : function(){
		query = core$test.findOne({_id : this.testid});
		return query.items;
	}
});