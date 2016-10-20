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
            this.dead = false;
        }
        Object.defineProperty(Tetromino.prototype, "dropSpeed", {
            //properties
            get: function () {
                return this._dropSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tetromino.prototype, "arrowControlSpeed", {
            get: function () {
                return this._arrowControlSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tetromino.prototype, "dead", {
            get: function () {
                return this._dead;
            },
            set: function (d) {
                this._dead = d;
            },
            enumerable: true,
            configurable: true
        });
        //public methods
        Tetromino.prototype.start = function () {
            //center registration point
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            //all tetrominoes have default speed
            this._dropSpeed = 60;
            this._arrowControlSpeed = 15;
        };
        Tetromino.prototype.update = function () { };
        Tetromino.prototype.move = function (keyPressed) {
            switch (keyPressed) {
                case config.Controls.ARROW_KEY_LEFT:
                    this.moveLeft();
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    this.moveLeft();
                    break;
                case config.Controls.ARROW_KEY_DOWN:
                    this.hardDrop();
                    break;
                case config.Controls.SPACE_KEY:
                    this.moveDown();
                    break;
            }
            this.checkCollision(keyPressed);
        };
        Tetromino.prototype.moveDown = function () {
            this.y = this.y + config.Game.BLOCKSIZE;
            this.checkCollision(config.Controls.ARROW_KEY_DOWN);
        };
        Tetromino.prototype.moveRight = function () {
            this.x += config.Game.BLOCKSIZE;
            this.checkCollision(config.Controls.ARROW_KEY_RIGHT);
        };
        Tetromino.prototype.moveLeft = function () {
            // console.log('moving left');
            this.x -= config.Game.BLOCKSIZE;
            this.checkCollision(config.Controls.ARROW_KEY_LEFT);
        };
        Tetromino.prototype.hardDrop = function () {
            this.y = this.y + 600;
            this.checkCollision(config.Controls.ARROW_KEY_DOWN);
        };
        Tetromino.prototype.rotate = function () {
            this.rotation = 90;
        };
        return Tetromino;
    }(objects.GameObject));
    objects.Tetromino = Tetromino;
})(objects || (objects = {}));
//# sourceMappingURL=tetromino.js.map