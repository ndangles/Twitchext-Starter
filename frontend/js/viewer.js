$(function() {

  var auth_info = null;


  window.Twitch.ext.onAuthorized(function(auth) {
      auth_info = auth;

      $.ajax({
             method: "GET",
             url: "/api/viewer",
             headers: {"Auth-Token": auth_info.token},
             success: function(data) {


          });
  });


  window.Twitch.ext.listen('broadcast', function(_, __, message) {
    var data = JSON.parse(message);
    console.log(data);
    $("#streamer-one").find("#svotes").text(data.s1.votes);
    $("#streamer-two").find("#svotes").text(data.s2.votes);
    $("#streamer-three").find("#svotes").text(data.s3.votes);
  });




});
