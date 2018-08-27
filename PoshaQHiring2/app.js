var express=require('express');
var app=express();
var bodyparser=require('body-parser');
var mongoose=require('mongoose');

Label=require('./Model/label');
Task=require('./Model/task');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended:true
}));

mongoose.connect('mongodb://localhost/todolist',{useNewUrlParser:true} );
var db=mongoose.connection;

app.get('/',function(req,res){
	res.send('please Use /api/create_label or other similar options...');
});


app.get('/api',function(req,res){
	res.send('You are still one level far...');
});

//get all Label
app.get('/api/labels',function(req,res){
	console.log("getting all Labels...");

	Label.find({}).exec(function(err,result){
		if(err)
			res.send("Error Occured.");
		else{
			console.log(result);
			res.json(result);
		}
	});
});

//add labels
app.post('/api/create_label',function(req,res){
	console.log("Adding new Label...");
	var label=req.body;
	Label.create_label(label,function(err,result){
		if(err){
			res.send("Error Occured.");
		}
		else{
			console.log(result);
			res.json(result);	
		}
	});
});


//delete label
app.delete('/api/delete_label',function(req,res){
	res.send("Please provide ID in place of ' /delete_label/?  '");
});

app.delete('/api/delete_label/:_id',function(req,res){
	console.log("Deleting Label...");
	var id=req.params._id;
	Label.delete_label(id,function(err,result){
	 	if(err)
			res.send("Error Occured");
		else{
			console.log(result);
			res.json(result);	
		}
	});
});

//update label
app.put('/api/update_label',function(req,res){
	res.send("Please provide ID in place of ' /update_label/?  '");
});

app.put('/api/update_label/:_id',function(req,res){
	console.log("Updating Label...");
	var id=req.params._id;
	var label=req.body;
	Label.update_label(id,label,{},function(err,result){
		if(err)
			res.send("Error Occured");
		else{
			console.log(result);
			res.json(result);	
		}
	});
});




//get all task
app.get('/api/tasks',function(req,res){
	console.log("getting all Tasks");

	Task.find({}).exec(function(err,result){
		if(err)
			res.send("Error Occured.");
		else{
			console.log(result);
			res.json(result);
		}
	});
});

//add Task
app.post('/api/create_task',function(req,res){
	console.log("Adding new Task...");
	var task=req.body;
	Task.create_task(task,function(err,result){
		if(err){
			console.log(err);
			res.send("Error Occured.");
		}
		else{
			console.log(result);
			res.json(result);	
		}
	});
});

//delete Task
app.delete('/api/delete_task',function(req,res){
	res.send("Please provide ID in place of ' /delete_task/?  '");
});

app.delete('/api/delete_task/:_id',function(req,res){
	console.log("Deleting Task...");
	var id=req.params._id;
	Task.delete_task(id,function(err,result){
	 	if(err)
			res.send("Error Occured");
		else{
			console.log(result);
			res.json(result);	
		}
	});
});

//update tasks
app.put('/api/update_task',function(req,res){
	res.send("Please provide ID in place of ' /update_task/?  '");
});

app.put('/api/update_task/:_id',function(req,res){
	console.log("Updating Task...");
	var id=req.params._id;
	var task=req.body;
	Task.update_task(id,task,{},function(err,result){
		if(err)
			res.send("Error Occured");
		else{
			console.log(result);
			res.json(result);	
		}
	});
});


//Move Task
app.put('/api/move_task/:_id',function(req,res){
	console.log("Moving Task using name of task...");
	var id=req.params._id;
	var task=req.body;
	Task.move_task(id,task,{},function(err,result){
		if(err)
			res.send("Error Occured");
		else{
			console.log(result);
			res.json(result);	
		}
	});
});


app.listen(3000,function(err){
	if(err)
		throw err;
	console.log("Server running on port 3000....");
});