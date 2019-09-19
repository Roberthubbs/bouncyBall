import {drawExplosion } from './draw_sprites';
import { drawWin, drawNextLevel} from './draw_words';
import { speed, score } from './index';
export const detectCollision = (x, y, brickColumnCount, brickRowCount, brickWidth, brickHeight, bricks, ctx, ctx2, canvas, difficulty, rockY, savePaddle, paddleInc, explosionX, explosionY, angle, speed, score) => {
    // let speed = speed;
    // let myScore = score;
    // 
    
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.val == 1 && (c + r) !== 5) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    explosionY = b.y;
                    // newY = -newY;
                    angle = (Math.PI * 2) - angle;
                    x += Math.cos(angle) * speed;
                    y += Math.sin(angle) * speed;
                    explosionX = b.x;
                    drawExplosion(ctx2, explosionX, explosionY);
                    b.val = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount && difficulty <= 2) {
                        // score = 0;
                        difficulty++;
                        speed++;
                        paddleInc++;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        (difficulty === 3) ? drawWin(ctx, canvas, difficulty) : drawNextLevel(ctx, canvas);
                        

                    }
                    
                }
                if (savePaddle > b.x - 20 && savePaddle < b.x + brickWidth + 20 && rockY > b.y && rockY < b.y + brickHeight) {

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
                        (difficulty === 3) ? drawWin(ctx, canvas, difficulty) : drawNextLevel(ctx, canvas);
                        
                    }
                } else if (rockY < -750) {
                    rockY = canvas.height - 250;
                }
            } else if (b.val === 1 && (c + r) === 5) {
                if (x > b.x + 30 && x < b.x + 30 + brickWidth / 2 && y > b.y + 20 && y < b.y + 20 + brickHeight / 2 + 20) {
                    b.val = 0;
                    score++;

                }
            }

            
        }
    }
    // speed = speed
    // score = myScore
    return (x, y, brickColumnCount, brickRowCount, brickWidth, brickHeight, bricks, ctx, ctx2, difficulty, rockY, savePaddle, paddleInc, explosionX, explosionY, angle, speed, score)
}