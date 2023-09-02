import Game from "./game.js";


window.onload = () => {
    let myGame = new Game();
    myGame.init();

    document.onkeydown = (e) => {
        const key = e.keyCode;
        let newDirection;

        switch(key) {
            case 37:
                newDirection = "left";
                break;

            case 38:
                newDirection = "up";
                break;

            case 39:
                newDirection = "right";
                break;

            case 40:
                newDirection = "down";
                break;
            
            case 32:
                myGame.launch();
                break;

            case 65:
                myGame.changeColor("apple");
                break;
            
            case 83:
                myGame.changeColor("snake");
                break;
            
            default:
                break;
        }

        myGame.snakee.setDirecton(newDirection);
    };
}
