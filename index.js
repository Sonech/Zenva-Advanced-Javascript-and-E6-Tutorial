// Require the 'request' package
const request = require('request');
// Include http package
const http = require('http');
// Import Cryptocoin class
const cryptocoin = require('./Cryptocoin.js');

// Coins list
let coins = [];



// Create http server, define callback function (request, response) and define listen port.
http.createServer((req, res) => {
	// Write response header (response code, {content of the response})
	res.writeHead(200, {'Content-type': 'text/plain'});

	// Check and set response data
	if (coins) {
		res.end(JSON.stringify(coins));
	}
	else {
		res.end('No data');
	}
}).listen(8080);

// Call request function
//First parameter is the url for requested data
//Second parameter is the callback function to be called when data is requested (errorcode, request response, response body)
request('https://api.coinmarketcap.com/v1/ticker/', (err, request_res, body) => {
	// Check for error. If there is an error throw it
	if (err) throw err;

	// Save response data in JSON object
	let coin_data = JSON.parse(body);
	// Iterate through each cryptocoin and add them to the coins list
	coin_data.forEach((coin) => coins.push(new cryptocoin.Cryptocoin(coin.id, coin.name, coin.price_usd)));
});