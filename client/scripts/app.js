// YOUR CODE HERE:
var username =  'anon';        // prompt("Username:");
/*



message.username = username;
message.roomname = "4chan";


*/
var message = {};
message.roomname = "4chan";
message.username = username;

var chatRooms = {};

var app = {};

app.init = function() {

  $.ajax({
    url: app.server,
    type: "GET",
    contentType: "application/json",
    success: function (data) {
      var room;
      for (var i = 0; i < data.results.length; i++) {
        room = data.results[i].roomname;
        if (!chatRooms.hasOwnProperty(room)) {
          chatRooms[room] = room;
          $("#roomSelect").append('<button class="rooms" data-name=' + room + ">" + room + '</button>');
        }
      }
    },
    error: function (data) {
      console.error('chatterbox: Failed');
    }
  });

  $('#send').on('click', function() {
    message.text = $('#message').val();
    app.handleSubmit(message);
  });
  $('#fetch').on('click', function() {
    app.fetch();
  });

  $('#chats').on('click', "a", function() {
    console.log(this.className)
    app.addFriend(this.className);

  });


  $('#roomSelect').on('click', '.rooms', function() {
    var that = $(this);
    $.ajax({
    url: app.server,
    type: "GET",
    contentType: "application/json",
    success: function (data) {
      // debugger;
      console.log(that.data('name'));
      var messages = "";
      for (var i = data.results.length-1; i > 0; i--) {
        if (data.results[i].roomname === that.data('name')) {
        messages += "</br><span class='username'>" + escapeHtml(data.results[i].username) + "</span>: "
        + escapeHtml(data.results[i].text) + " " + escapeHtml(data.results[i].roomname);
        // messages = escapeHtml(messages);
        }
      }
      app.addMessage(messages);
    }
    });
  });
};

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
        messages += "</br><a class='" + escapeHtml(data.results[i].username) +  "'>" + escapeHtml(data.results[i].username) + "</a>: "
        + escapeHtml(data.results[i].text) + " " + escapeHtml(data.results[i].roomname);
        // messages = escapeHtml(messages);
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

app.addFriend = function(className) {
  console.log(className);
  $('.' +className).css('color', "red");
}

app.handleSubmit = function(message) {
  app.send(message);
}

/*

$('#roomSelect').on('click', '.rooms', function() {
    $.ajax({
    url: app.server + "&where={'roomname' : " + $(this).data('name') + "}",
    type: "GET",
    contentType: "application/json",
    success: function (data) {
      var messages = "";
      // debugger;
      for (var i = data.results.length-1; i > 0; i--) {
        // if (data.results[i].roomname === $(this).data('name')) {
        messages += "</br><span class='username'>" + escapeHtml(data.results[i].username) + "</span>: "
        + escapeHtml(data.results[i].text) + " " + escapeHtml(data.results[i].roomname);
        // messages = escapeHtml(messages);
        // }
      }
      app.addMessage(messages);
    }
    });
  });
};

*/


