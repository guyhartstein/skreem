
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
var sY;
var gap = 150;
var constant;
var bX = 10;
var bY = 350;
var bW = 32;
var bH = 32;
var gravity = 1.5;
var score = 0;
var flY = 0;
var highScore = document.cookie;

bg.src = "spriteassets/bg.png";
fg.src = "spriteassets/fg.png"
pipeNorth.src = "spriteassets/pipeNorth.png";
pipeSouth.src = "spriteassets/pipeSouth.png";
skreem1.src = "sprites/off.png";
skreem2.src = "sprites/lo.png";
skreem3.src = "sprites/med.png";
skreem4.src = "sprites/hi.png";
// if(flY < 10){
// 	skreem.src = "sprites/off.png";}
// else if( flY > 10  && volume < 128){
// 	skreem.src = "sprites/lo.png";}
// else if(volume >= 128 && volume < 256){
// 	skreem.src = "sprites/med.png";}
// else if(volume >= 256){
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

sY = 300;
function draw() {

	flY = (volume / 0.35) * (cvs.height);

    ctx.drawImage(bg,0,0);

		//if(flY < 300){
			ctx.drawImage(skreem1, Math.floor((frame)/3)*clip, 0, clip, clip, bX, sY, bW, bH);
		//	}
		// else if( flY > 300  && volume < .1){
		// 	ctx.drawImage(skreem2, Math.floor((frame)/3)*clip, 0, clip, clip, bX, sY, bW, bH);}
		// else if(volume >= .1 && volume < .6){
		// 	ctx.drawImage(skreem3, Math.floor((frame)/3)*clip, 0, clip, clip, bX, sY, bW, bH);}
		// else if(volume >= .6){
		// 	ctx.drawImage(skreem4, Math.floor((frame)/3)*clip, 0, clip, clip, bX, sY, bW, bH);}
    // set up the next visual callback
		console.log(flY,volume);

    if(sY <= flY){
  		sY--;
  	}
    if (sY >= flY){
      if (sY > bY)
      {
  		sY++;
      }
  	}


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
        if( bX + bW >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (sY <= pipe[i].y + pipeNorth.height || sY+bH >= pipe[i].y+constant)){
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

    if(sY < 345){
			sY += gravity;
		}

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
		ctx.fillText("High score : "+highScore,110, cvs.height-20);
    requestAnimationFrame(draw);
}


draw();
