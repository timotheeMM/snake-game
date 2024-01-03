export default class Snake {
    /**
     * snake class constructor
     * @param {String} direction snake direction
     * @param  {Array} body snake body
     * @constructor
     */
    constructor(direction, ...body) {
        this.body = body;
        this.direction = direction;
        this.color = "#3c3"
        this.ateApple = false;
    }

    /**
     * function that moves the snake according to the direction
     */
    advance() {
        const nextPosition = this.body[0].slice();

        switch(this.direction) {
            case "left":
                nextPosition[0] -= 1;
                break;

            case "right":
                nextPosition[0] += 1;
                break;

            case "down":
                nextPosition[1] += 1;
                break;

            case "up":
                nextPosition[1] -= 1;
                break;

            default:
                    throw("Invalid Direction")
        }

        this.body.unshift(nextPosition);

        if(!this.ateApple) {
            this.body.pop();
        } else {
            this.ateApple = false;
        }
    }

    /**
     * function that changes the direction of the snake if allowed
     * @param {String} newDirection new snake direction
     */
    setDirecton(newDirection) {
        let allowedDirections;

        switch(this.direction) {
            case "left":
            case "right":
                allowedDirections = ["up", "down"];
                break;

            case "down":
            case "up":
                allowedDirections = ["left", "right"];
                break;
            
            default:
                throw("Invalid Direction")
        }

        if(allowedDirections.includes(newDirection)) {
            this.direction = newDirection;
        }
    }

    /**
     * function that checks if the snake has hit a wall or itself
     * @param {Number} widthInBlocks number of blocks in width
     * @param {Number} heightInBlocks number of blocks in height
     * @returns {Boolean} if the snake hit something or not 
     */
    checkCollision(widthInBlocks, heightInBlocks) {
        let wallCollision = false;
        let snakeCollision = false;
        const [head, ...rest] = this.body;
        const [snakeX, snakeY] = head;
        const minX = 0;
        const minY = 0;
        const maxX = widthInBlocks - 1;
        const maxY = heightInBlocks - 1;
        const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
        const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

        if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
            wallCollision = true;
        }

        for(let block of rest) {
            if(snakeX === block[0] && snakeY === block[1])
            {
                snakeCollision = true;
            }
        }

        return wallCollision || snakeCollision;
    }

    /**
     * function that checks if the snake is eating the apple
     * @param {Object} appleToEat apple to eat 
     * @returns {Boolean} if the snake is eating the apple or not
     */
    isEatingApple(appleToEat) {
        const head = this.body[0];

        if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
            return true;
        } else {
            return false;
        }
    }
}
