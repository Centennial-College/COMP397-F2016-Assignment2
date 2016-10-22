/**
 * @file game.ts
 * @author Kevin Ma 
 * @date: Oct 21 2016
 * @description: This file is the entry point for the game.
 * @version 1.0.0 - Initial Release; implemented diff bullet types
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
let qDown: boolean
let wDown: boolean
let tDown: boolean

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
                [1, 50, 46, 47, 0, 0, 0],
                [1, 99, 10, 20, 0, 0, 0],
                [1, 121, 3, 3, 0, 0, 0],
                [13, 99, 19, 19, 0, 0, 0],
                [34, 99, 8, 19, 0, 0, 0],
                [44, 99, 9, 18, 0, 0, 0],
                [44, 119, 5, 5, 0, 0, 0],
                [49, 1, 46, 46, 0, 0, 0],
                [49, 49, 45, 46, 0, 0, 0],
                [55, 97, 9, 15, 0, 0, 0],
                [55, 114, 10, 10, 0, 0, 0],
                [66, 97, 14, 14, 0, 0, 0],
                [67, 113, 11, 11, 0, 0, 0],
                [80, 113, 9, 9, 0, 0, 0],
                [82, 97, 13, 13, 0, 0, 0],
                [91, 112, 12, 12, 0, 0, 0],
                [96, 49, 46, 45, 0, 0, 0],
                [97, 1, 45, 45, 0, 0, 0],
                [97, 96, 8, 13, 0, 0, 0],
                [105, 111, 8, 13, 0, 0, 0],
                [107, 96, 9, 9, 0, 0, 0],
                [115, 107, 8, 8, 0, 0, 0],
                [115, 117, 7, 7, 0, 0, 0],
                [118, 96, 8, 8, 0, 0, 0],
                [144, 1, 44, 45, 0, 0, 0],
                [144, 48, 44, 45, 0, 0, 0],
                [190, 1, 43, 44, 0, 0, 0],
                [190, 47, 43, 43, 0, 0, 0],
                [190, 92, 34, 31, 0, 0, 0],
                [226, 92, 8, 30, 0, 0, 0],
                [235, 1, 43, 43, 0, 0, 0],
                [235, 46, 43, 43, 0, 0, 0],
                [280, 1, 42, 43, 0, 0, 0],
                [280, 46, 43, 42, 0, 0, 0],
                [280, 90, 32, 34, 0, 0, 0],
                [314, 90, 29, 34, 0, 0, 0],
                [324, 1, 40, 40, 0, 0, 0],
                [366, 1, 40, 40, 0, 0, 0],
                [325, 43, 40, 40, 0, 0, 0],
                [367, 43, 39, 38, 0, 0, 0],
                [367, 83, 38, 38, 0, 0, 0]
            ],

            "animations": {
                "explosion": { "frames": [36, 35, 40, 37, 38, 33, 34, 32, 27, 9, 0, 1, 8, 25, 18, 17, 26, 28, 31, 41, 29, 4] },
                "bullet1": { "frames": [19, 10, 6, 2], speed: 0.1, next: false },
                "bullet1Continuous": { "frames": [19, 10, 6, 2], speed: 0.1 },
                "bullet1Frozen": { "frames": [2] },
                "bullet": { "frames": [3, 7, 23, 14, 22, 21, 11, 13, 16, 15, 12], speed: 0.1, next: false },
                "bulletContinuous": { "frames": [3, 7, 23, 14, 22, 21, 11, 13, 16, 15, 12], speed: 0.1 },
                "bulletFrozen": { "frames": [12] },
                "bullet2": { "frames": [24, 20, 5, 30], speed: 0.1, next: false },
                "bullet2Continuous": { "frames": [24, 20, 5, 30], speed: 0.1 },
                "bullet2Frozen": { "frames": [30] },
                "squareTetromino": { "frames": [39] }
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