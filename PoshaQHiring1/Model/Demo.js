/*var mongoose=require('mongoose');

var DemoSchema=mongoose.Schema({
	category:{
		type:String
	}
});

var Demo = module.exports = mongoose.model('demo',DemoSchema);

//add label
module.exports.create_category = function(label,callback){
	Demo.create(label,callback);
}

module.exports.get_category = function(collectionname,callback){
	var query=Demo.find();
	query.exec(function(err,res){
		res.forEach(function(r){
			console.log(r.category);
		});
	});
	console.log(query);
	/*Demo.find(function(err,result){
		if(err)
			throw err;
		console.log(result);
	});
	
}*/




var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demoSchema = new Schema({
   category:String
});
module.exports = mongoose.model('demo', demoSchema);