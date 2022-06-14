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

        $("#double_button").click(function(){
            socket.emit('doublebutton',{data:"더블버튼 누름!"});
        });

        $("#qua_button").click(function(){
            socket.emit('quabutton',{data:"쿼터버튼 누름!"});
        });

        $("#half_button").click(function(){
            socket.emit('halfbutton',{data:"하프버튼 누름!"});
        });

        $("#send").click(function(){
            socket.emit('price',$('#callprice').val());
        })

	}
	// init 끝	

};

$(document).ready(function () {
	shutda.init();
});