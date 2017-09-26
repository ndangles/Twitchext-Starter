$(function() {

  var auth_info = null;


  window.Twitch.ext.onAuthorized(function(auth) {
      auth_info = auth;

      $.ajax({
             method: "GET",
             url: "/api/viewer",
             headers: {"Auth-Token": auth_info.token},
             success: function(data) {
               $('#response-data').text(data);

          });
  });

  //Real time Twitch PubSub example, see /api/viewer route in /backend/main.js for example
  // window.Twitch.ext.listen('broadcast', function(_, __, message) {
  //   var data = JSON.parse(message);
  //   console.log(data);
  // });




});
