export default class Apple {
    /**
     * apple class constructor
     * @param {Array} position apple position
     * @constructor
     */
    constructor(position = [10, 10]) {
        this.position = position;
        this.color = "#f00"
    }

    /**
     * function that randomly selects a new position
     * @param {Number} widthInBlocks number of blocks in width
     * @param {Number} heightInBlocks number of blocks in height
     */
    setNewPosition(widthInBlocks, heightInBlocks) {
        const newX = Math.round(Math.random() * (widthInBlocks - 1));
        const newY = Math.round(Math.random() * (heightInBlocks - 1));
        this.position = [newX, newY];
    }

    /**
     * function that checks if a position is on the snake
     * @param {Object} snakeToCheck snake to check
     * @returns {Boolean} if a position is on the snake or not
     */
    isOnSnake(snakeToCheck) {
        let isOnSnake = false;

        for(let block of snakeToCheck.body) {
            if(this.position[0] === block[0] && this.position[1] === block[1]) {
                isOnSnake = true;
            }
        }

        return isOnSnake;
    }
}
