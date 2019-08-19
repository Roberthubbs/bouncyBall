let speed = 4;
let rocket = new Image();
let paddleInc = 7;
rocket.src = 'public/rocket.png';
let ship = new Image();
ship.src = 'public/saucerNew.png';
let planet = new Image();
planet.src = 'public/planet.png';
let flame = new Image();
flame.src = 'public/flame.png';
let difficulty = 0;
let wallE = new Image();
wallE.src = 'public/wallE.png';
let spaceInvader= new Image();
let ball = new Image();
ball.src = 'public/ball.png';
let explosion = new Image();
explosion.src = 'public/explosion.png';
let isWon;
let wallBullsStarting = [];
spaceInvader.src = 'public/spaceInvader.png';
// import { starWars } from "http://allfont.net/allfont.css?fonts=star-jedi";
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("myCanvas");

    const canvasTwo = document.getElementById("canvas2");
    const ctx2 = canvasTwo.getContext("2d");
    canvas.addEventListener('click', () => { 
    
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let x = canvas.width/2;
    let y = canvas.height-290;
    let rockHeight = 40;
    let rockWidth = 30;
    const colors = ["red", "orange", "blue", "green"];
    const easCol = ["white"]
    const randColor = (min, max) => Math.random() * (max-min) + min;
    const colPol = [];
    const arr = [];
    let newX = speed;
    let newY = -speed;
    let ballRadius = 20;
    let paddleWidth = 100;
    let paddleHeight = 10;
    let paddleX = (canvas.width-paddleWidth)/2;
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
    
        
    const mouse = { x: x, y: y};
    for (let i = 0; i < brickColumnCount; i++){
        bricks[i] = [];
        for (let j = 0; j < brickRowCount; j++){
            // if((i + j) % 3 === 0 ){
                bricks[i][j] = {x: 0, y: 0, val: 1}
            
        }
    };
   



    const colPolFiller = function (n) {
        for (let i = 0; i < n; i++) {
            colPol.push({
                x: 0,
                y: 0,
                opacity: .5,
                squareDec: randColor(0.005, 0.02),
                size: randColor(5, 20),
                speed: randColor(1, 4),
                vel: {
                    x: 1,
                    y: 1,
                },
                color: colors[Math.round(Math.random() * colors.length)]
            });
        }
    }
    let bossBull;
    const requestParticles = function (n = 1) {
        for (let i = 0; i < n; i++) {
            if (colPol.length <= 0) break;

            const p = colPol.pop();
            p.x = mouse.x;
            p.y = mouse.y;
            p.vel.x = randColor(-1, 1);
            p.vel.y = randColor(-1, 1);
            p.speed = randColor(1, 4);
            p.size = randColor(5, 20);
            p.opacity = .5;
            p.squareDec = randColor(0.004, 0.01);
            arr.push(p);
        }
    };

    const update = function () {
        if (ballMoving) if (colPol.length > 0) requestParticles(10);

        arr.forEach(p => {
            p.x += p.vel.x * p.speed;
            p.y += p.vel.y * p.speed;
            p.opacity -= p.squareDec;

            if (p.x + p.size >= canvas.width || p.x < 0) p.vel.x *= -1;
            if (p.y + p.size >= canvas.height || p.y < 0) p.vel.y *= -1;

            if (p.opacity <= 0) {
                const index = arr.indexOf(p);
                colPol.push(p);
                arr.splice(index, 1);
            }
        });
    };

  

   function drawScore(){
       ctx.font = '16px Helvetica';
       ctx.fillStyle = "green";
       ctx.fillText("Score: " + score, 8, 20) 
   };
   function drawWin(){
       ctx.font = "30px Verdana";
       // Create gradient
       ctx.fillStyle = "red"
       ctx.fillText("You've defeated all foes", canvas.width / 2-200, canvas.height / 2);

   }
   function drawNextLevel(){
       

       ctx.font = "30px Verdana";
       // Create gradient
       ctx.fillStyle = "red"
       ctx.fillText("More Enemies On The Way", canvas.width / 2-200, canvas.height / 2);

   }
   function drawLives(){
       ctx.font = '16px Helvetica';
       ctx.fillStyle = "red";
       ctx.fillText("Balls Remaining: " + lives, 8, 40);
   };
   function drawGameOver(){
       ctx.font = "Star Jedi";
       // Create gradient
       ctx.fillStyle = "red"
       ctx.fillText("Game Over Maaaaan", canvas.width/2, canvas.height/2);
       
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
                    // startingWallBullX = brickX;
                    // startingWallBullY = brickY+300;
                    bricks[i][j].val = 1;
                    ctx.beginPath();
                    ctx.drawImage(wallE,brickX+30, brickY, brickWidth/2, brickHeight/2+20);
                    // ctx.fillStyle = (difficulty === 0) ? easCol[0] : "red";
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
                        newY = -newY;
                        explosionX = b.x;
                        drawExplosion();
                        b.val = 0;
                        score++;
                        if (score == brickRowCount * brickColumnCount && difficulty <= 2) {
                            // score = 0;
                            difficulty++;
                            speed++;
                            paddleInc++;
                            
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            (difficulty === 3) ? drawWin() : drawNextLevel();

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
                            (difficulty === 3) ? drawWin() : drawNextLevel();

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
    
    function drawBall(){
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(ball, x, y, ballRadius*2, ballRadius*2);
        ctx.rotate(.25);
        
        
        
        ctx.closePath();
        ctx.restore();
    }
    function drawPlanet(){
        ctx.beginPath();
        ctx.globalAlpha = planetOpacity;
        ctx.drawImage(planet, canvas.width/2-400, canvas.height-70, canvas.width, 200);
        ctx.globalAlpha = 1;
        ctx.closePath();
    };
    function drawFlame(){
        ctx2.beginPath();
        
        ctx2.drawImage(flame, explosionX, explosionY, 100, 100);
        ctx2.globalAlpha = 1;
        ctx2.closePath();
    };
    function drawExplosion(){
        ctx2.beginPath();
        
        ctx2.drawImage(explosion, explosionX, explosionY, 100, 100);
        ctx2.globalAlpha = 1;
        ctx2.closePath();
    };
    function drawBullet(){
            bullY = y;
            ctx.beginPath();
            ctx.drawImage(rocket, savePaddle, rockY, rockHeight, rockWidth);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.closePath();
        
    }
    function drawPaddle(){
        ctx.beginPath();
        ctx.drawImage(ship, paddleX, shipHeight, paddleWidth, 50 );
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
    };
    function drawTwo(){
        if (y + 70 > canvas.height - ballRadius) {
            explosionX = x+newX;
            explosionY = 550;
            
            drawFlame();
        }
    }
        
   function draw(){
       if (lives && score != brickRowCount * brickColumnCount){
        
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.save();
       
       drawBall();
        
      
        
          if (brickOffsetLeft < -40){
              brickDecrementor = -brickDecrementor
          }
          if (brickOffsetLeft >100){
              brickDecrementor = -brickDecrementor
          }
       ctx.rotate(.08);
       ctx.restore();
       update();
        drawPaddle();
       
         
       if (y + newY < ballRadius) {
           newY = -newY;
       } else if (y + newY+265 > canvas.height-ballRadius){
           if (x > paddleX && x < paddleX + paddleWidth-18 && y  < 430) {
               if (x < paddleX + paddleWidth / 2){
                    newY = -newY;
                    
                    if (newX > 0){
                        newX = -newX;
                    } else {
                        newX = newX
                    }
                }
                if (x >= paddleX+paddleWidth/2){
                    newY = -newY;
                    if (newX < 0){
                        newX = -newX
                    }
                }
           
            } 
        }
           if (y + 70 > canvas.height - ballRadius){
            
           lives--;
           planetOpacity -= .33;
           if (!lives) {
               
               drawGameOver();

           } else {

               x = canvas.width / 2;
               y = canvas.height - 290;
               newX = speed;
               newY = -speed;
               paddleX = (canvas.width - paddleWidth) / 2;

           };
            
           
       
              
    
       };
       if (x + newX > canvas.width-ballRadius || x + newX< ballRadius) {
           newX = -newX
       };
       
       
       if (bulletMoving) {
           rockY-= 4;
       };
       if (rightPress && paddleX < canvas.width - paddleWidth) {
           paddleX += paddleInc;
           
       }
       else if (leftPress && paddleX > 0) {
           paddleX -= paddleInc;
           
       };
       arr.forEach(p => {
           
            ctx.fillStyle = p.color;
           ctx.globalAlpha = p.opacity;
        //    debugger;
            // console.log(x);
            // console.log(p.x)
            
            if (difficulty === 0){
                ctx.fillRect((p.x), (p.y+200), p.size, p.size);
                ctx.fillRect((p.x-350), (p.y+200), p.size, p.size);
                ctx.fillRect((p.x+350), (p.y+200), p.size, p.size);
                // ctx.fillRect((x), (p.y), p.size*2, p.size*2);
                // ctx.arc((newX + p.x), (p.y + newY) - (y), p.size, 0, Math.PI * 2);
                // ctx.fill();
            } else {
                ctx.fillRect((p.x), (p.y + 200), p.size, p.size);
                ctx.fillRect((p.x - 350), (p.y + 200), p.size, p.size);
                ctx.fillRect((p.x + 350), (p.y + 200), p.size, p.size);
                ctx.fillRect((canvas.width-40), (p.y), p.size/4, p.size/2);
                ctx.fillRect((canvas.width/2), (p.y), p.size/4, p.size/2);
            }
       });
       ctx.globalAlpha = 1;
       x += newX;
       y += newY;
       
       drawScore();
       drawLives();
       detectCollision();
       
       if (bulletMoving){
        drawBullet();
        
       }
       drawBricks();
           
        }
       
       else if (lives && score == brickRowCount * brickColumnCount  && difficuty <= 2)  {
           
           
           drawNextLevel();

           
       }
       else if (lives && score == brickRowCount * brickColumnCount  && difficuty === 3)  {
           
           
           drawWin();

           
       }
      
       
    //    if (score == brickRowCount * brickColumnCount && difficulty  <= 2 )  {
        
    //        ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     //    drawFlame();
    //        drawNextLevel();
        
        
    //    } else if (score == brickRowCount * brickColumnCount && difficulty === 3){
    //        ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     //    drawWin();
    //    }
    brickOffsetLeft += brickDecrementor;
       drawTwo();
       drawPlanet();
       requestAnimationFrame(draw);
    };
    setInterval(() => {
        ctx2.clearRect(0, 0, canvasTwo.width, canvasTwo.height)}, 800)
        
        colPolFiller(400)
        draw();
        
});

// setInterval(() => {speed*=1.1},1000)
});