/**
 * @file menu.ts
 * @author Kevin Ma
 * @date: Oct 21, 2016
 * @description: This file contains all assets and functionality associated with the menu itself.
 * @version 1.0.2 - added development year to menu scene
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
          * This method runs when the scene is started
          *
          * @public
          * @method start
          *
          * @memberOf Menu
          * @return {void}
          */
        Menu.prototype.start = function () {
            console.log("Menu Scene Started");
            this._background = new createjs.Bitmap(assets.getResult('BG'));
            this.addChild(this._background);
            // 5x5 Box Blur filter on bg image
            var blurFilter = new createjs.BlurFilter(25, 25);
            this._background.filters = [blurFilter];
            var bitmapBounds = this._background.getBounds();
            this._background.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this._titleLabel = new objects.Label("BLASTIMOES", "100px custfont", "#0fc2d7", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this._titleLabel.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._titleLabel);
            this._authorLabel = new objects.Label("Developed by: Kevin Ma {2016}", "20px custfont", "#0fc2d7", config.Screen.CENTER_X, config.Screen.CENTER_Y + 45);
            this._authorLabel.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._authorLabel);
            // Add button to scene. Register for click callback function
            this._startBtn = new objects.Button("startBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 90);
            // this._startBtn = new objects.Button("startBtn", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 120);
            this._startBtn.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._startBtn);
            this._startBtn.on("click", this._startButtonClick, this);
            this._instructionBtn = new objects.Button("instructionBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 160);
            // this._instructionBtn = new objects.Button("instructionBtn", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 120);
            this._instructionBtn.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._instructionBtn);
            this._instructionBtn.on("click", this._instructionBtnClick, this);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        /**
         * This method runs when the Menu Scene updates
         *
         * @public
         * @method update
         *
         * @memberOf Menu
         * @return {void}
         */
        Menu.prototype.update = function () {
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method changes the current scene to the game scene when the start button is clicked
         *
         * @private
         * @method _startButtonClick
         * @param {createjs.MouseEvent} event
         *
         * @memberOf Menu
         * @return {void}
         */
        Menu.prototype._startButtonClick = function (event) {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.GAME;
            changeScene();
        };
        Menu.prototype._instructionBtnClick = function (event) {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */ 
//# sourceMappingURL=menu.js.map