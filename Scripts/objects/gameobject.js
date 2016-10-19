var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file gameobject.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @studentID 300867968
 * @date Oct 18 2016
 * @description GameObject class represents any game object in the game.
 * @version 0.3.0
 */
var objects;
(function (objects) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject(atlas, imageString, deathAnimString) {
            _super.call(this, atlas, imageString);
            this._initialize(imageString);
            this.start();
        }
        Object.defineProperty(GameObject.prototype, "halfWidth", {
            // PUBLIC PROPERTIES
            get: function () {
                return this.width / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "halfHeight", {
            get: function () {
                return this.height / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (w) {
                this._width = w;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (h) {
                this._height = h;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (s) {
                this._name = s;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (p) {
                this._position = p;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype._initialize = function (imageString) {
            this.name = imageString;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.position = new objects.Vector2(this.x, this.y);
        };
        GameObject.prototype.start = function () { };
        GameObject.prototype.update = function () { };
        return GameObject;
    }(createjs.Sprite));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map