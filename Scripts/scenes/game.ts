/**
 * @file game.ts
 * @author Kevin Ma
 * @date: Oct 18, 2016
 * @description: Game scene that contains all assets and functionality associated with the game itself
 * @version 0.4.0 - created 2D array for grid on game scene
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module scenes {
    export class Game extends objects.Scene {

        // PRIVATE VARIABLES +++++++++++++++++++++++++++++++++++++++++++++++++
        private _returnBtn: objects.Button;
        private _restartBtn: objects.Button;
        private _background: createjs.Bitmap
        private _currentTetromino: objects.Tetromino
        private _updateCounter: number

        private _leftKeyDown: boolean
        private _rightKeyDown: boolean
        private _upKeyDown: boolean
        private _downKeyDown: boolean
        private _spaceKeyDown: boolean

        //PUBLIC INSTANCE VARIABLES
        //2D array grid to store avail spaces/taken spaces
        //must be public so that tetromino classes can update grid accordingly
        public _grid: boolean[][]

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
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
        public start(): void {
            // Add objects to the scene
            console.log("Game scene started");

            //initialize variables
            this._updateCounter = 0
            this._leftKeyDown = false
            this._rightKeyDown = false
            this._upKeyDown = false
            this._downKeyDown = false
            this._spaceKeyDown = false
            this._initializeGrid()

            this._background = new createjs.Bitmap(assets.getResult('BG'))
            this.addChild(this._background)

            this._createTetromino()

            // Create button for scene and add to Game Scene container. Register for onclick event
            this._returnBtn = new objects.Button("menuBtn", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 245);
            this._returnBtn.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._returnBtn);
            this._returnBtn.on("click", this._onBackButtonClick, this);

            this._restartBtn = new objects.Button("restartBtn", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 245);
            this._restartBtn.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._restartBtn);
            this._restartBtn.on("click", this._onRestartButtonClick, this);


            this._displayGrid()

            // Add gamescene to main stage container. 
            stage.addChild(this);

            //handle keys
            window.onkeydown = this._moveTetrimo
            window.onkeyup = this._stopTetrimo
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
            //only update tetromino every interval to make it jump through the grid and not 
            //continuous descend
            this._updateCounter++

            console.log(this._leftKeyDown);


            if (this._leftKeyDown) {
                this._currentTetromino.moveLeft()
            }
            if (this._rightKeyDown) {
                this._currentTetromino.moveRight()
            }

            if (this._updateCounter == this._currentTetromino.speed) {
                this._currentTetromino.update()
                this._updateCounter = 0

                //when square moves down, grid becomes true
            }
        }

        // PRIVATE FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++
        private _moveTetrimo(evt): void {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT: this._leftKeyDown = true; break;
                case config.Controls.ARROW_KEY_RIGHT: this._rightKeyDown = true; break;
                case config.Controls.ARROW_KEY_UP: this._upKeyDown = true; break;
                case config.Controls.ARROW_KEY_DOWN: this._downKeyDown = true; break;
                case config.Controls.SPACE_KEY: this._spaceKeyDown = true; break;
            }
        }
        private _stopTetrimo(evt): void {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT: this._leftKeyDown = false; break;
                case config.Controls.ARROW_KEY_RIGHT: this._rightKeyDown = false; break;
                case config.Controls.ARROW_KEY_UP: this._upKeyDown = false; break;
                case config.Controls.ARROW_KEY_DOWN: this._downKeyDown = false; break;
                case config.Controls.SPACE_KEY: this._spaceKeyDown = false; break;
            }
        }


        private _createTetromino(): void {
            this._currentTetromino = new objects.Square()
            this.addChild(this._currentTetromino)
            // middle two cols are set to true when square created
            this._grid[0][4] = this._grid[0][5] = true
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

        private _onRestartButtonClick(event: createjs.MouseEvent) {
            changeScene()
        }

        /**
         * Initializes the grid to empty 2d array 
         * 
         * @private
         * 
         * @memberOf Game
         */
        private _initializeGrid(): void {
            this._grid = new Array(20)
            for (let row = 0; row < 20; row++) {
                this._grid[row] = new Array(10)
            }
            this._resetGrid()
        }

        /**
         * Changes all values for grid to false
         * 
         * @private
         * 
         * @memberOf Game
         */
        private _resetGrid(): void {
            for (let row = 0; row < 20; row++) {
                for (let col = 0; col < 10; col++) {
                    this._grid[row][col] = false
                }
            }
        }

        /**
         * Displays the contents of the grid in the console. For debugging purposes.
         * 
         * @private
         * 
         * @memberOf Game
         */
        private _displayGrid(): void {
            console.log(this._grid);
        }
    }
}