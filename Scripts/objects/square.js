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
        function Square() {
            _super.call(this, "squareTetromino");
        }
        //properties
        //public methods
        Square.prototype.update = function () {
            console.log(this.speed);
            this.y += this.speed;
        };
        return Square;
    }(objects.Tetromino));
    objects.Square = Square;
})(objects || (objects = {}));
//# sourceMappingURL=square.js.map