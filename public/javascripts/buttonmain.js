var shutda = {
	//is_my_turn: Boolean,

    socket: null,
	
	init: function(socket){
        var self = this;
        socket = io();


        var globalBettingV = 500; //전체금액
        var stakes = 0; //판돈
        var Restakes = 0; //최종판돈
        var callcost; //콜비용
        var isFirst = true; //첫배팅  구분용. why? 첫 배팅은 하프나 다이만 선택  가능하기 때문
		stakes = 4; //초기 판돈  40,000원
	    callcost = 0; //초기 콜비용 0원
        $("#Money").text("잔액: "+globalBettingV);
		
        $("#call_button").click(function(){
            $("#Stakes").text(stakes+"만원");
		    callcost = Math.ceil(callcost); //콜을위한 데이터
		    Restakes = Math.ceil(stakes + callcost);
            stakes=Restakes;
            globalBettingV=globalBettingV-callcost;
            $("#Money").text(globalBettingV);
            $("#restake").text(Restakes+"만원");
            $("#CallCost").text(callcost+"만원");
	
            socket.emit('callbutton',"콜");
        });

        $("#die_button").click(function(){
            console.log($('#die_button').prop("disabled"));
            if($('#die_button').prop("disabled")==false){
                $("#call_button").attr("disabled",true);
                $("#allin_button").attr("disabled",true);
                $("#die_button").attr("disabled",true);
                $("#half_button").attr("disabled",true);
                $("#qua_button").attr("disabled",true);
                $("#double_button").attr("disabled",true);
            }
           
        });

        $("#allin_button").click(function(){
            if(globalBettingV!=0){
                $("#Stakes").text(stakes+"만원");
                callcost = Math.ceil(globalBettingV); //콜을위한 데이터
                Restakes = Math.ceil(stakes + callcost);
                stakes=Restakes;
                globalBettingV=globalBettingV-callcost;
                $("#Money").text(globalBettingV);
                $("#restake").text(Restakes+"만원");
                $("#CallCost").text(callcost+"만원");
            }else{
                $("#Money").text("판돈부족!!!!!!!");
            }
            socket.emit('allinbutton',"올인");
        });

        $("#double_button").click(function(){
            $("#Stakes").text(stakes+"만원");
            callcost = Math.ceil(callcost + stakes*2); //콜을위한 데이터
            Restakes = Math.ceil(stakes + callcost);
            stakes=Restakes;
            globalBettingV=globalBettingV-callcost;
            $("#Money").text(globalBettingV);
            $("#restake").text(Restakes+"만원");
            $("#CallCost").text(callcost+"만원");
          
            //checkCall = 0; //레이즈시 call인덱스 초기화
            socket.emit('doublebutton',"더블");
        });

        $("#qua_button").click(function(){
            if (isFirst == true){
                //첫선택시  쿼터버튼 누름. 경고창 출력해야함.
    
            }else{
           
            $("#Stakes").text(stakes+"만원");
            callcost = Math.ceil(callcost + stakes*0.25); //콜을위한 데이터
            Restakes = Math.ceil(stakes + callcost);
            stakes=Restakes;
            globalBettingV=globalBettingV-callcost;
            $("#Money").text(globalBettingV);
            $("#restake").text(Restakes+"만원");
            $("#CallCost").text(callcost+"만원");    
           
            }
            socket.emit('quabutton',"쿼터");
        });

        $("#half_button").click(function(){
            
            if (isFirst == true){
                isFirst = false;
            }
            $("#Stakes").text(stakes+"만원");
           
            callcost = Math.ceil(callcost + stakes*0.5); //콜을위한 데이터
            Restakes = Math.ceil(stakes + callcost);
            stakes=Restakes;
            globalBettingV=globalBettingV-callcost;
            $("#Money").text(globalBettingV);
            $("#restake").text(Restakes+"만원");
            $("#CallCost").text(callcost+"만원");   
            socket.emit('halfbutton',"하프");
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