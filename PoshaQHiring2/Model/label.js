var mongoose=require('mongoose');

var LabelSchema=mongoose.Schema({
	title:{
		type:String,
		required: true
	}
});

var Label = module.exports = mongoose.model('Label',LabelSchema);

//get Label
module.exports.get_label = function(callback,limit){
	Label.find(callback).limit(limit);
}

//add label
module.exports.create_label = function(label,callback){
	Label.create(label,callback);
}

//Update label
module.exports.update_label = function(id,label,options,callback){
	var query={_id:id};
	//console.log(label);
	var update={
		title:label.title
	}
	Label.findOneAndUpdate(query,update,options,callback);
}

//delete Label
module.exports.delete_label = function(id,callback){
	var query={_id:id};
	Label.remove(query,callback);
}