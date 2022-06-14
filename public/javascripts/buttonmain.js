var shutda = {
	//is_my_turn: Boolean,
	socket: null,
		
	init: function(socket){
		var self = this;
		// var user_cnt = 0;
		
		socket = io();
		
        $("#call_button").click(function(){
            socket.emit('callbutton',{data:"콜버튼 누름!"});
            socket.emit('callprice',$("#callprice").value);
        });

        $("#die_button").click(function(){
            socket.emit('diebutton',{data:"다이버튼 누름!"});
        });

        $("#allin_button").click(function(){
            socket.emit('allinbutton',{data:"올인버튼 누름!"});
        });

	}
	// init 끝	

};

$(document).ready(function () {
	shutda.init();
});