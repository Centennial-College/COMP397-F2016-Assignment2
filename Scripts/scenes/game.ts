/**
 * @file game.ts
 * @author Kevin Ma
 * @date: Oct 20, 2016
 * @description: Game scene that contains all assets and functionality associated with the game itself
 * @version 0.9.0 - implemented move functionality for player
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module scenes {
    export class Game extends objects.Scene {

        // PRIVATE VARIABLES +++++++++++++++++++++++++++++++++++++++++++++++++
        //game objects
        private _currentTetromino: objects.Tetromino
        private _player: objects.Player

        //UI 
        private _background: createjs.Bitmap
        private _restartBtn: objects.Button;
        private _returnBtn: objects.Button;

        private _titleLabel: objects.Label

        //level
        private _levelLabel: objects.Label
        private _currentLevel: number

        //goal to next Level
        private _goalLabel: objects.Label
        private _goalToNextLevel: number

        //HP
        private _hpPercent: number
        private _hpLabel: objects.Label
        private _hpBar: createjs.Shape

        // private _leftKeyDown: boolean
        // private _rightKeyDown: boolean
        // private _upKeyDown: boolean
        // private _downKeyDown: boolean
        // private _spaceKeyDown: boolean

        //PUBLIC INSTANCE VARIABLES

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
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
        public start(): void {
            // Add objects to the scene
            console.log("Game scene started");

            this._initializeVariables()
            this._initializeUI()
            this._initializeGameObjects()

            // Add gamescene to main stage container. 
            stage.addChild(this);

            //handle keys
            window.onkeydown = this._player.move
            window.onkeyup = this._player.stop
        }

        /**
         * This function updates the objects contained in the game scene
         * 
         * @public
         * @method update
         * 
         * @memberOf Game
         * @return {void}
         */
        public update(): void {
            //tetromino has landed (killed or hit bottom)
            if (this._currentTetromino.dead) {
                this.removeChild(this._currentTetromino)
                this._goalToNextLevel--
                this._goalLabel.text = "Goal\n" + this._goalToNextLevel
                this._hpPercent -= 13
                this._createTetromino()
            }

            //update hpbar when enemy reached bottom and not shot dead
            this._updateHpBar()

            //update player
            this._player.update()

            //update square object 
            this._currentTetromino.update()
        }

        // PRIVATE FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++
        private _createHpBar(): void {
            this._hpBar = new createjs.Shape();
            this._hpBar.x = 413
            this._hpBar.y = 480
            this._hpBar.graphics.setStrokeStyle(2);
            this._hpBar.graphics.beginStroke('#000');
            this._hpBar.graphics.drawRect(0, 0, 200, 15);
            this.addChild(this._hpBar);
        }
        private _updateHpBar(): void {
            this._hpBar.graphics.clear();
            this._hpBar.graphics.beginFill('#0fc2d7');
            this._hpBar.graphics.drawRect(0, 0, 200 * this._hpPercent / 100, 15);
            this._hpBar.graphics.endFill();
            this._hpBar.graphics.setStrokeStyle(2);
            this._hpBar.graphics.beginStroke('#000');
            this._hpBar.graphics.drawRect(0, 0, 200, 15);
            this._hpBar.graphics.endStroke();
        }
        private _initializeGameObjects(): void {
            this._createTetromino()
            this._player = new objects.Player()
            this.addChild(this._player)
        }
        private _initializeVariables(): void {
            this._currentLevel = 1
            this._goalToNextLevel = this._currentLevel * 10
            this._hpPercent = 100

            // leftKeyDown = false
            // rightKeyDown = false
            // upKeyDown = false
            // downKeyDown = false
            // spaceKeyDown = false
        }
        private _initializeUI(): void {
            this._background = new createjs.Bitmap(assets.getResult('BG'))
            this.addChild(this._background)

            //Create and add UI labels and buttons to the container
            this._returnBtn = new objects.Button("menuBtn", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 245);
            this._returnBtn.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._returnBtn);
            this._returnBtn.on("click", this._onBackButtonClick, this);

            this._restartBtn = new objects.Button("restartBtn", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 245);
            this._restartBtn.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._restartBtn);
            this._restartBtn.on("click", this._onRestartButtonClick, this);

            this._titleLabel = new objects.Label("Blastimoes", "60px custfont", "#0fc2d7", config.Screen.CENTER_X, 50);
            this._titleLabel.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._titleLabel);

            this._levelLabel = new objects.Label("Level\n" + this._currentLevel, "25px custfont", "#0fc2d7", 405, 250);
            this._levelLabel.textAlign = 'center'
            this._levelLabel.shadow = new createjs.Shadow('#000', 2, 2, 2)
            this.addChild(this._levelLabel);

            this._goalLabel = new objects.Label("Goal\n" + this._goalToNextLevel, "25px custfont", "#0fc2d7", 405, 350);
            this._goalLabel.textAlign = 'center'
            this._goalLabel.shadow = new createjs.Shadow('#000', 2, 2, 2)
            this.addChild(this._goalLabel);

            this._hpLabel = new objects.Label("HP", "25px custfont", "#0fc2d7", 400, 488);
            this._hpLabel.textAlign = 'center'
            this._hpLabel.shadow = new createjs.Shadow('#000', 2, 2, 2)
            this.addChild(this._hpLabel);

            this._createHpBar()
        }

        private _createTetromino(): void {
            this._currentTetromino = new objects.Square(this._currentLevel)
            this.addChild(this._currentTetromino)
            // middle two cols are set to true when square created
            // grid[0][4] = grid[0][5] = true
        }
        /**
         * This function changes the game to the menu scene
         * 
         * @private
         * @method _onBackButtonClick
         * @param {createjs.MouseEvent} event
         * 
         * @memberOf Game
         */
        private _onBackButtonClick(event: createjs.MouseEvent) {
            // Set global variable to Menu Scene and call changescene function
            scene = config.Scene.MENU;
            changeScene();
        }

        /**
         * Changes scene to a new game scene since currentScene references game scene
         * 
         * @private
         * @param {createjs.MouseEvent} event
         * 
         * @memberOf Game
         */
        private _onRestartButtonClick(event: createjs.MouseEvent) {
            changeScene()
        }
    }
}