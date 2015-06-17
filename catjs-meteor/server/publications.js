//Role Collections
Meteor.publish("role.student",function(){});
Meteor.publish("role.student.profile",function(){});
Meteor.publish("role.student.group",function(){});
Meteor.publish("role.student.traits",function(){});

Meteor.publish("role.analyst",function(){});
Meteor.publish("role.analyst.profile",function(){});

//Core Collections
Meteor.publish("core.test",function(){
	if(this.userId){
	return core$test.find({'author': this.userId})
	}
	else{
		console.log("no auth tst :c",this.userId);
	}

});
Meteor.publish("core.item",function(){
	if(this.userId){
	return core$item.find({'author': this.userId});
	}
	else {
		console.log("no auth itm :c", this.userId);
	}
});

Meteor.publish("core.model",function(){});

//Core helper Collections
Meteor.publish("core.test.run",function(){
	if(this.userId){
		return core$test$run.find({});
	}
});
Meteor.publish("core.test.availability",function(){});
Meteor.publish("core.test.model",function(){});
Meteor.publish("core.test.calibration",function(){}); 