// YOUR CODE HERE:
var username = prompt("Username:");
var message = {};

message.username = username;
message.roomname = "4chan";

$(function() {

  $('#send').on('click', function() {
    message.text = $('#message').val();
    app.send();
  });


});


var app = {};

app.init = function() {


};

app.send = function() {
  $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: "POST",
    data: JSON.stringify(message),
    contentType: "application/json",
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};
