var shutda = {
	//is_my_turn: Boolean,
	socket: null,
		
	init: function(socket){
		var self = this;
		// var user_cnt = 0;
		
		socket = io();
		
        $("#call_button").click(function(){
            socket.emit('callbutton',{data:"콜버튼 누름!"});
        });

        $("#die_button").click(function(){
            socket.emit('diebutton',{data:"다이버튼 누름!"});
        });

        $("#allin_button").click(function(){
            socket.emit('allinbutton',{data:"올인버튼 누름!"});
        });

        $("#half_button").click(function(){
            socket.emit('halfbutton',{data:"하프 누름!"});
        });

        $("#quarter_button").click(function(){
            socket.emit('quarterbutton',{data:"쿼터 누름!"});
        });

        $("#double_button").click(function(){
            socket.emit('doublebutton',{data:"더블 누름!"});
        });

	}
	// init 끝	

};

$(document).ready(function () {
	shutda.init();
});