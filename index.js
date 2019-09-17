import { colPolFiller, update} from './color_squares';
import { drawLives, drawGameOver, drawScore, drawWin} from './draw_words';
import { drawPlanet, drawBall, drawFlame, drawExplosion, drawBullet, drawPaddle } from './draw_sprites';
let speed = 4;
let paddleInc = 7;

let difficulty = 0;
let wallE = new Image();
wallE.src = 'public/wallE.png';
let spaceInvader= new Image();

let isWon;
let wallBullsStarting = [];
spaceInvader.src = 'public/spaceInvader.png';


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("modal");
    const btn = document.getElementById("myBtn");
    const body = document.getElementById("body")
    btn.onclick = function () {
        modal.style.display = "none";
        document.body.style.backgroundColor = "lightblue";
    }
    const canvas = document.getElementById("myCanvas");

    const canvasTwo = document.getElementById("canvas2");
    const ctx2 = canvasTwo.getContext("2d");
    canvas.addEventListener('click', () => { 
    
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height - 290;
        
    let rockHeight = 40;
    let rockWidth = 30;
    
    const easCol = ["white"]
 
    const arr = [];
    let newX = speed;
    let newY = -speed;
    let ballRadius = 20;
    
    let paddleHeight = 10;
    let paddleX = (canvas.width)/2;
    let planetOpacity = 1;
    let rightPress = false;
    let leftPress = false;
    const shipHeight = canvas.height - 270;
    const bullRadius = 2;
    let brickRowCount;
    let savePaddle;
    let bullY;
    let explosionX;
    let explosionY;
    let drawTimes = 50;
    let rockY = canvas.height-250;
    let gameOver = document.getElementById('gameover');
     if (difficulty === 0){
         brickRowCount = 3;
     } else if (difficulty === 1){
         brickRowCount = 4;
     }
     else if (difficulty === 2){
         brickRowCount = 5;
     };
     let containsBrick = [];
    let brickColumnCount = 5;
    let brickWidth = 140;
    let brickHeight = 40;
    let brickPadding = 10;
    let brickOffsetTop = 50;
    let brickOffsetLeft = 30;
    let brickDecrementor = 3;
    let wallBullRad = 10;
    let bricks = [];
    let score = 0;
    let lives = 3;
    let ballMoving = false;
    let spacePress = false;
    let bulletMoving = false;
    let wallBullOneX;
    let wallBullOneY;
    let angle = Math.PI/2;

        
    const mouse = { x: x, y: y};
    for (let i = 0; i < brickColumnCount; i++){
        bricks[i] = [];
        for (let j = 0; j < brickRowCount; j++){
            // if((i + j) % 3 === 0 ){
                bricks[i][j] = {x: 0, y: 0, val: 1}
            
        }
    };
   


    let bossBull;
   

       const drawNextLevel = () => {



            ctx.font = 'bold 50px Arial, sans-serif';
            ctx.fillStyle = '#ff0000';
            ctx.fillText('More Foes On the Way', canvas.width / 2 - 225, canvas.height / 2);
            ctx.strokeStyle = 'blue';
            ctx.strokeText('More Foes On the Way', canvas.width / 2 - 225, canvas.height / 2);
            ctx.textBaseline = 'bottom';
        }
   

  


    function drawBricks(){
        for (let i = 0; i < brickColumnCount; i++) {
            for (let j = 0; j < brickRowCount; j++) {
                
                if(bricks[i][j].val === 1 && (i+j) !== 5 ){
                let brickX = (((i * (brickWidth + brickPadding) + brickOffsetLeft)));
                let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.drawImage(spaceInvader, brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = (difficulty === 0) ? easCol[0] : "red";
                ctx.fill();
                ctx.closePath();
                } 
                else if (bricks[i][j].val === 1 && (i + j) === 5 ){
                    let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                    let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[i][j].x = brickX;
                    bricks[i][j].y = brickY;
                    wallBullsStarting.push([brickX+30,brickY])
                    
                    bricks[i][j].val = 1;
                    ctx.beginPath();
                    ctx.drawImage(wallE,brickX+30, brickY, brickWidth/2, brickHeight/2+20);
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
        
    }
    function descWallBull(){
        if (wallBullOneY){
            wallBullOneY+=1.5
        }
    }
    function keyDownHandler(e){
        if (e.key == "Right" || e.key == "ArrowRight"){
            ballMoving = true;
            rightPress = true;
        }
        if (e.key == "Left" || e.key == "ArrowLeft"){
            ballMoving = true;
            leftPress = true;
        }
        if (e.key == "a" && lives < 3){
            bulletMoving = true;
            spacePress = true;
            savePaddle = paddleX;
        }
    };
    function keyUpHandler(e){
        if (e.key == "Right" || e.key == "ArrowRight"){
            ballMoving = false;
            rightPress = false;
        }
        if (e.key == "Left" || e.key == "ArrowLeft"){
            ballMoving = false;
            leftPress = false;
        }
        
    };
    function detectCollision() {
        // 
        
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.val == 1 && (c + r) !== 5) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        explosionY = b.y;
                        // newY = -newY;
                        angle = (Math.PI*2)-angle;
                        explosionX = b.x;
                        drawExplosion(ctx2, explosionX, explosionY) ;
                        b.val = 0;
                        score++;
                        if (score == brickRowCount * brickColumnCount && difficulty <= 2) {
                            // score = 0;
                            difficulty++;
                            speed++;
                            paddleInc++;
                            
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            (difficulty === 3) ? drawWin(ctx, canvas, difficulty) : drawNextLevel();

                        } 
                    } 
                    if (savePaddle > b.x-20 && savePaddle < b.x + brickWidth+20 && rockY > b.y && rockY < b.y + brickHeight){
                        
                        b.val = 0;
                        score++;
                        bulletMoving = false;
                        rockY = canvas.height - 250;
                        if (score == brickRowCount * brickColumnCount && difficulty <= 2) {
                            // score = 0;
                            difficulty++;
                            speed++;
                            paddleInc++;
                            
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            (difficulty === 3) ? drawWin(ctx, canvas, difficulty) : drawNextLevel();

                        } 
                    } else if (rockY < -750){
                        rockY = canvas.height-250;
                    }
                } else if (b.val === 1 && (c+r) === 5){
                    if (x > b.x+30 && x < b.x+30 + brickWidth/2 && y > b.y+20 && y < b.y+20 + brickHeight/2+20){
                        b.val=0;
                        score++;
                        
                    } 
                }
                
            }
        }
    }
    
    
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    
    function drawTwo(){
        if (y + 70 > canvas.height - ballRadius) {
            explosionX = x+newX;
            explosionY = 550;
            
            drawFlame(ctx2, explosionX, explosionY);
        }
    }
        
   function draw(){
       if (lives && score != brickRowCount * brickColumnCount){
        
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.save();
       
        drawBall(ctx, x, y);
        
      
        
          if (brickOffsetLeft < -40){
              brickDecrementor = -brickDecrementor
          }
          if (brickOffsetLeft >100){
              brickDecrementor = -brickDecrementor
          }
       ctx.rotate(.08);
       ctx.restore();
       update(canvas, ballMoving, mouse, ctx, difficulty);
        drawPaddle(ctx, paddleX, shipHeight);
       
         
       if (y < ballRadius) {
           angle = (Math.PI*2) - angle;
       } else if (y > shipHeight-4){
           
           if (x > paddleX-100/2 && x < paddleX + 100/2 && y  < shipHeight+10) {
               if (x < paddleX){
                    let pct = (paddleX-x)/100
                    console.log(pct)
                    angle = Math.sin(x/paddleX)+Math.PI+(Math.PI/5)-pct;
                   
                }
                if (x >= paddleX){
                    let pct = (x-paddleX)/100
                    angle = (Math.PI/2) +(Math.PI/9) + (Math.PI)+pct;
                    // if (newX < 0){
                    //     newX = -newX
                    // }
                }
           
            } 
        }
           if (y + 70 > canvas.height - ballRadius){
            
           lives--;
           planetOpacity -= .33;
           if (!lives) {
               
            drawGameOver(ctx, canvas, difficulty);

           } else {

               x = canvas.width / 2;
               y = canvas.height - 290;
               
               paddleX = (canvas.width/2)

           };
            
           
       
              
    
       };
       if (x + newX > canvas.width-ballRadius || x + newX< ballRadius) {
           angle = Math.PI*3-angle;
       };
       
       
       if (bulletMoving) {
           rockY-= 4;
       };
       if (rightPress && paddleX < canvas.width) {
           paddleX += paddleInc;
           
       }
       else if (leftPress && paddleX > 0) {
           paddleX -= paddleInc;
           
       };
    
       ctx.globalAlpha = 1;
  
       x += Math.cos(angle)*speed;
       y += Math.sin(angle)*speed;
   
        drawScore(ctx, score);
        drawLives(ctx, lives);
       detectCollision();
       
       if (bulletMoving){
        drawBullet(ctx, bullY, y, savePaddle, rockY, rockHeight, rockWidth) ;
        
       }
       drawBricks();
           
        }
       
       else if (lives && score == brickRowCount * brickColumnCount  && difficuty <= 2)  {
           
           
           drawNextLevel();

           
       }
       else if (lives && score == brickRowCount * brickColumnCount  && difficuty === 3)  {
           
           
           drawWin(ctx, canvas, difficulty);

           
       }
      
    brickOffsetLeft += brickDecrementor;
       drawTwo();
       drawPlanet(ctx, canvas, planetOpacity);
       requestAnimationFrame(draw);
    };
    setInterval(() => {
        ctx2.clearRect(0, 0, canvasTwo.width, canvasTwo.height)}, 800)
        
        colPolFiller(400)
        draw();
        
});



});