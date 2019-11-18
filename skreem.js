var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=500;
var HEIGHT=50;
var rafID = null;
var highScore=document.cookie;
window.onload = function() {

    // grab our canvas
	canvasContext = document.getElementById( "canvas" ).getContext("2d");

    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
          navigator.getUserMedia =
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}

/*
Usage:
audioNode = createAudioMeter(audioContext,clipLevel,averaging,clipLag);
audioContext: the AudioContext you're using.
clipLevel: the level (0 to 1) that you would consider "clipping".
   Defaults to 0.98.
averaging: how "smoothed" you would like the meter to be over time.
   Should be between 0 and less than 1.  Defaults to 0.95.
clipLag: how long you would like the "clipping" indicator to show
   after clipping has occured, in milliseconds.  Defaults to 750ms.
Access the clipping through node.checkClipping(); use node.shutdown to get rid of it.
*/


function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.98;
	processor.averaging = averaging || 0.99;
	processor.clipLag = clipLag || 750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}



function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	var sum = 0;
    var x;

	// Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);
}

function didntGetStream() {
    alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // kick off the visual updating
    drawLoop();
}

var volumeFun = 0;

function drawLoop( time ) {
    // clear the background
    canvasContext.clearRect(0,0,WIDTH,HEIGHT);

    // check if we're currently clipping
    if (meter.checkClipping())
        canvasContext.fillStyle = "red";
    else
        canvasContext.fillStyle = "green";

    // draw a bar based on the current volume
    canvasContext.fillRect(0, 0, meter.volume*WIDTH*1.4, HEIGHT);
		volumeFun = meter.volume;

		if(flY < 300){
			ctx.drawImage(skreem1, Math.floor((frame)/3)*clip, 0, clip, clip, bX, flY, bW, bH);
			}
		else if( flY > 300  && volumeFun < .1){
			ctx.drawImage(skreem2, Math.floor((frame)/3)*clip, 0, clip, clip, bX, flY, bW, bH);}
		else if(volumeFun >= .1 && volumeFun < .6){
			ctx.drawImage(skreem3, Math.floor((frame)/3)*clip, 0, clip, clip, bX, flY, bW, bH);}
		else if(volumeFun >= .6){
			ctx.drawImage(skreem4, Math.floor((frame)/3)*clip, 0, clip, clip, bX, flY, bW, bH);}
    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
		console.log(flY,volumeFun);

}


//SKREEM
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext('2d');

// load spriteassets

var skreem1 = new Image();
var skreem2 = new Image();
var skreem3 = new Image();
var skreem4 = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();






bg.src = "spriteassets/bg.png";
fg.src = "spriteassets/fg.png"
pipeNorth.src = "spriteassets/pipeNorth.png";
pipeSouth.src = "spriteassets/pipeSouth.png";

// some variables

var gap = 150;
var constant;

var bX = 10;
var bY = 370;
var bW = 32;
var bH = 32;

var gravity = 1.5;
var score = 0;
var flY = 0;

skreem1.src = "sprites/off.png";
skreem2.src = "sprites/lo.png";
skreem3.src = "sprites/med.png";
skreem4.src = "sprites/hi.png";
// if(flY < 10){
// 	skreem.src = "sprites/off.png";}
// else if( flY > 10  && volumeFun < 128){
// 	skreem.src = "sprites/lo.png";}
// else if(volumeFun >= 128 && volumeFun < 256){
// 	skreem.src = "sprites/med.png";}
// else if(volumeFun >= 256){
// 	skreem.src = "sprites/hi.png";}

// pipe coordinates
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw spriteassets

var frame = 0;
var clip = 32;

function draw(){

	flY = bY - (1000*volumeFun);

    ctx.drawImage(bg,0,0);
    for(var i = 0; i < pipe.length; i++){
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }
        // detect collision
        if( bX + bW >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (flY <= pipe[i].y + pipeNorth.height || flY+bH >= pipe[i].y+constant)){
						location.reload();
						console.log("pipe collision detected"); // reload the page
        }
        if(pipe[i].x == 5){
            score++;
						if(score>highScore){
							highScore = score;
							document.cookie = highScore;
						}
        }
    }
    ctx.drawImage(fg,0,cvs.height - fg.height);

		frame++;

		if(frame > 21){
			frame = 0;
		}

    if(bY < 345){
			bY += gravity;
		}

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
		ctx.fillText("High score : "+highScore,110, cvs.height-20);
    requestAnimationFrame(draw);
}


draw();
