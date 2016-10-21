var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file tetromino.ts
 * @author Kevin Ma
 * @date Oct 20 2016
 * @description Tetromino class represents any tetromino block in the game. All 7 types of tetrominoes will extend this class
 * @version 0.12.0 - successfully checked collision between bullet and squareTetromino
 */
var objects;
(function (objects) {
    var Tetromino = (function (_super) {
        __extends(Tetromino, _super);
        //constructor
        function Tetromino(imageString, multiplier) {
            _super.call(this, blastimoesAtlas, imageString, "explosion");
            this._levelMultiplier = multiplier;
        }
        Object.defineProperty(Tetromino.prototype, "levelMultiplier", {
            //properties
            get: function () {
                return this._levelMultiplier;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tetromino.prototype, "ySpeed", {
            get: function () {
                return this._ySpeed;
            },
            set: function (y) {
                this._ySpeed = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tetromino.prototype, "xSpeed", {
            get: function () {
                return this._xSpeed;
            },
            set: function (x) {
                this._xSpeed = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tetromino.prototype, "xDir", {
            get: function () {
                return this._xDir;
            },
            set: function (x) {
                this._xDir = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tetromino.prototype, "isDead", {
            get: function () {
                return this._isDead;
            },
            set: function (d) {
                this._isDead = d;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tetromino.prototype, "isReadyToSpawn", {
            get: function () {
                return this._isReadyToSpawn;
            },
            set: function (r) {
                this._isReadyToSpawn = r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tetromino.prototype, "isFinished", {
            get: function () {
                return this._isFinished;
            },
            set: function (f) {
                this._isFinished = f;
            },
            enumerable: true,
            configurable: true
        });
        //public methods
        Tetromino.prototype.start = function () {
            this._intiailize();
        };
        //These methods randomize the x speed and y speed that block is moving
        Tetromino.prototype.randomizeXSpeed = function () {
            this.xSpeed = (Math.random() * 5) + 1;
        };
        Tetromino.prototype.randomizeYSpeed = function () {
            this.ySpeed = (Math.random() * 1) + 0.1;
        };
        //private methods
        /**
         * Iniitalizes the values of the tetromino
         *
         * @private
         *
         * @memberOf Tetromino
         */
        Tetromino.prototype._intiailize = function () {
            //center registration point
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.isDead = false;
            this.isReadyToSpawn = true;
            this.isFinished = false;
            //randomized speed everytime the tetromino is spawned
            this.randomizeXSpeed();
            this.randomizeYSpeed();
            this.xDir = 1;
        };
        return Tetromino;
    }(objects.GameObject));
    objects.Tetromino = Tetromino;
})(objects || (objects = {}));
//# sourceMappingURL=tetromino.js.map