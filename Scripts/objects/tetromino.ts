/**
 * @file tetromino.ts
 * @author Kevin Ma 
 * @date Oct 18 2016
 * @description Tetromino class represents any tetromino block in the game 
 * @version 0.1.0
 */
module objects {
    export abstract class Tetromino extends objects.GameObject {
        //instance variables

        //constructor
        constructor(imageString: string, life: number, directionFacing: number) {
            super(tetrominoAtlas, imageString, "")
        }
        //properties

        //public methods

        //private methods
    }
}