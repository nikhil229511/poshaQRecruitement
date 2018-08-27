var mongoose=require('mongoose');
var lodash=require('lodash');

var Demo=require('./Model/Demo');

var arr;
var categories;

async function submission(client,dbname,collectionname,bucketsize){
	var client= ""+client+"/"+dbname+"";
	
	mongoose.connect(client,{useNewUrlParser:true},function(err){
		if(err)
			throw err;
		console.log('Database connected');
	});

	var tempArr=[],finalArr=[];

	Demo.find({},function(err,res){		
		arr=res;
		var sortArr= lodash.orderBy(arr,'category');
		
		//Getting unique Category values.
		Demo.find().distinct('category',function(err,res){
			categories=res;
			var catSort= lodash.sortBy(categories,'category');
			catSort.sort();
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
			// console.log(finalArr);
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
						str +='[ ';
					str +='\t\t[  ';
					var tempy=ob.arrchunk[x];
					for(var y=0;y<tempy.length;y++){
						if(y!=tempy.length-1)
							str += '"'+tempy[y]+'" , ';
						else
							str += '"'+tempy[y]+'" ';
					}
					if(x!=ob.arrchunk.length-1)
						str += '],\n ';
					else
						str += '] ]\n';
				}
				arrx.push(ob);
				
			}
			str += '\t}\n]';
			console.log(str);
			// console.log();
			// console.log(arrx);
		});
	});
}



//call submission function
submission("mongodb://localhost","poshaq","demos",3);
