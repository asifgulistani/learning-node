var express = require('express');
var app = express();
var fs = require('fs');
var url = require('url');

var PORT = process.env.PORT || 3000;

var middlewares = {
    logger: function(req, res, next){
        console.log(req.method + ' | ' + req.connection.remoteAddress + ' | ' + req.get('host'));
        fs.appendFile('logs.txt', new Date().toString() +' | '+ req.method + ' | ' + req.connection.remoteAddress + ' | ' + req.originalUrl + '\n', (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
        });
        next();
    }
};

app.use(middlewares.logger);

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log('Node is running on port ' + PORT);
});