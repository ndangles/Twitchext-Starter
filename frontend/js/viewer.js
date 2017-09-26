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


});
