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

var users = {};
var user_count = 0;

io.on('connection', function(socket){ 
	
	console.log('유저와의 접속이 성공하였습니다: ', socket.id);
	   
    socket.on("callbutton",function(data) {
		console.log(data);
	});

    socket.on("diebutton",function(data) {
		console.log(data);
	});

    socket.on("allinbutton",function(data) {
		console.log(data);
	});

	
	socket.on('disconnect', function() {
		console.log('user disconnected : ', socket.id, socket.username);
		for(var i=0; i<user_count; i++){
			if(users[i].id == socket.id)
				delete users[i];
		}	
		
		user_count--;
		io.emit('update_users', users, user_count);
	});
});

http.listen(3000, function(){ //4
    console.log('server on!');
  });




  