let speed = 4;
let rocket = new Image();
let paddleInc = 7;
rocket.src = 'public/rocket.png';
let ship = new Image();
ship.src = 'public/saucerNew.png';
let planet = new Image();
planet.src = 'public/planet.png';
let difficulty = 0;
document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.getElementById("myCanvas");


    canvas.addEventListener('click', () => { 
       
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let x = canvas.width/2;
    let y = canvas.height-290;
    let rockHeight = 20;
    let rockWidth = 17;
    const colors = ["red", "orange", "blue", "green"];
    const easCol = ["white"]
    const randColor = (min, max) => Math.random() * (max-min) + min;
    const colPol = [];
    const arr = [];
    let newX = speed;
    let newY = -speed;
    let ballRadius = 10;
    let paddleWidth = 75;
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
    let rockY = canvas.height-30;
    let gameOver = document.getElementById('gameover')
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
    let bricks = [];
    let score = 0;
    let lives = 3;
    let ballMoving = false;
    let spacePress = false;
    let bulletMoving = false;
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
   function drawLives(){
       ctx.font = '16px Helvetica';
       ctx.fillStyle = "red";
       ctx.fillText("Balls Remaining: " + lives, 8, 40);
   };
   function drawGameOver(){
       ctx.font = "30px Verdana";
       // Create gradient
       ctx.fillStyle = "red"
       ctx.fillText("Game Over Maaaaan", canvas.width/2, canvas.height/2);
       
   }
    function drawBricks(){
        for (let i = 0; i < brickColumnCount; i++) {
            for (let j = 0; j < brickRowCount; j++) {
                
                if(bricks[i][j].val === 1 && (i+j) !== 5 ){
                let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = (difficulty === 0) ? easCol[0] : "red";
                ctx.fill();
                ctx.closePath();
                } 
                else if (bricks[i][j].val === 1 && (i + j) === 5 ){
                    let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                    let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[i][j].x = brickX;
                    bricks[i][j].y = brickY;
                    bricks[i][j].val = 1
                    ctx.beginPath();
                    ctx.rect(brickX+30, brickY+20, brickWidth/2, brickHeight/2);
                    ctx.fillStyle = (difficulty === 0) ? easCol[0] : "red";
                    ctx.fill();
                    ctx.closePath();
                }
            }
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
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.val == 1 && (c + r) !== 5) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        newY = -newY;
                        b.val = 0;
                        score++;
                        if (score == brickRowCount * brickColumnCount) {
                            difficulty++;
                             drawGameOver();
                            
                        }
                    } else if (savePaddle > b.x && savePaddle < b.x + brickWidth && rockY > b.y && rockY < b.y + brickHeight){
                        b.val = 0;
                        score++;
                        bulletMoving = false;
                        rockY = canvas.height - 30;
                        if (score == brickRowCount * brickColumnCount) {
                            // difficulty++;
                        drawGameOver();

                        }
                    }
                } else if (b.val === 1 && (c+r) === 5){
                    if (x > b.x+30 && x < b.x+30 + brickWidth/2 && y > b.y+20 && y < b.y+20 + brickHeight/2){
                        b.val=0;
                        score++;
                        if (score == brickRowCount * brickColumnCount) {
                            difficulty++;
                            drawGameOver();

                        };
                    } 
                }
            }
        }
    }
    
    
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    function drawBall(){
        
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
    function drawPlanet(){
        ctx.beginPath();
        ctx.globalAlpha = planetOpacity;
        ctx.drawImage(planet, canvas.width/2-400, canvas.height-70, canvas.width, 200);
        ctx.globalAlpha = 1;
        ctx.closePath();
    }
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
    }
   function draw(){
       if (lives){

       ctx.clearRect(0, 0, canvas.width, canvas.height);
       
       drawBall();
       update();
        drawPaddle();
       if (y + newY < ballRadius) {
           newY = -newY;
       } else if (y + newY+240 > canvas.height-ballRadius){
           if (x > paddleX && x < paddleX + paddleWidth) {
               newY = -newY;
           } else {
                lives--;
                planetOpacity -= .33;
                if (!lives){
                    // alert("Better luck next time");
                    // document.location.reload();
                    // drawGameOver();
                    
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 290;
                    newX = speed;
                    newY = -speed;
                    paddleX = (canvas.width - paddleWidth) / 2;
                };
           };
       };
       if (x + newX > canvas.width-ballRadius || x + newX < ballRadius) {
           newX = -newX;
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
                ctx.fillRect((p.x), (p.y+60), p.size, p.size);
                ctx.fillRect((p.x-350), (p.y+60), p.size, p.size);
                ctx.fillRect((p.x+350), (p.y+60), p.size, p.size);
                // ctx.fillRect((x), (p.y), p.size*2, p.size*2);
                // ctx.arc((newX + p.x), (p.y + newY) - (y), p.size, 0, Math.PI * 2);
                // ctx.fill();
            } else {
                ctx.fillRect((p.x), (p.y + 60), p.size, p.size);
                ctx.fillRect((p.x - 350), (p.y + 60), p.size, p.size);
                ctx.fillRect((p.x + 350), (p.y + 60), p.size, p.size);
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
       
       if (!lives)  {
           drawGameOver();
       }
       if (score == brickColumnCount * brickRowCount)  {
            
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           drawGameOver();
        //    difficulty++;
           lives = 3;
           speed = speed + 0.0002;
           paddleInc += .0002;
        
       }
       drawPlanet();
       requestAnimationFrame(draw);
    };
    colPolFiller(400)
    draw();
});

// setInterval(() => {speed*=1.1},1000)
});