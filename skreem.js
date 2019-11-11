var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=500;
var HEIGHT=50;
var rafID = null;

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

    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
}


//SKREEM
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext('2d');

// load spriteassets

var skreem= new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

skreem.src = "sprites/off.png";
bg.src = "spriteassets/bg.png";
fg.src = "spriteassets/fg.png"
pipeNorth.src = "spriteassets/pipeNorth.png";
pipeSouth.src = "spriteassets/pipeSouth.png";

// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 370;
var bW = 32;
var bH = 32;

var gravity = 1.5;

var score = 0;


// Create a new volume meter and connect it.
var volume = 0;
bY -= volume;

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
        if( bX + bW >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bH >= pipe[i].y+constant)){
            location.reload();
						console.log("pipe collision detected"); // reload the page
        }
        if(pipe[i].x == 5){
            score++;
        }
    }
    ctx.drawImage(fg,0,cvs.height - fg.height);
		//volume switches sprites

    ctx.drawImage(skreem, Math.floor((frame)/3)*clip, 0, clip, clip, bX, bY, bW, bH);
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

    requestAnimationFrame(draw);
}

draw();
