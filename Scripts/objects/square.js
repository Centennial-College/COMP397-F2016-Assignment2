var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file square.ts
 * @author Kevin Ma
 * @date Oct 18 2016
 * @description Square class represents square tetrominoes in the game of Tetris. This class extends Tetromino class
 * @version 0.3.0 - added tetromino abstract class and square tetromino class
 */
var objects;
(function (objects) {
    var Square = (function (_super) {
        __extends(Square, _super);
        //instance variables
        //constructor
        function Square(levelMultipler) {
            _super.call(this, "squareTetromino", levelMultipler);
            //start square in middle (columns 5 and 6 of grid)
            this.x = 513;
            this.y = 75;
        }
        //properties
        //public methods
        Square.prototype.update = function () {
            this.move();
            this.checkCollision();
        };
        Square.prototype.move = function () {
            this.y += this.ySpeed * this.levelMultiplier;
            this.x += this.xSpeed * this.xDir * this.levelMultiplier;
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
                }
            }
            else {
                if (this.x + (this.xSpeed * this.xDir * this.levelMultiplier) > 613 - this.halfWidth) {
                    this.xDir = -1;
                    this.randomizeXSpeed();
                }
            }
            //bottom wall
            if (this.y + (this.ySpeed * this.levelMultiplier) > 455) {
                this.dead = true;
            }
            //             this.dead = true
            // switch (keyPressed) {
            //     case config.Controls.ARROW_KEY_LEFT:
            //         // check left bounds 413
            //         if (this.x - config.Game.BLOCKSIZE < 413 + this.halfWidth) {
            //             this.x = 413 + this.halfWidth
            //             // this.dead = true
            //         }
            //         break;
            //     case config.Controls.ARROW_KEY_RIGHT:
            //         // check right bounds 613
            //         if (this.x + config.Game.BLOCKSIZE > 613 - this.halfWidth) {
            //             this.x = 613 - this.halfWidth
            //             // this.dead = true
            //         }
            //         break;
            //     case config.Controls.ARROW_KEY_DOWN:
            //     case config.Controls.SPACE_KEY:
            //         if (this.y + config.Game.BLOCKSIZE > 455) {
            //             this.dead = true
            //             this.y = 455
            //         }
            //         break;
            // }
            // upper bounds = 75
        };
        return Square;
    }(objects.Tetromino));
    objects.Square = Square;
})(objects || (objects = {}));
//# sourceMappingURL=square.js.map