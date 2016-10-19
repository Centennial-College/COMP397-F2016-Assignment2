/**
 * @file square.ts
 * @author Kevin Ma 
 * @date Oct 18 2016
 * @description Square class represents square tetrominoes in the game of Tetris. This class extends Tetromino class
 * @version 0.3.0
 */
module objects {
    export  class Square extends Tetromino {
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