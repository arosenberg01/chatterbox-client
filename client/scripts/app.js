// YOUR CODE HERE:
var username =  'anselandhenry'        // prompt("Username:");
/*



message.username = username;
message.roomname = "4chan";


*/
var message = {};
message.roomname = "4chan";
message.username = username;

$(function() {

  $('#send').on('click', function() {
    message.text = $('#message').val();
    app.send(message);
    app.addMessage(message.text)
  });


});


var app = {};

app.init = function() {


};

app.server = "https://api.parse.com/1/classes/chatterbox";

app.send = function(message) {
  $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: "POST",
    data: JSON.stringify(message),
    contentType: "application/json",
    success: function (data) {
      console.log('chatterbox: Message sent' + data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: "GET",
    contentType: "application/json",
    success: function (data) {
      console.log('chatterbox: fetching');
    },
    error: function (data) {
      console.error('chatterbox: Failed');
    }
  });
}

app.clearMessages = function() {
  $('#chats').empty();
}

app.addMessage = function(message) {
  $('#chats').append('<span>' +message+ '</span>');
}
