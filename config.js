var config = require('config-env').define('NODE_ENV', function (config) {
	config.common({
		name: 'jolicoeur',
		// Express port
		express_port: 3005,
	});
	
	config.config('development', {
		// Stripe Private Key
		stripe_privateKey: 'SSSSSSSSSSSSSSSSSSSS',
		// Stripe Default Currency
		stripe_currency: 'usd'
	});
});

module.exports = config;
