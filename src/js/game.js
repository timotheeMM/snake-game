import Snake from "./snake.js";
import Apple from "./apple.js";
import Drawing from "./drawing.js";


export default class Game {
    /**
     * game class constructor
     * @param {Number} canvasWidth canvas width
     * @param {Number} canvasHeight canvas height
     * @constructor
     */
    constructor(canvasWidth = 580, canvasHeight = 340) {
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

    /**
     * function that initializes the canvas
     */
    init() {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = "25px solid skyblue";
        this.canvas.style.margin = "35px auto";
        this.canvas.style.display = "block";
        this.canvas.style.backgroundColor = "#00f";
        document.body.appendChild(this.canvas);
        this.launch();
    }

    /**
     * function that launches the game
     */
    launch() {
        this.snakee = new Snake("right", [6, 4], [5, 4], [4, 4], [3, 4], [2, 4]);
        this.applee = new Apple();
        this.score = 0;
        clearTimeout(this.timeout);
        this.delay = 100
        this.refreshCanvas();
    }

    /**
     * function that updates the canvas according to the position of the snake and the apple
     */
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

    /**
     * function that multiplies the speed of the snake by 1.25
     */
    speedUp() {
        this.delay /= 1.25;
    }

    /**
     * function that changes the color of the snake or apple
     * @param {String} snakeOrApple "snake" or "apple"
     */
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
            newColor = this.colors[Math.round(Math.random() * 4)]
        } while(toChange.color === newColor || newColor === other.color);

        toChange.color = newColor;
    }
}
