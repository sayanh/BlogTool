/**
 * Created by anarchy on 7/19/15.
 */


var express = require('express');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var app = module.exports = express();
var errorhandler = require('errorhandler');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(methodOverride());
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
//app.use(app.router);
app.use(express.static(__dirname + '/public'));

if ('development' == app.get('env')) {
    app.use(errorhandler({ dumpExceptions: true, showStack: true }));
}

if ('development' == app.get('env')) {
    app.use(errorhandler());
}

var articleProvider= new ArticleProvider();

app.get('/', function(req, res){
    articleProvider.findAll(function(error, docs){
        res.send(docs);
    });
})

app.listen(3000);
