function divEscapedContentElement(message){
	return $('<div></div>').text(message);
}

function divSystemContentElement(message){
	return $('<div></div>').html('<i>' + message + '</i>');
}

function processUserInput(chatApp, socket){
	var message = $('#send-message').val();
	var systemMessage;

	if (message.charAt[0] == '/') {
		systemMessage = chatApp.processCommand(message);
		if (systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		chatApp.sendMessage( $('#room').text(), message );
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop( $('#messages').prop('scrollHeight'));
	}

	$('#send-message').val('');

}

var socket = io.connect;

$(document).ready(function(){
	var chatApp = new Chat(socket);

	socket.on('nameResult', function(result){
		var message;

		if (result.success) {
			message = 'You are now known as ' + result.name + '.';
		} else {
			message = result.message;
		}
		$('#messages').append(divEscapedContentElement(message));
	});

	socket.on('joinResult', function(result){
		$('#room').text(result.room);
		$('messages').append(divSystemContentElement('Room Changed.'));

	});

	socket.on('message', function(message){
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});

	socket.on('rooms', function(rooms){
		$('#room-list').empty();

		for (var room in rooms) {
			room = room.substring(1, room.length);
		}
	});






})