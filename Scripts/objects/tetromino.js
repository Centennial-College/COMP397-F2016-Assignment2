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
 * @version 0.3.0
 */
var objects;
(function (objects) {
    var Tetromino = (function (_super) {
        __extends(Tetromino, _super);
        //constructor
        function Tetromino(imageString) {
            _super.call(this, tetrominoAtlas, imageString, "");
        }
        Object.defineProperty(Tetromino.prototype, "speed", {
            //properties
            get: function () {
                return this._speed;
            },
            enumerable: true,
            configurable: true
        });
        //public methods
        Tetromino.prototype.start = function () {
            //center registration point
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            //start square in middle (columns 5 and 6)
            this.x = 513;
            this.y = 75;
            //all tetrominoes have default speed
            this._speed = 1;
        };
        Tetromino.prototype.update = function () { };
        return Tetromino;
    }(objects.GameObject));
    objects.Tetromino = Tetromino;
})(objects || (objects = {}));
//# sourceMappingURL=tetromino.js.map