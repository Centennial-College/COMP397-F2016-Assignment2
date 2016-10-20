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
            leftKeyDown = false
            rightKeyDown = false
            upKeyDown = false
            downKeyDown = false
            spaceKeyDown = false

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
            //tetromino has landed (collided with other block or hit bottom)
            if (this._currentTetromino.dead) {
                this._createTetromino()
            }

            //only update tetromino every interval to make it jump through the grid and not 
            //continuous descend
            this._updateCounter++

            // if (this._updateCounter == this._currentTetromino.arrowControlSpeed) {
            if (leftKeyDown) {
                // console.log('goleft');

                this._currentTetromino.moveLeft()
            }

            if (rightKeyDown) {
                this._currentTetromino.moveRight()
            }

            if (downKeyDown) {
                this._currentTetromino.moveDown()
            }

            if (spaceKeyDown) {
                this._currentTetromino.hardDrop()
            }

            if (upKeyDown) {
                this._currentTetromino.rotate()
            }
            // }

            // console.log(leftKeyDown);
            if (this._updateCounter == this._currentTetromino.dropSpeed) {

                this._currentTetromino.update()
                this._updateCounter = 0

                //when square moves down, grid becomes true
            }
        }

        // PRIVATE FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++
        private _moveTetrimo(evt): void {
            console.log(evt.keyCode);

            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT: leftKeyDown = true; break;
                case config.Controls.ARROW_KEY_RIGHT: rightKeyDown = true; break;
                case config.Controls.ARROW_KEY_UP: upKeyDown = true; break;
                case config.Controls.ARROW_KEY_DOWN: downKeyDown = true; break;
                case config.Controls.SPACE_KEY: spaceKeyDown = true; break;
            }

            console.log(leftKeyDown);

        }
        private _stopTetrimo(evt): void {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT: leftKeyDown = false; break;
                case config.Controls.ARROW_KEY_RIGHT: rightKeyDown = false; break;
                case config.Controls.ARROW_KEY_UP: upKeyDown = false; break;
                case config.Controls.ARROW_KEY_DOWN: downKeyDown = false; break;
                case config.Controls.SPACE_KEY: spaceKeyDown = false; break;
            }
        }


        private _createTetromino(): void {
            this._currentTetromino = new objects.Square()
            this.addChild(this._currentTetromino)
            // middle two cols are set to true when square created
            grid[0][4] = grid[0][5] = true
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
            grid = new Array(20)
            for (let row = 0; row < 20; row++) {
                grid[row] = new Array(10)
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
                    grid[row][col] = false
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
            console.log(grid);
        }
    }
}