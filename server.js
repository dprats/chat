var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

var cache ={};

var chatServer = require('./lib/chat_server');
chat_server.listen(server);

function send404(response){
	response.writeHead(404,{'Content-type': 'text/plain'});
	response.write('Error 404: resource not found');
	response.end();	
}

//helper function to serve file data

function sendFile(response, filePath, fileContents){
	response.writeHead(
		200,
		{'Content-type': mime.lookup(path.basename(filePath))} 
		);
	response.end(fileContents);
}

//helper function for sering static files 

function serveStatic(response, cache, absPath){
	if (cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	} else {
		fs.exists(absPath, function(exists){
			if (exists){
				fs.readFile(absPath, function(err, data) {
					if (err) {
						send404(response);
					} else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			} else {
				send404(response);
			}
		});
	}
} 

var server = http.createServer(function(request, response){
	var filePath = false;

	if (request.url == '/'){
		filePath = 'public/index.html';
	} else {
		filePath = 'public' + request.url;
	}
	var absPath = './' + filePath;
	serveStatic(response, cache, absPath);
});


server.listen(3000, function(){
	console.log('server listening on port 3000.');
});










