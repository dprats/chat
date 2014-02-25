//client-side javascript

//Sending a user’s messages and name/room change requests to the server

//Displaying other users’ messages and the list of available rooms

//The first bit of client-side JavaScript you’ll add is a JavaScript prototype object that will process 
//chat commands, send messages, and request room and nickname changes.

var Chat = function(socket){
	this.socket = socket;
}

// functionality to send chat messages

Chat.prototype.sendMessage = function(room, text) {
	var message = {
		room: room,
		message: text
	};
	this.socket.emit('message', message);
};

//Add the following function to change rooms:

Chat.prototype.changeRooms = function(room){
	this.socket.emit('join', {
		newRoom: room
	});
};