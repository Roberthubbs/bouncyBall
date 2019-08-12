document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("myCanvas");


    canvas.addEventListener('click', () => { 
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let x = canvas.width/2;
    let y = canvas.height - 30;
    const colors = ["red", "orange", "blue", "green", "brown", "yellow", "teal"];
    const randColor = (min, max) => Math.random() * (max-min) + min;
    const colPol = [];
    const arr = [];
    let newX = 2;
    let newY = -2;
    let ballRadius = 10;
    let paddleWidth = 75;
    let paddleHeight = 10;
    let paddleX = (canvas.width-paddleWidth)/2;
    let rightPress = false;
    let leftPress = false;
    let difficulty = document.getElementById("selector").value
    let brickRowCount;
     if (difficulty === '0'){
         brickRowCount = 3;
     } else {
         brickRowCount = 4;
     };
    let brickColumnCount = 5;
    let brickWidth = 140;
    let brickHeight = 40;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    let bricks = [];
    let score = 0;
    let lives = 3;
    let ballMoving = false;
    const mouse = { x: x, y: y};
    for (let i = 0; i < brickColumnCount; i++){
        bricks[i] = [];
        for (let j = 0; j < brickRowCount; j++){
            bricks[i][j] = {x: 0, y: 0, val: 1}
        }
    };
    const colPolFiller = function (n) {
        for (let i = 0; i < n; i++) {
            colPol.push({
                x: 0,
                y: 0,
                alpha: 1,
                shrink: randColor(0.004, 0.01),
                size: randColor(5, 20),
                speed: randColor(1, 4),
                vel: {
                    x: randColor(-1, 1),
                    y: randColor(-1, 1),
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
            p.alpha = 1;
            p.shrink = randColor(0.004, 0.01);
            arr.push(p);
        }
    };

    const update = function () {
        if (ballMoving) if (colPol.length > 0) requestParticles(10);

        arr.forEach(p => {
            p.x += p.vel.x * p.speed;
            p.y += p.vel.y * p.speed;
            p.alpha -= p.shrink;

            if (p.x + p.size >= canvas.width || p.x < 0) p.vel.x *= -1;
            if (p.y + p.size >= canvas.height || p.y < 0) p.vel.y *= -1;

            if (p.alpha <= 0) {
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
       ctx.fillText("Lives: " + lives, canvas.width-65, 20);
   };
    function drawBricks(){
        for (let i = 0; i < brickColumnCount; i++) {
            for (let j = 0; j < brickRowCount; j++) {
                if(bricks[i][j].val === 1){
                let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "green";
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
                if (b.val == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        newY = -newY;
                        b.val = 0;
                        score++;
                        if (score == brickRowCount * brickColumnCount) {
                            alert("Winner, winner");
                            document.location.reload();
                            
                        }
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
    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
    }
   function draw(){
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       drawBall();
       
       drawBricks();
       if (y + newY < ballRadius) {
           newY = -newY;
       } else if (y + newY > canvas.height-ballRadius){
           if (x > paddleX && x < paddleX + paddleWidth) {
               newY = -newY;
           } else {
                lives--;
                if (!lives){
                    alert("Better luck next time");
                    document.location.reload();
                    
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    newX = 2;
                    newY = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                };
           };
       };
       if (x + newX > canvas.width-ballRadius || x + newX < ballRadius) {
           newX = -newX;
       };
       if (rightPress && paddleX < canvas.width - paddleWidth) {
           paddleX += 7;
       }
       else if (leftPress && paddleX > 0) {
           paddleX -= 7;
       };
       arr.forEach(p => {
           ctx.fillStyle = p.color;
           ctx.globalAlpha = p.alpha;
        //    debugger;
            // console.log(x);
            // console.log(p.x)
            
            if (difficulty === '0'){
                ctx.fillRect((newX + p.x), (p.y+newY)-(y), p.size, p.size);
                ctx.fillRect((x), (p.y), p.size*2, p.size*2);
            } else {
                ctx.fillRect((newX + p.x), (p.y + newY) - (y), p.size, p.size);
                ctx.fillRect((newX + p.x), (y), p.size, p.size);
                ctx.fillRect((newX + p.x), (y+20), p.size, p.size);
                ctx.fillRect((x), (p.y), p.size * 2, p.size * 2);
                ctx.fillRect((newX - p.x), (p.y + newY) - (y+20), p.size, p.size);
                ctx.fillRect((newX), (p.y), p.size * 4, p.size * 2);
                ctx.fillRect((newX - p.x), (p.y + newY) - (y+20), p.size, p.size);
                ctx.fillRect((canvas.width-40), (p.y), p.size * 4, p.size * 2);
                ctx.fillRect((canvas.width/2), (p.y), p.size * 4, p.size * 2);
            }
       });
       ctx.globalAlpha = 1;
       x += newX;
       y += newY;
       drawPaddle();
       drawScore();
       drawLives();
       detectCollision();
       update();
       requestAnimationFrame(draw);
   };
   colPolFiller(400)
   draw();
});
});