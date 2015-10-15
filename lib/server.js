var http    = require('http');
var fs      = require('fs');
var path    = require('path');
//var mime    = require('mime');
var cache   = {};

function send404(res){
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Error 404: resource not found.');
    res.end();
}

function sendFile(res, filePath, fileContents){
    //res.writeHead(200, {'content-type': mime.lookup(path.basename(filePath))});

    res.end(fileContents);

}


function serveStatic(response, cache, absPath) {
    if(cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);

    } else {
        fs.exists(absPath, function(exists){
            if(exists){
                fs.readFile(absPath, function(err, data){
                    if(err){
                        send404(response);
                    } else {
                        //cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        })
    }
}


var server = http.createServer(function(request, response){
    var filePath =false;

    if (request.url == '/') {
        filePath = 'web/index.html';
    } else {
        filePath = 'web/' + request.url;
    }

    switch(request.method) {
        case 'GET':


            break;

        case 'POST':
            break;
        default :
            console.log("BadRequest");
    }

    var absPath = '../' + filePath;
    serveStatic(response, cache, absPath);
});


server.listen(3000, function(){
    console.log("Server listening on port 3000");
});

