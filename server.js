var mysql = require('mysql');
var client = require('socket.io').listen(8080).sockets;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'office'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
	}
});

client.on('connection', function(socket) {
	// wait for input
	socket.on("input", function(data) {
		console.log(data);
		data.time = new Date().toUTCString();
		client.emit("broadcast",data);
	});
});

