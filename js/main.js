
var hasTalent=false;
var myInterval;
currentLevel=0;

function clearLevels(){
	for (var i = 1; i <= 10; i++) {
		frameId="#tuner_"+i;
		className="";
		if(i>0 && i<=5){
			className= "green_frame";
		}else if(i <=8){
			className= "yellow_frame";
		}else{
			className= "red_frame";
		}
		$(frameId).removeClass(className);
		$("#message").html("");
	}
}

function updateLevel(){
	console.log(currentLevel);
	for (var i = 1; i <= 10; i++) {
		frameId="#tuner_"+i;
		className="";
		if(i>0 && i<=5){
			className= "green_frame";
		}else if(i <=8){
			className= "yellow_frame";
		}else{
			className= "red_frame";
		}
		$(frameId).removeClass(className);
		if(i<=currentLevel){
			$(frameId).addClass(className);	
		}
	}
	
	if(currentLevel==0){
		$("#message").html("<strong>Bajito en sal<strong>");
	}else if(currentLevel==10){
		$("#message").html("<strong>No te metas a loco<strong>");
	}else{
		$("#message").html("");
	}
}

$(window).load(function(){
	document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
	try {
	    tizen.application.getCurrentApplication().exit();
	} catch (ignore) {
	}
    });
	
	$('#startBtn').on("click", function(){
		$("#startBtn").prop('disabled', true);
		$("#stopBtn").prop('disabled', false);
		console.log(myInterval);
		myInterval = setInterval(function(){ refreshLevel() }, 200);	
		
	});
	
	$('#stopBtn').on("click", function(){
		$("#startBtn").prop('disabled', false);
		$("#stopBtn").prop('disabled', true);
		stop();
	});
	
	$('#title').on("click", function(){
		hasTalent= !hasTalent;
		if(hasTalent){
			$("#hidden_msg").html(".");
		}else{
			$("#hidden_msg").html("");	
		}
		
	});
});


function refreshLevel() {
	var levelDelta= 0;
	if(hasTalent){
		baseLevel=8;
		levelDelta= Math.floor((Math.random() * 3));
	}else{
		baseLevel=0;
		levelDelta= Math.floor((Math.random() * 4));
	}
	currentLevel= baseLevel + levelDelta;
	updateLevel();
	console.log(currentLevel);
}

function stop() {
    clearInterval(myInterval);
    clearLevels();
}