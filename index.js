// Define a default environment
process.env['NODE_ENV'] = 'development';

/**
 * Module dependencies.
 */
var express = require('express');

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

// parse request bodies (req.body)
app.use(express.bodyParser());

// Application routing
require('./routes.js')(app);


if (!module.parent) {
  var port = config.param('express_port');
  app.listen(port);
  console.log('\n  listening on port ' + port + '\n');

  if(process.env['NODE_ENV'] == 'development') {
    var open  = require('open');
  	open('http://localhost:' + port);
  }
}