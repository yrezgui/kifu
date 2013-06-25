// Module dependencies
var config    = require('./config.js');
var Q         = require('q');
var stripe    = require('stripe');
var twilio    = require('twilio');
var sendgrid  = require('sendgrid');

// Stripe charge processing
var stripeProcessing = function stripeProcessing() {
  var newCharge = {
    amount: req.body.amount,
    currency: config.param('stripe_currency'),
    card: req.body.stripe_token
  };

  var deferred = Q.defer();

  stripe.charges.create(newCharge, function capture(err, response) {

    if(err || !response) {
      deferred.reject(new Error(error));
      return;
    }

    deferred.resolve(response);
  });

  return deferred.promise;
};

// Application routing
module.exports = function(parent){

  parent.get('/', function(req, res){
    res.render('index', {
      title: config.param('title'),
      stripe_key: config.param('stripe_publicKey'),
      stripe_currency: config.param('stripe_currency'),
    });
  });

  parent.post('/donate', function(req, res){

    if(!req.xhr) {
      res.redirect('/');
    }

    res.send({error: false, result: 'ok'});
  });
};