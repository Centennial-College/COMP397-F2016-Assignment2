/**
 * @file player.ts
 * @author Kevin Ma
 * @date: Oct 20 2016
 * @description: Player class is used to manage the particle launcher in the game Blastimoes (behavior and attributes)
 * @version 0.9.0 - implemented move functionality for player
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
        //public methods
        Player.prototype.start = function () {
            this.graphics.beginFill('#142b5c')
                .beginStroke('#000')
                .drawRect(0, 0, 20, 20);
            //set intiial position to be in the middle bottom of Screen
            this.x = config.Screen.CENTER_X - 10;
            this.y = 453;
        };
        Player.prototype.update = function () {
            this._renderNewPosition();
        };
        Player.prototype.move = function (evt) {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = true;
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = true;
                    break;
            }
        };
        Player.prototype.stop = function (evt) {
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
        return Player;
    }(createjs.Shape));
    objects.Player = Player;
})(objects || (objects = {}));
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */ 
//# sourceMappingURL=player.js.map