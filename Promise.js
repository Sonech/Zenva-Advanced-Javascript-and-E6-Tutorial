// Read and write file with callback

/*
const fs = require('fs');

fs.readFile('test_read.txt'), (err, data) => {
	if (err) throw err;
	fs.writeFile('test_write.txt', data, (err) => {
		if (err) throw err;
	});
});
*/

// promises

const fs = require('fs');

function readFile(file_name) {
	return new Promise(function (resolve, reject) {
		fs.readFile(file_name, (err, data) => {
		if (err) reject(err);
		else resolve(data);
		});
	});
}

function writeFile(file_name, data) {
	return new Promise(function (resolve, reject) {
		fs.writeFile(file_name, data, (err, data) => {
		if (err) reject(err);
		else resolve();
		});
	});
}


readFile('test_read.txt').then((data) => writeFile('test_write.txt', data)).catch((err) => console.log(err));