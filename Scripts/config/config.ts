/**
 * @file config.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @studentID 300867968
 * @date: October 21, 2016
 * @description: This file is used to store globally accessible values and states for the game.
 * @version 1.0.0 - Initial Release; implemented diff bullet types 
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module config {
    export class Scene {
        public static MENU: number = 0;
        public static GAME: number = 1;
        public static GAMEOVER: number = 2;
        public static INSTRUCTIONS: number = 3;
    }

    export class Screen {
        public static WIDTH: number = 1024;
        public static HEIGHT: number = 600;
        public static CENTER_X: number = Screen.WIDTH / 2;
        public static CENTER_Y: number = Screen.HEIGHT / 2;
    }

    export class Game {
        public static FPS: number = 60;
    }
    export class Controls {
        public static ARROW_KEY_LEFT: number = 37
        public static ARROW_KEY_RIGHT: number = 39
        public static SPACE_KEY: number = 32
        public static Q: number = 81
        public static W: number = 87
        public static T: number = 84
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */