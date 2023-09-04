import Game from "./game.js";


window.onload = () => {
    let myGame = new Game();
    myGame.init();

    /**
     * function that processes keyboard keys
     * @param {KeyboardEvent} e pressed key
     */
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

const changeThemeButton = document.querySelector(".changeTheme")
let toggleTheme = 0;

/**
 * function that changes the theme if the button is pressed
 */
changeThemeButton.addEventListener("click", () => {
    if(toggleTheme === 0) {
        document.documentElement.style.setProperty("--background-color-and-button-text", "#fff");
        document.documentElement.style.setProperty("--background-button", "#222");
        document.documentElement.style.setProperty("--invert", "0%");
        toggleTheme++;
    } else {
        document.documentElement.style.setProperty("--background-color-and-button-text", "#222");
        document.documentElement.style.setProperty("--background-button", "#fff");
        document.documentElement.style.setProperty("--invert", "100%");
        toggleTheme--;
    }
})
