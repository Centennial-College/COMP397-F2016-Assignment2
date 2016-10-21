/**
 * @file bullet.ts
 * @author Kevin Ma
 * @date: Oct 20 2016
 * @description: Bullet class is used to manage the attributes and behavior of bullets fired from the particle launcher (Player)
 * @version 0.10.0 - added bullet class to the build
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
        function Bullet() {
            _super.call(this);
            this.start();
        }
        //public methods
        Bullet.prototype.start = function () {
        };
        Bullet.prototype.update = function () {
        };
        Bullet.prototype.move = function (evt) {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = true;
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = true;
                    break;
            }
        };
        Bullet.prototype.stop = function (evt) {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = false;
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = false;
                    break;
            }
        };
        //private methods
        Bullet.prototype._renderNewPosition = function () {
            if (leftKeyDown) {
                //check prevents player from moving outside of left wall
                this.x = (this.x - 10 < 413) ? 413 : this.x - 10;
            }
            else if (rightKeyDown) {
                //ensures that won't go beyond right wall when moving right
                this.x = (this.x + 10 > 591) ? 591 : this.x + 10;
            }
        };
        return Bullet;
    }(createjs.Shape));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */ 
//# sourceMappingURL=bullet.js.map