//Role Collections
Meteor.publish("role.student",function(){});
Meteor.publish("role.student.profile",function(){});
Meteor.publish("role.student.group",function(){});
Meteor.publish("role.student.traits",function(){});

Meteor.publish("role.analyst",function(){});
Meteor.publish("role.analyst.profile",function(){});

//Core Collections
Meteor.publish("core.test",function(){});
Meteor.publish("core.item",function(){ return core$item.find({})});
Meteor.publish("core.model",function(){});

//Core helper Collections
Meteor.publish("core.test.availability",function(){});
Meteor.publish("core.test.model",function(){});
Meteor.publish("core.test.calibration",function(){});