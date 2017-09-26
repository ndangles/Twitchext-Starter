const custom_options = {
  "jwt_secret": {
    "encoded": true, //default is to assume it is base64 encoded
    "enabled": true, //enable further jwt secret options
    "method":"path", //path
    "location": "../../config/variables"//location of file holding 'jwt_secret' variable, change value in file with your own
  },
  "client_id": "some client id here", //extension client id, REPLACE WITH OWN
  "client_secret": "some client secret here" // extension client secret, REPLACE WITH YOUR OWN
}


//https://www.npmjs.com/package/twitchext-helper
const twitchext = require('twitchext-helper')(custom_options);

module.exports = function(app) {

//catch request that is being made from the config.js file
app.post('/api/configure', verifyJWT, function(req, res){

      console.log("Here is the data that was submitted -> "+req.body.data);

      var response = {status:"success", message: "Token verified and data received", data_received: ""+req.body.data};

      res.json(response);

});

//catch the request that is being made from the viewer.js file
app.get('/api/viewer', verifyJWT, function(req, res){

      var data = {status:"success", message:"Token verified and data retrieved", data: "some mock data"}

      res.json(data);

});

/*Handle oauth authorization from the broadcaster.
Oauth scopes can be set for your extension in the Developer Dashboard under the "Extension Capabilities" section
This route would need to be setup in your Twitch Dev console in order to work. This is more of an example that you can build off of.
*/
app.get('/oauth', function(req, res){

  var channel_id = JSON.parse(req.query.state).channel_id;
  var oauth_code = req.query.code;

  //user_id is the Twitch user ID that owns the extension.
  var signedToken = twitchext.sign({"user_id": "102705463", "role": "external"});

  //After the user has granted authorization, exchange the oauth code returned for an access token
  twitchext.getAccessToken(oauth_code, "https://localhost/oauth", function(err, token){
    if(err){console.log(err)};

          console.log("Oauth access token -> "+token);//save to database if needed

          //https://dev.twitch.tv/docs/extensions/reference#set-extension-broadcaster-oauth-receipt
          twitchext.oauthReceipt(channelId, signedToken, "0.0.1", res, function(err, response){
            if(err){console.log(err)}
            console.log("Oauth receipt -> "+response);

          });


  });


});


}

function verifyJWT(req, res, next){
  //get the json web token that was sent along with the request
  var jwt = req.headers['auth-token'];

  //verify the jwt to confirm that it is a valid request
  twitchext.verify(jwt, function(err, decoded){
    if(err){
      var error = {"status":"failed", message:"Could not verify json web token"};

      return res.json(error);
    }
    //console.log(decoded);
    return next();

  });

}
