/**
 * @file player.ts
 * @author Kevin Ma
 * @date: Oct 20 2016
 * @description: Player class is used to manage the particle launcher in the game Blastimoes (behavior and attributes)
 * @version 0.11.0 - implemented firing one bullet for player
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Player() {
            _super.call(this);
            this.start();
        }
        Object.defineProperty(Player.prototype, "ammo", {
            //properties
            get: function () {
                return this._ammunition;
            },
            enumerable: true,
            configurable: true
        });
        //public methods
        Player.prototype.start = function () {
            this._init();
        };
        Player.prototype.update = function () {
            this._renderNewPosition();
        };
        Player.prototype.onKeyDown = function (evt) {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = true;
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = true;
                    break;
                case config.Controls.SPACE_KEY:
                    spaceKeyDown = true;
                    break;
            }
        };
        Player.prototype.onKeyUp = function (evt) {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = false;
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = false;
                    break;
                case config.Controls.SPACE_KEY:
                    spaceKeyDown = false;
                    break;
            }
        };
        Player.prototype.shootBullet = function (newBullet) {
            this._ammunition.push(newBullet);
        };
        //private methods
        Player.prototype._renderNewPosition = function () {
            if (leftKeyDown) {
                //check prevents player from moving outside of left wall
                this.x = (this.x - 10 < 413) ? 413 : this.x - 10;
            }
            else if (rightKeyDown) {
                //ensures that won't go beyond right wall when moving right
                this.x = (this.x + 10 > 591) ? 591 : this.x + 10;
            }
        };
        Player.prototype._init = function () {
            this._ammunition = [];
            //draws the particle launcher using native createjs.Shape methods
            this.graphics.beginFill('#142b5c')
                .beginStroke('#000')
                .drawRect(0, 0, 20, 20);
            //set intiial position to be in the middle bottom of Screen
            this.x = config.Screen.CENTER_X - 10;
            this.y = 453;
        };
        return Player;
    }(createjs.Shape));
    objects.Player = Player;
})(objects || (objects = {}));
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */ 
//# sourceMappingURL=player.js.map