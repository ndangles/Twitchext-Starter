$(function() {

  var auth_info = null;


  window.Twitch.ext.onAuthorized(function(auth) {
      auth_info = auth;


      $('#send').click(function(){



          $.ajax({
                 method: "POST",
                 url: "/api/configure",
                 data: {data:""+$('#user_input').val()},
                 headers: {"Auth-Token": auth_info.token},
                 success: function(data) {

                    $("#response").text(JSON.stringify(data))

                  }
              });

      });


  });






});
