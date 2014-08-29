var http = require('http');
var path = require('path');
var fs = require('fs');
var mime = require('mime');
var cache = {};

function send404(res){
   res.writeHead(404, {"Content-type": "text/html"});
   res.end("Error 404: resource not found");
}

function sendFile(res, filePath, fileContents){
   res.writeHead(200, {"Content-type": "text/html", "mime": mime.lookup(path.basename(filePath))});
   res.end(fileContents);
}

function serveStatic(res,cache, absPath){
   
   if (cache[absPath]){
      // The file is cached already
      sendFile(res, absPath, cache[absPath]);
   } else {
      fs.readFile(absPath, function(err, data){
         if (err){
            send404(res);
            return;
         }
         cache[absPath] = data;
         console.log(cache[absPath]);
         sendFile(res, absPath, data);
      });
   }
}

http.createServer(function(req,res){
	var filePath = false;
    
    if (req.url === '/') {
       filePath = 'content/index.html';
    } else {
       filePath = 'content/' + req.url;
    }
    
    var absPath = './'+ filePath;
    serveStatic(res, cache, absPath);
    
}).listen(8080);

