/*
Collection convention

package$meteorCollection = new Mongo.Collection("meteorCollection")

*/

//Role Collections
role$student = new Mongo.Collection("role.student");
role$analyst = new Mongo.Collection("role.analyst");

//Core Collections
core$test = new Mongo.Collection("core.test");
core$item = new Mongo.Collection("core.item");
core$model = new Mongo.Collection("core.model");

//Role helper Collections
role$student$profile = new Mongo.Collection("role.student.profile");
role$student$group = new Mongo.Collection("role.student.group");
role$student$traits = new Mongo.Collection("role.student.traits");
role$analyst$profile = new Mongo.Collection("role.analyst.profile");

//Core helper Collections
core$test$run = new Mongo.Collection("core.test.run");
core$test$availability = new Mongo.Collection("core.test.availability");
core$test$model = new Mongo.Collection("core.test.model");
core$item$calibration = new Mongo.Collection("core.test.calibration");
