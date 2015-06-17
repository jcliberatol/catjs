Router.route('/', function () {
    this.render('home');
});
Router.route('/analyst');

Router.route('/cat/', function () {
  this.render('cat', {
    data: function () {
    	console.log("where i am ?");
    	console.log(core$test$run.find({}));
      return core$test$run.find({});
    }
  });
});