var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({secret: 'codingdojorocks'}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response) {
	if(!request.session.number){
		request.session["number"]=Math.trunc(Math.random()*100)+1;
		request.session["guess"]=null;
	}
	response.render("index", {number: request.session.number, guess: request.session.guess});
})

app.post('/guess', function(request, response) {
	request.session["guess"]=request.body.guess;
	response.redirect("/");
})

app.post('/reset', function(request, response) {
	request.session.number=null;
	response.redirect("/");
})

app.listen(5000, function() {
	console.log("listening on port 5000");
})