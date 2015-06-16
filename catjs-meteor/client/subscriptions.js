//Role Collections
Meteor.subscribe("role.student");
Meteor.subscribe("role.student.profile");
Meteor.subscribe("role.student.group");
Meteor.subscribe("role.student.traits");

Meteor.subscribe("role.analyst");
Meteor.subscribe("role.analyst.profile");

//Core Collections
Meteor.subscribe("core.test",Meteor.userId());
Meteor.subscribe("core.item",Meteor.userId());
Meteor.subscribe("core.model");



//Core helper Collections
Meteor.subscribe("core.test.run");
Meteor.subscribe("core.test.availability");
Meteor.subscribe("core.test.model");
Meteor.subscribe("core.test.calibration");


