////////////////////////////////////////////////
//               BACKBONE
////////////////////////////////////////////////



var Message = Backbone.Model.extend({

  url: 'https://api.parse.com/1/classes/chatterbox',
  defaults: {
    username: ''
  }
});

var Messages = Backbone.Collection.extend({

  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox',
  loadMsgs: function() {
    this.fetch({data: {order: '-createdAt'}});
  },
  parse: function(response, options) {
    var results = [];
    for (var i = response.results.length - 1; i >= 0; i--) {
      results.push(response.results[i]);
    }
    return results;
  }
});

var FormView = Backbone.View.extend({
  initialize: function() {
  },
  events: { 'submit #send': 'handleSubmit'},
  handleSubmit: function(e) {
    e.preventDefault();
    var $text = this.$('#message');
    this.collection.create({
      username: window.location.search.substr(10),
      text: $text.val()
    });
    $text.val('');
  }
});

var MessageView = Backbone.View.extend({
  template: _.template('<div class="chat" data-id="<%- objectId %>"> \
                       <div class="user"> <%- username %></div> \
                       <div class="text"> <%- text %></div> \
                       </div>'),
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var MessagesView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('sync', this.render, this);
    this.onscreenMessages = {};
  },
  render: function() {
    this.collection.forEach(this.renderMessage, this);
  },
  renderMessage: function(message) {
    if (!this.onscreenMessages[message.get('objectId')]) {
      var messageView = new MessageView({
        model: message
      })
    this.$el.prepend(messageView.render());
    this.onscreenMessages[message.get('objectId')] = true;
    }
  }
})





////////////////////////////////////////////////
//                   JQUERY
////////////////////////////////////////////////

// var username =  'anon';        // prompt("Username:");
// /*



// message.username = username;
// message.roomname = "4chan";


// */
// var message = {};
// message.roomname = "4chan";
// message.username = username;

// var chatRooms = {};

// var app = {};

// app.init = function() {

//   $.ajax({
//     url: app.server,
//     type: "GET",
//     contentType: "application/json",
//     success: function (data) {
//       var room;
//       for (var i = 0; i < data.results.length; i++) {
//         room = data.results[i].roomname;
//         if (!chatRooms.hasOwnProperty(room)) {
//           chatRooms[room] = room;
//           $("#roomSelect").append('<button class="rooms" data-name=' + room + ">" + room + '</button>');
//         }
//       }
//     },
//     error: function (data) {
//       console.error('chatterbox: Failed');
//     }
//   });

//   $('#send').on('click', function() {
//     message.text = $('#message').val();
//     app.handleSubmit(message);
//   });
//   $('#fetch').on('click', function() {
//     app.fetch();
//   });

//   $('#chats').on('click', "a", function() {
//     console.log(this.className)
//     app.addFriend(this.className);

//   });


//   $('#roomSelect').on('click', '.rooms', function() {
//     var that = $(this);
//     $.ajax({
//     url: app.server,
//     type: "GET",
//     contentType: "application/json",
//     success: function (data) {
//       // debugger;
//       console.log(that.data('name'));
//       var messages = "";
//       for (var i = data.results.length-1; i > 0; i--) {
//         if (data.results[i].roomname === that.data('name')) {
//         messages += "</br><span class='username'>" + escapeHtml(data.results[i].username) + "</span>: "
//         + escapeHtml(data.results[i].text) + " " + escapeHtml(data.results[i].roomname);
//         // messages = escapeHtml(messages);
//         }
//       }
//       app.addMessage(messages);
//     }
//     });
//   });
// };

// function escapeHtml(str) {
//     var div = document.createElement('div');
//     div.appendChild(document.createTextNode(str));
//     return div.innerHTML;
// };

// app.server = "https://api.parse.com/1/classes/chatterbox?order=-createdAt";

// app.send = function(message) {
//   $.ajax({
//     url: "https://api.parse.com/1/classes/chatterbox",
//     type: "POST",
//     data: JSON.stringify(message),
//     contentType: "application/json",
//     success: function (data) {
//       console.log('chatterbox: Message sent' + data);
//     },
//     error: function (data) {
//       console.error('chatterbox: Failed to send message');
//     }
//   });
// };

// app.fetch = function() {
//   $.ajax({
//     url: app.server,
//     type: "GET",
//     contentType: "application/json",
//     success: function (data) {
//       var messages = "";
//       for (var i = data.results.length-1; i > 0; i--) {
//         messages += "</br><a class='" + escapeHtml(data.results[i].username) +  "'>" + escapeHtml(data.results[i].username) + "</a>: "
//         + escapeHtml(data.results[i].text) + " " + escapeHtml(data.results[i].roomname);
//         // messages = escapeHtml(messages);
//       }
//       app.addMessage(messages);
//       // setTimeout(app.fetch, 1000);

//     },
//     error: function (data) {
//       console.error('chatterbox: Failed');
//     }
//   });
// }

// app.clearMessages = function() {
//   $('#chats').empty();
// }

// app.addMessage = function(message) {
//   app.clearMessages();
//   $('#chats').prepend('<span>' +message+ '</span>');
// }

// app.addRoom = function(room) {

//   $('#roomSelect').append('<button id="pickRoom">Pick Room</button>')
// }

// app.addFriend = function(className) {
//   console.log(className);
//   $('.' +className).css('color', "red");
// }

// app.handleSubmit = function(message) {
//   app.send(message);
// }



