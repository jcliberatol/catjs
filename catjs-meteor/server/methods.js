Meteor.methods({
	add_item: function (item) {
		console.log(item);
		core$item.insert(item);
	},
	delete_item: function (nam) {
		core$item.remove({name : nam})
	},
});