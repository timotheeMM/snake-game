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
