/**
 * @file game.ts
 * @author Kevin Ma
 * @date: Oct 18, 2016
 * @description: Game scene that contains all assets and functionality associated with the game itself
 * @version 0.4.0 - created 2D array for grid on game scene
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
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Game() {
            _super.call(this);
        }
        // PUBLIC FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This function creates the game objects and adds them to the stage
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
            //initialize variables
            this._updateCounter = 0;
            this._leftKeyDown = false;
            this._rightKeyDown = false;
            this._upKeyDown = false;
            this._downKeyDown = false;
            this._spaceKeyDown = false;
            this._initializeGrid();
            this._background = new createjs.Bitmap(assets.getResult('BG'));
            this.addChild(this._background);
            this._createTetromino();
            // Create button for scene and add to Game Scene container. Register for onclick event
            this._gameButton = new objects.Button("Back", config.Screen.CENTER_X, config.Screen.CENTER_Y + 250);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._onBackButtonClick, this);
            this._displayGrid();
            // Add gamescene to main stage container. 
            stage.addChild(this);
            //handle keys
            window.onkeydown = this._moveTetrimo;
            window.onkeyup = this._stopTetrimo;
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
            //only update tetromino every interval to make it jump through the grid and not 
            //continuous descend
            this._updateCounter++;
            console.log(this._leftKeyDown);
            if (this._leftKeyDown) {
                this._currentTetromino.moveLeft();
            }
            if (this._rightKeyDown) {
                this._currentTetromino.moveRight();
            }
            if (this._updateCounter == this._currentTetromino.speed) {
                this._currentTetromino.update();
                this._updateCounter = 0;
            }
        };
        // PRIVATE FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++
        Game.prototype._moveTetrimo = function (evt) {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    this._leftKeyDown = true;
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    this._rightKeyDown = true;
                    break;
                case config.Controls.ARROW_KEY_UP:
                    this._upKeyDown = true;
                    break;
                case config.Controls.ARROW_KEY_DOWN:
                    this._downKeyDown = true;
                    break;
                case config.Controls.SPACE_KEY:
                    this._spaceKeyDown = true;
                    break;
            }
        };
        Game.prototype._stopTetrimo = function (evt) {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    this._leftKeyDown = false;
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    this._rightKeyDown = false;
                    break;
                case config.Controls.ARROW_KEY_UP:
                    this._upKeyDown = false;
                    break;
                case config.Controls.ARROW_KEY_DOWN:
                    this._downKeyDown = false;
                    break;
                case config.Controls.SPACE_KEY:
                    this._spaceKeyDown = false;
                    break;
            }
        };
        Game.prototype._createTetromino = function () {
            this._currentTetromino = new objects.Square();
            this.addChild(this._currentTetromino);
            // middle two cols are set to true when square created
            this._grid[0][4] = this._grid[0][5] = true;
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
         * Initializes the grid to empty 2d array
         *
         * @private
         *
         * @memberOf Game
         */
        Game.prototype._initializeGrid = function () {
            this._grid = new Array(20);
            for (var row = 0; row < 20; row++) {
                this._grid[row] = new Array(10);
            }
            this._resetGrid();
        };
        /**
         * Changes all values for grid to false
         *
         * @private
         *
         * @memberOf Game
         */
        Game.prototype._resetGrid = function () {
            for (var row = 0; row < 20; row++) {
                for (var col = 0; col < 10; col++) {
                    this._grid[row][col] = false;
                }
            }
        };
        /**
         * Displays the contents of the grid in the console. For debugging purposes.
         *
         * @private
         *
         * @memberOf Game
         */
        Game.prototype._displayGrid = function () {
            console.log(this._grid);
        };
        return Game;
    }(objects.Scene));
    scenes.Game = Game;
})(scenes || (scenes = {}));
//# sourceMappingURL=game.js.map