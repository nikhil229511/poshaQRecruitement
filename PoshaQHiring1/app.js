var mongoose=require('mongoose');
var lodash=require('lodash');

var Demo=require('./Model/Demo');
//mongoose.connect('mongodb://localhost/poshaq',{useNewUrlParser:true});


/*var a=new Demo({
	category:"abc"
});*/

var arr;
var categories;

async function submission(client,dbname,collectionname,bucketsize){
	var client= ""+client+"/"+dbname+"";
	
	mongoose.connect('mongodb://localhost/poshaq',{useNewUrlParser:true},function(err){
		if(err)
			throw err;
		console.log('Database connected');
	});

	var tempArr=[],finalArr=[];

	Demo.find({},function(err,res){		
		arr=res;
		var sortArr= lodash.orderBy(arr,'category');
		//console.log(sortArr);
		console.log();
		//Getting unique Category values.
		Demo.find().distinct('category',function(err,res){
			categories=res;
			var catSort= lodash.orderBy(categories,'category');
			var count=0;
			for(var i=0;i<sortArr.length;i++){
				var temp=catSort[count];				
				if(sortArr[i].category==temp){
					tempArr.push(sortArr[i]._id);					
				}else{
					var obj={
						cat : temp,
						arr : tempArr
					}
					finalArr.push(obj);
					temp=catSort[++count];
					tempArr=[];
					i--;
				}
			}

			//pushing the last category
			var obj={
				cat : temp,
				arr : tempArr
			}
			finalArr.push(obj);
			var str='[\n\t{\n';
			var arrx=[];
			for(var j=0;j<finalArr.length;j++){
				var ob={
					category: finalArr[j].cat,
					arrchunk: lodash.chunk(finalArr[j].arr, bucketsize)
				}
				str += '\t\t"'+ob.category+'" :';
				for(var x=0;x<ob.arrchunk.length;x++){
					if(x==0)
						str +='[ '
					str +='[  ';
					var tempy=ob.arrchunk[x];
					for(var y=0;y<tempy.length;y++){
						if(y!=tempy.length-1)
							str += '"'+tempy[y]+'" , ';
						else
							str += '"'+tempy[y]+'" ';
					}
					if(x!=ob.arrchunk.length-1)
						str += '] , ';
					else
						str += '] ]\n';
				}
				arrx.push(ob);
				
			}
			str += '\t}\n]';
			console.log(str);
			//console.log(arrx);
		});



	});
}


submission("mongodb://localhost","poshaq","demos",2);
