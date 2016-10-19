var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file tetromino.ts
 * @author Kevin Ma
 * @date Oct 18 2016
 * @description Tetromino class represents any tetromino block in the game
 * @version 0.1.0
 */
var objects;
(function (objects) {
    var Tetromino = (function (_super) {
        __extends(Tetromino, _super);
        //instance variables
        //constructor
        function Tetromino(imageString, life, directionFacing) {
            _super.call(this, tetrominoAtlas, imageString, "");
        }
        return Tetromino;
    }(objects.GameObject));
    objects.Tetromino = Tetromino;
})(objects || (objects = {}));
//# sourceMappingURL=tetromino.js.map