export default class Drawing {
    /**
     * function that displays "game over" and the message to replay on screen
     * @param {CanvasRenderingContext2D} ctx context
     * @param {Number} centreX center of the canvas on the x axis
     * @param {Number} centreY center of the canvas on the y axis
     */
    static gameOver(ctx, centreX, centreY) {
        ctx.save();
        ctx.font = "bold 48px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeText("Game Over", centreX, centreY - 120);
        ctx.fillText("Game Over", centreX, centreY - 120);
        ctx.font = "bold 18px sans-serif";
        ctx.strokeText("Press space key to play again", centreX, centreY - 80);
        ctx.fillText("Press space key to play again", centreX, centreY - 80);
        ctx.restore();
    }

    /**
     * function that displays the score on the screen
     * @param {CanvasRenderingContext2D} ctx context
     * @param {Number} centreX center of the canvas on the x axis
     * @param {Number} centreY center of the canvas on the y axis
     * @param {number} score score
     */
    static drawScore(ctx, centreX, centreY, score) {
        ctx.save();
        ctx.font = "bold 100px sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(score.toString(), centreX, centreY);
        ctx.restore();
    }

    /**
     * function that draws the snake 
     * @param {CanvasRenderingContext2D} ctx context
     * @param {Number} blockSize block size
     * @param {Object} snake snake
     */
    static drawSnake(ctx, blockSize, snake) {
        ctx.save();
        ctx.fillStyle = snake.color;
        
        for(let block of snake.body) {
            this.drawBlock(ctx, block, blockSize);
        }

        ctx.restore();
    }

    /**
     * function that draws the apple 
     * @param {CanvasRenderingContext2D} ctx context
     * @param {Number} blockSize block size
     * @param {Object} apple apple
     */
    static drawApple(ctx, blockSize, apple) {
        const radius = blockSize / 2;
        const x = apple.position[0] * blockSize + radius;
        const y = apple.position[1] * blockSize + radius;
        ctx.save();
        ctx.fillStyle = apple.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();
    }

    /**
     * function that draws a block
     * @param {CanvasRenderingContext2D} ctx context
     * @param {Array} position block position
     * @param {Number} blockSize block size
     */
    static drawBlock(ctx, position, blockSize) {
        const [x, y] = position;
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
}
