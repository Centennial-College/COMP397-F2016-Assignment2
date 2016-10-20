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

            //start square in middle (columns 5 and 6)
            this.x = 513
            this.y = 75
        }
        //properties

        //public methods
        public update(): void {
            this.moveDown()
        }

        public checkCollision(keyPressed: number): void {

            switch (keyPressed) {
                case config.Controls.ARROW_KEY_LEFT:
                    // check left bounds 413
                    if (this.x - config.Game.BLOCKSIZE < 413 + this.halfWidth) {
                        this.x = 413 + this.halfWidth
                        // this.dead = true
                    }
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    // check right bounds 613
                    if (this.x + config.Game.BLOCKSIZE > 613 - this.halfWidth) {
                        this.x = 613 - this.halfWidth
                        // this.dead = true
                    }
                    break;
                case config.Controls.ARROW_KEY_DOWN:
                case config.Controls.SPACE_KEY:
                    if (this.y + config.Game.BLOCKSIZE > 455) {
                        this.dead = true
                        this.y = 455
                    }
                    break;
            }
            // upper bounds = 75
        }

        //private methods

    }
}