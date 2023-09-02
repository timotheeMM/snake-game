import Snake from "./snake.js";
import Apple from "./apple.js";
import Drawing from "./drawing.js";


export default class Game {
    constructor(canvasWidth = 600, canvasHeight = 400) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.blockSize = 20;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.widthInBlocks = this.canvasWidth / this.blockSize;
        this.heightInBlocks = this.canvasHeight / this.blockSize;
        this.centreX = this.canvasWidth / 2;
        this.centreY = this.canvasHeight / 2;
        this.colors = ["#ff8b00ff", "#ffee02ff", "#f1258bff", "#3c3", "#f00"];
        this.delay;
        this.snakee;
        this.applee;
        this.score;
        this.timeout;
    }

    init() {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = "25px solid white";
        this.canvas.style.margin = "40px auto";
        this.canvas.style.display = "block";
        this.canvas.style.backgroundColor = "#00f";
        document.body.appendChild(this.canvas);
        this.launch();
    }

    launch() {
        this.snakee = new Snake("right", [6, 4], [5, 4], [4, 4], [3, 4], [2, 4]);
        this.applee = new Apple();
        this.score = 0;
        clearTimeout(this.timeout);
        this.delay = 100
        this.refreshCanvas();
    }

    refreshCanvas() {
        this.snakee.advance();

        if(this.snakee.checkCollision(this.widthInBlocks, this.heightInBlocks)) {
            Drawing.gameOver(this.ctx, this.centreX, this.centreY);
        } else {
            if(this.snakee.isEatingApple(this.applee)) {
                this.score++;
                this.snakee.ateApple = true;
                
                this.snakee.color = this.applee.color;
                this.changeColor('apple');

                do {
                    this.applee.setNewPosition(this.widthInBlocks, this.heightInBlocks);
                } while(this.applee.isOnSnake(this.snakee))

                if(this.score % 5 === 0) {
                    this.speedUp();
                }
            }

            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            Drawing.drawScore(this.ctx, this.centreX, this.centreY, this.score);
            Drawing.drawSnake(this.ctx, this.blockSize, this.snakee);
            Drawing.drawApple(this.ctx, this.blockSize, this.applee);
            this.timeout = setTimeout(this.refreshCanvas.bind(this), this.delay);
        }
    }

    speedUp() {
        this.delay /= 1.25;
    }

    changeColor(snakeOrApple) {
        let toChange;
        let other;
        let newColor;

        if(snakeOrApple === "snake") {
            toChange = this.snakee;
            other = this.applee
        } else {
            toChange = this.applee;
            other = this.snakee
        }

        do {
            newColor = this.colors[Math.floor(Math.random() * 5)]
        } while(toChange.color === newColor || newColor === other.color);

        toChange.color = newColor;
    }
}
