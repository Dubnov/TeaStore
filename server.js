var express = require('express');
var app = express();

app.use('/css', express.static('css'));
app.use('/bower_components', express.static('bower_components'));
app.use('/javascript', express.static('javascript'));
app.use('/pages', express.static('pages'));

app.get("/", function(req, res){
	res.sendFile(__dirname + '/index.html');
})

app.listen(8080, function(){
	console.log("app listening on port 8080");
});