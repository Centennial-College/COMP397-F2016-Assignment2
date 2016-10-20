/**
 * @file game.ts
 * @author Kevin Ma
 * @date: Oct 20, 2016
 * @description: Game scene that contains all assets and functionality associated with the game itself
 * @version 0.9.0 - implemented move functionality for player
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
var scenes;
(function (scenes) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // private _leftKeyDown: boolean
        // private _rightKeyDown: boolean
        // private _upKeyDown: boolean
        // private _downKeyDown: boolean
        // private _spaceKeyDown: boolean
        //PUBLIC INSTANCE VARIABLES
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Game() {
            _super.call(this);
        }
        // PUBLIC FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This function prepares the game scene for the user to play
         *
         * @public
         * @method start
         *
         * @memberOf Game
         * @return {void}
         */
        Game.prototype.start = function () {
            // Add objects to the scene
            console.log("Game scene started");
            this._initializeVariables();
            this._initializeUI();
            this._initializeGameObjects();
            // Add gamescene to main stage container. 
            stage.addChild(this);
            //handle keys
            window.onkeydown = this._player.move;
            window.onkeyup = this._player.stop;
        };
        /**
         * This function updates the objects contained in the game scene
         *
         * @public
         * @method update
         *
         * @memberOf Game
         * @return {void}
         */
        Game.prototype.update = function () {
            //tetromino has landed (killed or hit bottom)
            if (this._currentTetromino.dead) {
                this.removeChild(this._currentTetromino);
                this._goalToNextLevel--;
                this._goalLabel.text = "Goal\n" + this._goalToNextLevel;
                this._hpPercent -= 13;
                this._createTetromino();
            }
            //update hpbar when enemy reached bottom and not shot dead
            this._updateHpBar();
            //update player
            this._player.update();
            //update square object 
            this._currentTetromino.update();
        };
        // PRIVATE FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++
        Game.prototype._createHpBar = function () {
            this._hpBar = new createjs.Shape();
            this._hpBar.x = 413;
            this._hpBar.y = 480;
            this._hpBar.graphics.setStrokeStyle(2);
            this._hpBar.graphics.beginStroke('#000');
            this._hpBar.graphics.drawRect(0, 0, 200, 15);
            this.addChild(this._hpBar);
        };
        Game.prototype._updateHpBar = function () {
            this._hpBar.graphics.clear();
            this._hpBar.graphics.beginFill('#0fc2d7');
            this._hpBar.graphics.drawRect(0, 0, 200 * this._hpPercent / 100, 15);
            this._hpBar.graphics.endFill();
            this._hpBar.graphics.setStrokeStyle(2);
            this._hpBar.graphics.beginStroke('#000');
            this._hpBar.graphics.drawRect(0, 0, 200, 15);
            this._hpBar.graphics.endStroke();
        };
        Game.prototype._initializeGameObjects = function () {
            this._createTetromino();
            this._player = new objects.Player();
            this.addChild(this._player);
        };
        Game.prototype._initializeVariables = function () {
            this._currentLevel = 1;
            this._goalToNextLevel = this._currentLevel * 10;
            this._hpPercent = 100;
            // leftKeyDown = false
            // rightKeyDown = false
            // upKeyDown = false
            // downKeyDown = false
            // spaceKeyDown = false
        };
        Game.prototype._initializeUI = function () {
            this._background = new createjs.Bitmap(assets.getResult('BG'));
            this.addChild(this._background);
            //Create and add UI labels and buttons to the container
            this._returnBtn = new objects.Button("menuBtn", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 245);
            this._returnBtn.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._returnBtn);
            this._returnBtn.on("click", this._onBackButtonClick, this);
            this._restartBtn = new objects.Button("restartBtn", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 245);
            this._restartBtn.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._restartBtn);
            this._restartBtn.on("click", this._onRestartButtonClick, this);
            this._titleLabel = new objects.Label("Blastimoes", "60px custfont", "#0fc2d7", config.Screen.CENTER_X, 50);
            this._titleLabel.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._titleLabel);
            this._levelLabel = new objects.Label("Level\n" + this._currentLevel, "25px custfont", "#0fc2d7", 405, 250);
            this._levelLabel.textAlign = 'center';
            this._levelLabel.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._levelLabel);
            this._goalLabel = new objects.Label("Goal\n" + this._goalToNextLevel, "25px custfont", "#0fc2d7", 405, 350);
            this._goalLabel.textAlign = 'center';
            this._goalLabel.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._goalLabel);
            this._hpLabel = new objects.Label("HP", "25px custfont", "#0fc2d7", 400, 488);
            this._hpLabel.textAlign = 'center';
            this._hpLabel.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._hpLabel);
            this._createHpBar();
        };
        Game.prototype._createTetromino = function () {
            this._currentTetromino = new objects.Square(this._currentLevel);
            this.addChild(this._currentTetromino);
            // middle two cols are set to true when square created
            // grid[0][4] = grid[0][5] = true
        };
        /**
         * This function changes the game to the menu scene
         *
         * @private
         * @method _onBackButtonClick
         * @param {createjs.MouseEvent} event
         *
         * @memberOf Game
         */
        Game.prototype._onBackButtonClick = function (event) {
            // Set global variable to Menu Scene and call changescene function
            scene = config.Scene.MENU;
            changeScene();
        };
        /**
         * Changes scene to a new game scene since currentScene references game scene
         *
         * @private
         * @param {createjs.MouseEvent} event
         *
         * @memberOf Game
         */
        Game.prototype._onRestartButtonClick = function (event) {
            changeScene();
        };
        return Game;
    }(objects.Scene));
    scenes.Game = Game;
})(scenes || (scenes = {}));
//# sourceMappingURL=game.js.map