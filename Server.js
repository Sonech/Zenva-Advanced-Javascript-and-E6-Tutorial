// Require the 'request' package
const request = require('request');
// Require http package
const http = require('http');
// Import Cryptocoin class
const cryptocoin = require('./Cryptocoin.js');
// Require url package
const url = require('url');

exports.Server = class {
	constructor(port) {
		this.port = port;
		this.coins = [];

		// Create http server, define callback function (request, response) and define listen port.
		http.createServer((req, res) => {
			// Parsing url query to find name of coin1 and coin2. Name of coin to convert from and convert to.
			const url_query = url.parse(req.url, true).query;
			const coin1_name = url_query.from;
			const coin2_name = url_query.to;

			// Coin objects
			let coin1 = undefined;
			let coin2 = undefined;

			// Iterate throug the coins list
			this.coins.forEach((coin) => {
				if (coin.id === coin1_name) {
					coin1 = coin;
				} else if (coin.id === coin2_name) {
					coin2 = coin;
				}
			});


			// Write response header (response code, {content of the response})
			res.writeHead(200, {'Content-type': 'text/plain'});
			// Check and set response data
			// If coin1 and coin2 exists then convert
			if (coin1 && coin2) {
				const conversion_factor = coin1.convert_to(coin2);
				res.end(coin1.name + ' costs ' + conversion_factor + ' ' + coin2.name + 's');
			}
			// Coins are not found then response is 'no data'
			else {
				res.end('Could not find such coins');
			}
		}).listen(this.port);

		// Call request function
		//First parameter is the url for requested data
		//Second parameter is the callback function to be called when data is requested (errorcode, request response, response body)
		request('https://api.coinmarketcap.com/v1/ticker/', (err, request_res, body) => {
			// Check for error. If there is an error throw it
			if (err) throw err;

			// Save response data in JSON object
			let coin_data = JSON.parse(body);
			// Iterate through each cryptocoin and add them to the coins list
			coin_data.forEach((coin) => this.coins.push(new cryptocoin.Cryptocoin(coin.id, coin.name, coin.price_usd)));
		});
	}
}
