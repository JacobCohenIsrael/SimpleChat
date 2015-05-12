var client = require('socket.io').listen(8080).sockets;

client.on('connection', function(socket) {
	// wait for input
	socket.on("input", function(data) {
		console.log(data);
		data.time = new Date().toUTCString();
		client.emit("broadcast",data);
	});
});

