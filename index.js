// Define a default environment
process.env['NODE_ENV'] = 'development';

/**
 * Module dependencies.
 */

var express = require('express');
var open	= require('open');

// Application settings
var config = require('./config.js');

// Initialize an express instance
var app = module.exports = express();

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html
app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views
app.set('views', __dirname + '/views');

// serve static files
app.use(express.static('public'));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

app.get('/', function(req, res){
  res.render('index', {
    title: config.param('title'),
    stripe_key: config.param('stripe_publicKey'),
    stripe_currency: config.param('stripe_currency'),
  });
});

if (!module.parent) {
  var port = config.param('express_port');
  app.listen(port);
  console.log('\n  listening on port ' + port + '\n');

  if(process.env['NODE_ENV'] == 'development') {
  	open('http://localhost:' + port);
  }
}