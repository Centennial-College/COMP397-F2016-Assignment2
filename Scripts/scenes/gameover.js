/**
 * @file gameover.ts
 * @author Kevin Ma
 * @date: Oct 21 2016
 * @description: This file is the gameover scene for the game.
 * @version 0.14.0 - implemented gameover scene
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
var scenes;
(function (scenes) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function GameOver() {
            _super.call(this);
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method runs when the scene is started
         *
         * @public
         * @method start
         *
         * @memberOf Gameover
         * @return {void}
         */
        GameOver.prototype.start = function () {
            this._background = new createjs.Bitmap(assets.getResult("BG"));
            this.addChild(this._background);
            this._menuBtn = new objects.Button("menuBtn", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 245);
            this._menuBtn.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._menuBtn);
            this._menuBtn.on("click", this._onMenuButtonClick, this);
            // 5x5 Box Blur filter on bg image
            var blurFilter = new createjs.BlurFilter(25, 25);
            this._background.filters = [blurFilter];
            var bitmapBounds = this._background.getBounds();
            this._background.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this._playAgainBtn = new objects.Button("playAgainBtn", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 245);
            this._playAgainBtn.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._playAgainBtn);
            this._playAgainBtn.on("click", this._onPlayAgainButtonClick, this);
            this._gameoverLabel = new objects.Label("good game", "100px custfont", "#0fc2d7", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this._gameoverLabel.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._gameoverLabel);
            this._scoreLabel = new objects.Label("High score: " + score, "40px custfont", "#0fc2d7", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100);
            this._scoreLabel.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._scoreLabel);
            stage.addChild(this);
        };
        /**
         * This method runs when the scene needs to be updated
         *
         * @public
         * @method update
         *
         * @memberOf Gameover
         * @return {void}
         */
        GameOver.prototype.update = function () {
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This is the event handler for the menu button click event.
         *
         * @private
         * @param {createjs.MouseEvent} event
         *
         * @memberOf GameOver
         * @return {void}
         */
        GameOver.prototype._onMenuButtonClick = function (event) {
            scene = config.Scene.MENU;
            changeScene();
        };
        GameOver.prototype._onPlayAgainButtonClick = function (event) {
            scene = config.Scene.GAME;
            changeScene();
        };
        return GameOver;
    }(objects.Scene));
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */ 
//# sourceMappingURL=gameover.js.map