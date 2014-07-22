var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var vhost = require('vhost');
var fs = require('fs');

module.exports = httpServer;

function httpServer(domain, port, path)
{
    fs.stat(path, function(err, stats) {
        if(err || !stats.isDirectory()) {
            throw new Error('Directory ' + path + ' does not exist or is not readable');
        }
    });
    var app = connect();
    
    app.use(serveStatic(path));
    app.use(function(req, res) {
        res.statusCode = 404;
        res.end();
    });
    app.use(vhost(domain, app));

    http.createServer(app).listen(port);
}