var config = require('config-env').define('NODE_ENV', function (config) {
	config.common({
		name: 'jolicoeur',
		// Title
		title: 'JoliCoeur',
		// Express port
		express_port: 3005,
	});
	
	config.config('development', {
		// Stripe Private Key
		stripe_privateKey: 'SSSSSSSSSSSSSSSSSSSS',
		// Stripe Public Key
		stripe_publicKey: 'PPPPPPPPPPPPPPPPPPPP',
		// Stripe Default Currency
		stripe_currency: 'usd',
	});
});

module.exports = config;
