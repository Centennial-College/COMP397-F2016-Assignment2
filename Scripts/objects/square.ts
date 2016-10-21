/**
 * @file square.ts
 * @author Kevin Ma 
 * @date Oct 18 2016
 * @description Square class represents square tetrominoes in the game of Tetris. This class extends Tetromino class
 * @version 0.12.0 - successfully checked collision between bullet and squareTetromino
 */
module objects {
    export class Square extends Tetromino {
        //instance variables

        //constructor
        constructor(levelMultipler: number, private _deadAnimPlayedDuration: number = 0) {
            super("squareTetromino", levelMultipler)

            //start square in middle (columns 5 and 6 of grid)
            this.x = 513
            this.y = 75

            this._deadAnimPlayedDuration = 0
        }
        //properties

        //public methods
        public update(): void {
            if (this.isDead) {
                if (this._deadAnimPlayedDuration == 0) {
                    this.gotoAndPlay(this.deathAnimString)
                    this.isReadyToSpawn = false
                }

                this._deadAnimPlayedDuration++

                if (this._deadAnimPlayedDuration >= 100) {
                    this._dead()
                    this._deadAnimPlayedDuration = 0
                }
            }
            else {
                this.move()
                this.checkCollision()
            }
        }

        public move(): void {
            this.y += this.ySpeed * this.levelMultiplier
            this.x += this.xSpeed * this.xDir * this.levelMultiplier
            this.position = new objects.Vector2(this.x, this.y)
        }

        // public rotate(): void {
        //     this.rotation = 90
        // }

        /**
         * Checks if square collided with wall. If collided, reverse direction and change 
         * speed to appear to bounce off wall.
         * 
         * @param {number} keyPressed
         * 
         * @memberOf Square
         */
        public checkCollision(): void {
            //left wall
            if (this.xDir == -1) {
                if (this.x - (this.xSpeed * this.xDir * this.levelMultiplier) < 413 + this.halfWidth) {
                    this.xDir = 1
                    this.randomizeXSpeed()
                    // this.x = 413 + this.halfWidth
                    // this.dead = true
                }
            }
            //right wall
            else {
                if (this.x + (this.xSpeed * this.xDir * this.levelMultiplier) > 613 - this.halfWidth) {
                    this.xDir = -1
                    this.randomizeXSpeed()
                }
            }
            //bottom wall
            if (this.y + (this.ySpeed * this.levelMultiplier) > 455) {
                this.isFinished = true
                // this.isDead = true
                currentScene.removeChild(this)
            }
        }

        //private methods
        private _dead(): void {
            currentScene.removeChild(this)
            this.isReadyToSpawn = true
        }
    }
}