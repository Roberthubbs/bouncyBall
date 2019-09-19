
export const drawWin = (ctx, canvas, difficulty) => {
    ctx.font = "30px Verdana";
    // Create gradient
    ctx.font = 'bold 50px Arial, sans-serif';
    ctx.fillStyle = '#ff0000';
    ctx.fillText('All Invaders Defeated', canvas.width / 2 - 225, canvas.height / 2);
    ctx.strokeStyle = 'blue';
    ctx.strokeText('All Invaders Defeated', canvas.width / 2 - 225, canvas.height / 2);
    ctx.textBaseline = 'bottom';
    difficulty = 0;
}

export const drawScore = (ctx, score) => {
    ctx.font = '16px Helvetica';
    ctx.fillStyle = "green";
    ctx.fillText("Score: " + score, 8, 20)
};


export const drawLives = (ctx, lives) => {
    ctx.font = '16px Helvetica';
    ctx.fillStyle = "red";
    ctx.fillText("Balls Remaining: " + lives, 8, 40);
};
export const drawGameOver = (ctx, canvas, difficulty) => {
    ctx.font = "Star Jedi 40px";
    ctx.font = 'bold 50px Arial, sans-serif';
    ctx.fillStyle = '#ff0000';
    ctx.fillText('Game Over, Man', canvas.width / 2 - 225, canvas.height / 2);
    ctx.strokeStyle = 'blue';
    ctx.strokeText('Game Over, Man', canvas.width / 2 - 225, canvas.height / 2);
    ctx.textBaseline = 'bottom';
    difficulty = 0;
}
export const drawNextLevel = (ctx, canvas) => {



    ctx.font = 'bold 50px Arial, sans-serif';
    ctx.fillStyle = '#ff0000';
    ctx.fillText('More Foes On the Way', canvas.width / 2 - 225, canvas.height / 2);
    ctx.strokeStyle = 'blue';
    ctx.strokeText('More Foes On the Way', canvas.width / 2 - 225, canvas.height / 2);
    ctx.textBaseline = 'bottom';
}