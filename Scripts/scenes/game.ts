/**
 * @file game.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @studentID 300867968
 * @date: September 23, 2016
 * @description: Game scene that contains all assets and functionality associated with the game itself
 * @version 0.2.0 added simple background to scene
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module scenes {
    export class Game extends objects.Scene {

        // PRIVATE VARIABLES +++++++++++++++++++++++++++++++++++++++++++++++++
        private _gameButton: objects.Button;
        private _background: createjs.Bitmap
        private _currentTetromino: objects.Tetromino

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

            this._background = new createjs.Bitmap(assets.getResult('BG'))
            this.addChild(this._background)

            this._currentTetromino = new objects.Square()
            this.addChild(this._currentTetromino)

            // Create button for scene and add to Game Scene container. Register for onclick event
            this._gameButton = new objects.Button("Back", config.Screen.CENTER_X, config.Screen.CENTER_Y + 250);
            this.addChild(this._gameButton);
            this._gameButton.on("click", this._onBackButtonClick, this);

            // Add gamescene to main stage container. 
            stage.addChild(this);
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
            // Update objects
            this._currentTetromino.update()
        }


        // PRIVATE FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++
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
    }
}