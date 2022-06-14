var express = require('express');
var app = express();
var http = require('http').Server(app); 
var io = require('socket.io')(http);    
var path = require('path');


// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('pug',require('pug').__express);
app.set('view engine', 'pug');


app.get('/', (req, res) => {  
	res.render('buttonmain', { title: '온라인 섯다 게임', username: req.query.username });
});

http.listen(3000, function(){ //4
    console.log('server on!');
  });

