export default class Apple {
    constructor(position = [10, 10]) {
        this.position = position;
        this.color = "#f00"
    }

    setNewPosition(widthInBlocks, heightInBlocks) {
        const newX = Math.round(Math.random() * (widthInBlocks - 1));
        const newY = Math.round(Math.random() * (heightInBlocks - 1));
        this.position = [newX, newY];
    }

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
