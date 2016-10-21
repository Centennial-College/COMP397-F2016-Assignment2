/**
 * @file bullet.ts
 * @author Kevin Ma
 * @date: Oct 20 2016
 * @description: Bullet class is used to manage the attributes and behavior of bullets fired from the particle launcher (Player)
 * @version 0.12.0 - successfully checked collision between bullet and squareTetromino
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
var objects;
(function (objects) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Bullet(imageString, startX, startY, _currentLevel) {
            _super.call(this, blastimoesAtlas, imageString, "");
            this._currentLevel = _currentLevel;
            this.x = startX;
            this.y = startY;
        }
        //public methods
        Bullet.prototype.start = function () {
        };
        Bullet.prototype.update = function () {
            this.y -= 5 * this._currentLevel;
            this.position = new objects.Vector2(this.x, this.y);
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */ 
//# sourceMappingURL=bullet.js.map