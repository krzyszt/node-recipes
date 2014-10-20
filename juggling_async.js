var http = require('http');
var bl = require('bl');
var count = 0;
var results = [];

function printResults(){
	for (var i=0; i<results.length; i++){
		console.log(results[i]);
	}
}

function httpGet(index){
	http.get(process.argv[2 + index], function(response){
		
		response.pipe(bl(function(err,data){
			if (err) {
				console.error(err);
			}
						
			count += 1;
			results[index] = data.toString();
			if (count == 3) {
				printResults();
			}	
	
		}));		
	});
}

for (var i=0; i < 3; i++){
	httpGet(i);
}





