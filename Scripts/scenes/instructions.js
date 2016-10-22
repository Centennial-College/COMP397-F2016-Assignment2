/**
 * @file instructions.ts
 * @author Kevin Ma
 * @date: Oct 21 2016
 * @description: This file is the instructions scene for the game.
 * @version 1.0.0 - Initial Release; implemented diff bullet types
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
var scenes;
(function (scenes) {
    var Instructions = (function (_super) {
        __extends(Instructions, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Instructions() {
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
        Instructions.prototype.start = function () {
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
            this._instructions = document.getElementById('instructions');
            this._instructions.style.display = 'block';
            this._instructions.style.boxShadow = '10px 10px 10px #333';
            var instructionsDOM = new createjs.DOMElement(this._instructions);
            instructionsDOM.alpha = 0;
            this.addChild(instructionsDOM);
            createjs.Tween.get(instructionsDOM).wait(1000).to({
                x: 215,
                y: 195,
                alpha: 1
            }, 2000, createjs.Ease.quadOut);
            this._startGameBtn = new objects.Button("startBtn", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 245);
            this._startGameBtn.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._startGameBtn);
            this._startGameBtn.on("click", this._onStartGameButtonClick, this);
            this._titleLabel = new objects.Label("Instructions", "100px custfont", "#0fc2d7", config.Screen.CENTER_X, 75);
            this._titleLabel.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._titleLabel);
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
        Instructions.prototype.update = function () {
        };
        Instructions.prototype.removeInstructions = function () {
            this._instructions.style.display = 'none';
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
        Instructions.prototype._onMenuButtonClick = function (event) {
            scene = config.Scene.MENU;
            this.removeInstructions();
            changeScene();
        };
        Instructions.prototype._onStartGameButtonClick = function (event) {
            scene = config.Scene.GAME;
            this.removeInstructions();
            changeScene();
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */ 
//# sourceMappingURL=instructions.js.map