var http = require('http');
var path = require('path');
var pages = [
	{route: '', output: 'I am the best Node Cookbook App the only time and yet'},
	{route: 'about', output: 'A simple routing with Node example'},
	{route: 'another page', output: function(){ return 'Here\'s' + this.route}}
];
http.createServer(function(req,res){
	var lookup = path.basename(decodeURI(req.url));
	pages.forEach(function(page){
		if(page.route ===lookup){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(typeof page.output === 'function' ? page.output(): page.output);
		}
	});
	if (!res.finished) {
		res.writeHead(404);
		res.end('Page Not Found!');
	}
}).listen(8080);
