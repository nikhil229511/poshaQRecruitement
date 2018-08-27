var mongoose=require('mongoose');

var TaskSchema=mongoose.Schema({
	task:{
		type:String,
		required: true
	},
	label:{
		type:String,
		required:true
	}
});

var Task = module.exports = mongoose.model('Task',TaskSchema);

//get Task
module.exports.get_task = function(callback,limit){
	Task.find(callback).limit(limit);
}

//add Task
module.exports.create_task = function(task,callback){
	Task.create(task,callback);
}

//Update Task
module.exports.update_task = function(id,task,options,callback){
	var query={_id:id};
	var update={
		task:task.task,
		label:task.label
	}
	Task.findOneAndUpdate(query,update,options,callback);
}

//Move Task
module.exports.move_task = function(id,labelToMove,options,callback){
	var query={_id:id};
	var update={
		label:labelToMove.label
	}
	Task.findOneAndUpdate(query,update,options,callback);
}

module.exports.delete_task = function(id,callback){
	var query={_id:id};
	Task.remove(query,callback);
}