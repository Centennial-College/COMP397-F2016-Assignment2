/**
 * @file config.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @studentID 300867968
 * @date: October 18, 2016
 * @description: This file is used to store globally accessible values and states for the game.
 * @version 0.4.0 - implemented moving down, left and right for tetrominoes
 */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
var config;
(function (config) {
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.GAME = 1;
        Scene.GAMEOVER = 2;
        return Scene;
    }());
    config.Scene = Scene;
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = 1024;
        Screen.HEIGHT = 600;
        Screen.CENTER_X = Screen.WIDTH / 2;
        Screen.CENTER_Y = Screen.HEIGHT / 2;
        return Screen;
    }());
    config.Screen = Screen;
    var Game = (function () {
        function Game() {
        }
        Game.FPS = 60;
        Game.BLOCKSIZE = 20;
        return Game;
    }());
    config.Game = Game;
    var Controls = (function () {
        function Controls() {
        }
        Controls.ARROW_KEY_LEFT = 37;
        Controls.ARROW_KEY_RIGHT = 39;
        Controls.ARROW_KEY_UP = 38;
        Controls.ARROW_KEY_DOWN = 40;
        Controls.SPACE_KEY = 32;
        return Controls;
    }());
    config.Controls = Controls;
})(config || (config = {}));
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */ 
//# sourceMappingURL=config.js.map