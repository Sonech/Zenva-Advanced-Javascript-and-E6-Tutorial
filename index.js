// Require the 'request' package
const request = require('request');
// Include http package
const http = require('http');

// Define body variable
let coin_data = undefined;

// Create http server, define callback function (request, response) and define listen port.
http.createServer((req, res) => {
	// Write response header (response code, {content of the response})
	res.writeHead(200, {'Content-type': 'text/plain'});

	// Check and set response data
	if (coin_data) {
		res.end(coin_data);
	}
	else {
		res.end('No data');
	}
}).listen(8080);

// Call request function
//First parameter is the url for requested data
//Second parameter is the callback function to be called when data is requested (errorcode, request response, response body)
request('https://api.coinmarketcap.com/v2/ticker/', (err, request_res, body) => {
	// Check for error. If there is an error throw it
	if (err) throw err;

	// Save response body in a variable
	coin_data = body;
});