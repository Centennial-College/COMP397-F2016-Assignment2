var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file square.ts
 * @author Kevin Ma
 * @date Oct 21 2016
 * @description Square class represents square tetrominoes in the game of Tetris. This class extends Tetromino class
 * @version 0.14.0 - implemented gameover scene
 */
var objects;
(function (objects) {
    var Square = (function (_super) {
        __extends(Square, _super);
        //instance variables
        //constructor
        function Square(levelMultipler, _deadAnimPlayedDuration) {
            if (_deadAnimPlayedDuration === void 0) { _deadAnimPlayedDuration = 0; }
            _super.call(this, "squareTetromino", levelMultipler);
            this._deadAnimPlayedDuration = _deadAnimPlayedDuration;
            //start square in middle (columns 5 and 6 of grid)
            this.x = 513;
            this.y = 90;
            this._deadAnimPlayedDuration = 0;
        }
        //properties
        //public methods
        Square.prototype.update = function () {
            //if square is dead, play death animation
            if (this.isDead) {
                //death animation didnt start playing yet
                if (this._deadAnimPlayedDuration == 0) {
                    this.gotoAndPlay(this.deathAnimString);
                    this.isReadyToSpawn = false;
                }
                //pseudo timer to time how long animation played for so far
                this._deadAnimPlayedDuration++;
                //animation has finished playing, can proceed with normal functionalities
                if (this._deadAnimPlayedDuration >= 100) {
                    this._dead();
                    this._deadAnimPlayedDuration = 0;
                }
            }
            else {
                this.move();
                this.checkCollision();
            }
        };
        Square.prototype.move = function () {
            this.y += this.ySpeed * this.levelMultiplier;
            this.x += this.xSpeed * this.xDir * this.levelMultiplier;
            this.position = new objects.Vector2(this.x, this.y);
        };
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
        Square.prototype.checkCollision = function () {
            //left wall
            if (this.xDir == -1) {
                if (this.x - (this.xSpeed * this.xDir * this.levelMultiplier) < 413 + this.halfWidth) {
                    this.xDir = 1;
                    this.randomizeXSpeed();
                    this.randomizeYSpeed();
                }
            }
            else if (this.xDir == 1) {
                if (this.x + (this.xSpeed * this.xDir * this.levelMultiplier) > 613 - this.halfWidth) {
                    this.xDir = -1;
                    this.randomizeXSpeed();
                    this.randomizeYSpeed();
                }
            }
            //bottom wall
            if (this.y + (this.ySpeed * this.levelMultiplier) > 455) {
                this.isFinished = true;
                // this.isDead = true
                currentScene.removeChild(this);
            }
        };
        //private methods
        Square.prototype._dead = function () {
            currentScene.removeChild(this);
            this.isReadyToSpawn = true;
        };
        return Square;
    }(objects.Tetromino));
    objects.Square = Square;
})(objects || (objects = {}));
//# sourceMappingURL=square.js.map