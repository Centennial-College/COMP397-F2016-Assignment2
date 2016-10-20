/**
 * @file game.ts
 * @author Kevin Ma
 * @date: Oct 20, 2016
 * @description: Game scene that contains all assets and functionality associated with the game itself
 * @version 0.5.0 - implemented square tetromino moving on its own
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
            this._currentLevel = 1;
            // this._updateCounter = 0
            leftKeyDown = false;
            rightKeyDown = false;
            upKeyDown = false;
            downKeyDown = false;
            spaceKeyDown = false;
            this._initializeGrid();
            this._background = new createjs.Bitmap(assets.getResult('BG'));
            this.addChild(this._background);
            this._createTetromino();
            // Create button for scene and add to Game Scene container. Register for onclick event
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
            //tetromino has landed (collided with other block or hit bottom)
            if (this._currentTetromino.dead) {
                this.removeChild(this._currentTetromino);
                this._createTetromino();
            }
            //update square object 
            this._currentTetromino.update();
            // //only update tetromino every interval to make it jump through the grid and not 
            // //continuous descend
            // this._updateCounter++
            // // if (this._updateCounter == this._currentTetromino.arrowControlSpeed) {
            // if (leftKeyDown) {
            //     // console.log('goleft');
            //     this._currentTetromino.moveLeft()
            // }
            // if (rightKeyDown) {
            //     this._currentTetromino.moveRight()
            // }
            // if (downKeyDown) {
            //     this._currentTetromino.moveDown()
            // }
            // if (spaceKeyDown) {
            //     this._currentTetromino.hardDrop()
            // }
            // if (upKeyDown) {
            //     this._currentTetromino.rotate()
            // }
            // // }
            // // console.log(leftKeyDown);
            // if (this._updateCounter == this._currentTetromino.dropSpeed) {
            //     this._currentTetromino.update()
            //     this._updateCounter = 0
            //     //when square moves down, grid becomes true
            // }
        };
        // PRIVATE FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++
        Game.prototype._moveTetrimo = function (evt) {
            console.log(evt.keyCode);
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = true;
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = true;
                    break;
                case config.Controls.ARROW_KEY_UP:
                    upKeyDown = true;
                    break;
                case config.Controls.ARROW_KEY_DOWN:
                    downKeyDown = true;
                    break;
                case config.Controls.SPACE_KEY:
                    spaceKeyDown = true;
                    break;
            }
            console.log(leftKeyDown);
        };
        Game.prototype._stopTetrimo = function (evt) {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = false;
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = false;
                    break;
                case config.Controls.ARROW_KEY_UP:
                    upKeyDown = false;
                    break;
                case config.Controls.ARROW_KEY_DOWN:
                    downKeyDown = false;
                    break;
                case config.Controls.SPACE_KEY:
                    spaceKeyDown = false;
                    break;
            }
        };
        Game.prototype._createTetromino = function () {
            this._currentTetromino = new objects.Square(this._currentLevel);
            this.addChild(this._currentTetromino);
            // middle two cols are set to true when square created
            grid[0][4] = grid[0][5] = true;
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
        Game.prototype._onRestartButtonClick = function (event) {
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
            grid = new Array(20);
            for (var row = 0; row < 20; row++) {
                grid[row] = new Array(10);
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
                    grid[row][col] = false;
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
            console.log(grid);
        };
        return Game;
    }(objects.Scene));
    scenes.Game = Game;
})(scenes || (scenes = {}));
//# sourceMappingURL=game.js.map