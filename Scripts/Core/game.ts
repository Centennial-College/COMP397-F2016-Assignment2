/**
 * @file game.ts
 * @author Kevin Ma 
 * @date: Oct 21 2016
 * @description: This file is the entry point for the game.
 * @version 0.15.0 - implemented instructons scene
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/// <reference path = "_reference.ts" />

// GLOBAL VARIABES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let assets: createjs.LoadQueue;
let canvas: HTMLElement;
let stage: createjs.Stage;

let currentScene: objects.Scene;
let scene: number;
let score: number

//Control booleans
let leftKeyDown: boolean
let rightKeyDown: boolean
let spaceKeyDown: boolean

let blastimoesAtlas: createjs.SpriteSheet

// Preload Assets required
let assetData: objects.Asset[] = [
    { id: "startBtn", src: "../../Assets/images/startBtn.png" },
    { id: "instructionBtn", src: "../../Assets/images/instructionBtn.png" },
    { id: "menuBtn", src: "../../Assets/images/menuBtn.png" },
    { id: "playAgainBtn", src: "../../Assets/images/playAgainBtn.png" },
    { id: "restartBtn", src: "../../Assets/images/restartBtn.png" },
    { id: "BG", src: "../../Assets/images/bg.png" },
    { id: "blastimoesSheet", src: "../../Assets/images/blastimoesAtlas.png" }
];

/**
 * This method is used to preload all the assets required for the game 
 * before it starts running.
 * 
 * @method preload
 * @return {void}
 */
function preload(): void {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    // assets.installPlugin(createjs.Sound);

    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

/**
 * This method is the entry point for the application.
 * 
 * @method init
 * @return {void}
 */
function init(): void {
    // Reference to canvas element
    canvas = document.getElementById("canvas");

    // Tie canvas element to createjs stage container
    stage = new createjs.Stage(canvas);

    // Enable mouse events; the frequency parameter indicates how many times per second EaselJS should calculate what is currently under the pointer. A higher number is more responsive, but also more computationally expensive. It defaults to 20 times per second. 
    stage.enableMouseOver(20);

    // Set FPS for game and register for "tick" callback function
    createjs.Ticker.framerate = config.Game.FPS;
    createjs.Ticker.on("tick", this.gameLoop, this);

    blastimoesAtlas = new createjs.SpriteSheet(
        {

            "images": [
                assets.getResult('blastimoesSheet')
            ],

            "frames": [
                [1, 1, 46, 47, 0, 0, 0],
                [1, 50, 40, 40, 0, 0, 0],
                [43, 50, 40, 40, 0, 0, 0],
                [49, 1, 46, 47, 0, 0, 0],
                [85, 50, 40, 40, 0, 0, 0],
                [97, 1, 46, 46, 0, 0, 0],
                [127, 49, 43, 42, 0, 0, 0],
                [145, 1, 45, 46, 0, 0, 0],
                [172, 49, 39, 38, 0, 0, 0],
                [192, 1, 46, 45, 0, 0, 0],
                [213, 48, 43, 43, 0, 0, 0],
                [240, 1, 45, 45, 0, 0, 0],
                [258, 48, 43, 43, 0, 0, 0],
                [287, 1, 44, 45, 0, 0, 0],
                [303, 48, 43, 43, 0, 0, 0],
                [333, 1, 44, 45, 0, 0, 0],
                [348, 48, 42, 43, 0, 0, 0],
                [379, 1, 43, 44, 0, 0, 0],
                [392, 47, 38, 38, 0, 0, 0],
                [424, 1, 32, 34, 0, 0, 0],
                [458, 1, 29, 34, 0, 0, 0],
                [432, 37, 34, 31, 0, 0, 0],
                [468, 37, 19, 19, 0, 0, 0],
                [432, 70, 10, 20, 0, 0, 0],
                [444, 70, 9, 18, 0, 0, 0],
                [455, 70, 9, 15, 0, 0, 0],
                [466, 70, 8, 13, 0, 0, 0]
            ],

            "animations": {
                "explosion": { "frames": [20, 19, 8, 1, 2, 16, 6, 14, 17, 7, 0, 3, 5, 13, 11, 9, 15, 10, 12, 18, 21, 22], "speed": 0.3, next: false },
                "squareTetromino": { "frames": [4] },
                "bullet1": { "frames": [26, 25, 24, 23], next: false, speed: 0.1 },
                "bullet1Continuous": { "frames": [26, 25, 24, 23], speed: 0.1 },
            }
        }
    )

    // Set initial scene to MENU scene and call changeScene().
    scene = config.Scene.MENU;
    changeScene();
}

/**
 * Main game loop function which handles what happens with each "tick" or frame
 * 
 * @method gameLoop
 * @param {createjs.TickerEvent} event
 * @return {void}
 */
function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}

/**
 * This function is used as a View Switcher to switch between different scenes
 * within the application.
 * 
 * @method changeScene
 * @return {void}
 */
function changeScene(): void {

    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();
            console.log("Starting MENU scene");
            break;
        case config.Scene.GAME:
            stage.removeAllChildren();
            currentScene = new scenes.Game();
            console.log("Starting GAME scene");
            break;
        case config.Scene.GAMEOVER:
            stage.removeAllChildren();
            currentScene = new scenes.GameOver();
            console.log("Starting GAMEOVER scene");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren()
            currentScene = new scenes.Instructions()
            console.log("Starting INSTRUCTIONS scene");
            break
    }

}

window.onload = preload;

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */