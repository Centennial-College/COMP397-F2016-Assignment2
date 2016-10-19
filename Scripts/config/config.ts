/**
 * @file config.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @studentID 300867968
 * @date: October 18, 2016
 * @description: This file is used to store globally accessible values and states for the game.
 * @version 0.4.0 - implemented moving down, left and right for tetrominoes
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module config {
    export class Scene {
        public static MENU: number = 0;
        public static GAME: number = 1;
        public static GAMEOVER: number = 2;
    }

    export class Screen {
        public static WIDTH: number = 1024;
        public static HEIGHT: number = 600;
        public static CENTER_X: number = Screen.WIDTH / 2;
        public static CENTER_Y: number = Screen.HEIGHT / 2;
    }

    export class Game {
        public static FPS: number = 60;
        public static BLOCKSIZE: number = 20
    }
    export class Controls {
        public static ARROW_KEY_LEFT: number = 37
        public static ARROW_KEY_RIGHT: number = 39
        public static ARROW_KEY_UP: number = 38
        public static ARROW_KEY_DOWN: number = 40
        public static SPACE_KEY: number = 32
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */