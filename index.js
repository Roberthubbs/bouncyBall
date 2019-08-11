document.addEventListener('DOMContentLoaded', () => { 
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let x = canvas.width/2;
    let y = canvas.height - 30;
    const colors = ["red", "orange", "blue", "green", "black", "#4488FF", "teal"];
    let newX = 2;
    let newY = -2;
    let ballRadius = 10;
    let paddleWidth = 75;
    let paddleHeight = 10;
    let paddleX = (canvas.width-paddleWidth)/2;
    let rightPress = false;
    let leftPress = false;
    let brickRowCount = 3;
    let brickColumnCount = 5;
    let brickWidth = 140;
    let brickHeight = 40;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    let bricks = [];
    let score = 0;
    let lives = 3;
    for (let i = 0; i < brickColumnCount; i++){
        bricks[i] = [];
        for (let j = 0; j < brickRowCount; j++){
            bricks[i][j] = {x: 0, y: 0, val: 1}
        }
    };
   function drawScore(){
       ctx.font = '16px Helvetica';
       ctx.fillStyle = "#0095DD";
       ctx.fillText("Score: " + score, 8, 20) 
   };
   function drawLives(){
       ctx.font = '16px Helvetica';
       ctx.fillStyle = "#0095DD";
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
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
                }
            }
        }
    }
    
    function keyDownHandler(e){
        if (e.key == "Right" || e.key == "ArrowRight"){
            rightPress = true;
        }
        if (e.key == "Left" || e.key == "ArrowLeft"){
            leftPress = true;
        }
    };
    function keyUpHandler(e){
        if (e.key == "Right" || e.key == "ArrowRight"){
            rightPress = false;
        }
        if (e.key == "Left" || e.key == "ArrowLeft"){
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
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
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
       }
       x += newX;
       y += newY;
       drawPaddle();
       drawScore();
       drawLives();
       detectCollision();
       requestAnimationFrame(draw);
   };
   draw();
});