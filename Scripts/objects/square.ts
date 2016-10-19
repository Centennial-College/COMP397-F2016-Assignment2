/**
 * @file square.ts
 * @author Kevin Ma 
 * @date Oct 18 2016
 * @description Square class represents square tetrominoes in the game of Tetris. This class extends Tetromino class
 * @version 0.3.0 - added tetromino abstract class and square tetromino class
 */
module objects {
    export class Square extends Tetromino {
        //instance variables

        //constructor
        constructor() {
            super("squareTetromino")
        }
        //properties

        //public methods
        public update(): void {
            console.log(this.speed);

            this.y += this.speed
        }
        //private methods
    }
}