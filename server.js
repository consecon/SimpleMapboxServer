var express = require('express');
var http = require('http');
var app = express();
var tilelive = require('@mapbox/tilelive');
require('@mapbox/mbtiles').registerProtocols(tilelive);
var PORT = 7777

//Depending on the OS the path might need to be 'mbtiles:///' on OS X and linux
var path = 'mbtiles://E:/SourceCode/MapServer/SimpleMapboxServer/vietnam_raster_example.mbtiles'

tilelive.load(path, function (err, source) {
    console.log("load success");
    if (err) {
        throw err;
    }
    app.set('port', PORT);

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // use api depend on ur mbtiles: png, jpg, pbf
    app.get(/^\/v2\/tiles\/(\d+)\/(\d+)\/(\d+).png$/, function (req, res) {

        var z = req.params[0];
        var x = req.params[1];
        var y = req.params[2];

        console.log('get tile %d, %d, %d', z, x, y);

        source.getTile(z, x, y, function (err, tile, headers) {
            if (err) {
                res.status(404)
                res.send(err.message);
                console.log(err.message);
            } else {
                res.set(headers);
                res.send(tile);
            }
        });
    });

    app.get(/^\/v2\/tiles\/(\d+)\/(\d+)\/(\d+).jpg$/, function (req, res) {

        var z = req.params[0];
        var x = req.params[1];
        var y = req.params[2];

        console.log('get tile %d, %d, %d', z, x, y);

        source.getTile(z, x, y, function (err, tile, headers) {
            if (err) {
                res.status(404)
                res.send(err.message);
                console.log(err.message);
            } else {
                res.set(headers);
                res.send(tile);
            }
        });
    });

    app.get(/^\/v2\/tiles\/(\d+)\/(\d+)\/(\d+).pbf$/, function (req, res) {

        var z = req.params[0];
        var x = req.params[1];
        var y = req.params[2];

        console.log('get tile %d, %d, %d', z, x, y);

        source.getTile(z, x, y, function (err, tile, headers) {
            if (err) {
                res.status(404)
                res.send(err.message);
                console.log(err.message);
            } else {
                res.set(headers);
                res.send(tile);
            }
        });
    });

    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
        // replace x y z by number
        console.log('Example url: localhost:' + app.get('port') + '/v2/tiles/{x}/{y}/{z}.png');

    });
});

