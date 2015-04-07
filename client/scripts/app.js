// YOUR CODE HERE:
var username =  'anon';        // prompt("Username:");
/*



message.username = username;
message.roomname = "4chan";


*/
var message = {};
message.roomname = "4chan";
message.username = username;



var app = {};

app.init = function() {

  $('#send').on('click', function() {
    message.text = $('#message').val();
    app.handleSubmit(message);
  });
  $('#fetch').on('click', function() {
    app.fetch();
  });

  $('#main').on('click', ".username", function() {
    app.addFriend();
  });


};

app.server = "https://api.parse.com/1/classes/chatterbox?order=-createdAt";

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
      var messages = "";
      for (var i = data.results.length-1; i > 0; i--) {
        messages += "</br><span class='username'>" + data.results[i].username + "</span>: "
        + data.results[i].text + " " + data.results[i].roomname;
      }
      app.addMessage(messages);
      // setTimeout(app.fetch, 1000);

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
  app.clearMessages();
  $('#chats').prepend('<span>' +message+ '</span>');
}

app.addRoom = function(room) {

  $('#roomSelect').append('<button id="pickRoom">Pick Room</button>')
}

app.addFriend = function() {

}

app.handleSubmit = function(message) {
  app.send(message);
}



