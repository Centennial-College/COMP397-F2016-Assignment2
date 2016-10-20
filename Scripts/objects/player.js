/**
 * @file player.ts
 * @author Kevin Ma
 * @date: Oct 20 2016
 * @description: Player class is used to manage the particle launcher in the game Blastimoes (behavior and attributes)
 * @version 0.8.0 - created player class
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
            //set registration point to middle of Shape
            this.regX = this.getBounds().width / 2;
            this.regY = this.getBounds().height / 2;
            this.graphics.beginFill('#00f')
                .drawRect(0, 0, 20, 20);
            //set intiial position to be in the middle bottom of Screen
            this.x = config.Screen.CENTER_X;
            this.y = 465;
        }
        return Player;
    }(createjs.Shape));
    objects.Player = Player;
})(objects || (objects = {}));
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */ 
//# sourceMappingURL=player.js.map