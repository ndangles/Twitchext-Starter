
module.exports = function(app) {


app.post('/api/configure', verifyJWT, function(req, res){
    console.log("Here is the data that was submitted -> "+req.body.data);

    var response = {status:"success", message: "Token verified and data received", data_received: ""+req.body.data};

    res.json(response);

});

app.get('/api/viewer', verifyJWT, function(req, res){
  var data = {status:"success", message:"Token verified and data retrieved", data: "some mock data"}

  res.json(data);
})

function verifyJWT(req, res, next){
  return next();
}




}
