var express = require('express');
var app = express();
var http = require('http').Server(app); 
var io = require('socket.io')(http);    
var path = require('path');

var globalBettingV = 0; //전체금액

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
var stakes = 0; //판돈
var callcost; //콜비용
var isFirst = true; //첫배팅  구분용. why? 첫 배팅은 하프나 다이만 선택  가능하기 때문

var socketId = []; //소켓 아이디를 모아둠


io.on('connection', function(socket){ 
	stakes = 4; //초기 판돈  40,000원
	callcost = 0; //초기 콜비용 0원
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

	socket.on("halfbutton",function(data) {
		if (isFirst == true){
			isFirst == false;
		}
		console.log(data);
		console.log('배팅 전 판돈 '+stakes + '만원');
		callcost = Math.ceil(callcost + stakes*0.5); //콜을위한 데이터

		stakes = Math.ceil(stakes + callcost);
	
		console.log('배팅금액(=콜비용)' + callcost + '만원');
		console.log('배팅 후 판돈 '+stakes + '만원');
	
		checkCall = 0; //레이즈시 call인덱스 초기화

		//globalBettingV = globalBettingV + Math.ceil(callcost * 0.5);
		
		//console.log('하프 베팅금액 잘 적용됐는지::' + globalBettingV);
	
	
	});

    socket.on("quarterbutton",function(data) {
		if (isFirst == true){
			//첫선택시  쿼터버튼 누름. 경고창 출력해야함.

		}else{
		console.log(data);
		console.log('배팅 전 판돈 '+stakes + '만원');
		callcost = Math.ceil(callcost + stakes*0.25); //콜을위한 데이터

		stakes = Math.ceil(stakes + callcost);

		console.log('배팅금액(=콜비용)' + callcost + '만원');
		console.log('배팅 후 판돈 '+stakes + '만원');

		checkCall = 0; //레이즈시 call인덱스 초기화
	
		}
		
	
	
	});

	socket.on('doublebutton', function(data) { //send message를 키값으로지정하고 콜백으로 data

		console.log(data);
		console.log('배팅 전 판돈 '+stakes + '만원');
		callcost = Math.ceil(callcost + stakes*2); //콜을위한 데이터

		stakes = Math.ceil(stakes + callcost);
	
		console.log('배팅금액(=콜비용)' + callcost + '만원');
		console.log('배팅 후 판돈 '+stakes + '만원');
	
		checkCall = 0; //레이즈시 call인덱스 초기화
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

http.listen(5000, function(){ //4
    console.log('server on!');
  });




  