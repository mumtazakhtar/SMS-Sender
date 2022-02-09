//<----Requiring the dependencies--->
const express = require('express');
const url = require('url');
const http = require("https");
const parseString = require('xml2js').parseString;

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');


//<--- default home page--->
app.get('/',(req,res)=>{
	res.render('index');
})

//<----Sending sms using api---->
app.get('/sendsms',(req,res)=>{
	var msg = req.query.msg;
    var to = req.query.to;
    console.log(msg + to);
    const requestUrl = url.format({
	  protocol: 'https',
	  hostname: 'la.cellactpro.com',
	  pathname: '/http_req.asp',
	  query: {
	    "FROM": "CellactTest",
		"USER": "CellactTest",
		"PASSWORD": "CellactTest",
		"APP": "LA",
		"CMD": "sendtextmt",
		"SENDER": "0557000816",
		"CONTENT": msg,
		"TO": to
	  }
	});

	http.get(url.format(requestUrl), (resp) => {
		resp.on("data", function(chunk) {
			console.log("BODY: " + chunk);
			parseString(chunk, function (err, result) {
			    console.log(JSON.stringify(result.PALO.RESULT));
			    console.log(JSON.stringify(result));
			    
    			res.render('index');
			});
		});
    }).on("error", (err) => {
        console.log("GET Error: " + err);
    });
})

//<---connecting to server---->
app.listen(8081,function(){
  console.log('app is listening');
})