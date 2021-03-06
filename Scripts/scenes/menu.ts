/**
 * @file menu.ts
 * @author Kevin Ma 
 * @date: Oct 21, 2016
 * @description: This file contains all assets and functionality associated with the menu itself.
 * @version 1.0.2 - added development year to menu scene
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module scenes {
    export class Menu extends objects.Scene {

        // PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++++++
        private _startBtn: objects.Button;
        private _instructionBtn: objects.Button;
        private _titleLabel: objects.Label;
        private _authorLabel: objects.Label
        private _background: createjs.Bitmap;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
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
        public start(): void {
            console.log("Menu Scene Started");

            this._background = new createjs.Bitmap(assets.getResult('BG'))
            this.addChild(this._background)

            // 5x5 Box Blur filter on bg image
            let blurFilter = new createjs.BlurFilter(25, 25);
            this._background.filters = [blurFilter];
            let bitmapBounds = this._background.getBounds();

            this._background.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);

            this._titleLabel = new objects.Label("BLASTIMOES", "100px custfont", "#0fc2d7", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this._titleLabel.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._titleLabel)

            this._authorLabel = new objects.Label("Developed by: Kevin Ma {2016}", "20px custfont", "#0fc2d7", config.Screen.CENTER_X, config.Screen.CENTER_Y + 45);
            this._authorLabel.shadow = new createjs.Shadow('#000', 2, 2, 2)
            this.addChild(this._authorLabel);

            // Add button to scene. Register for click callback function
            this._startBtn = new objects.Button("startBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 90);
            // this._startBtn = new objects.Button("startBtn", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 120);
            this._startBtn.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._startBtn);
            this._startBtn.on("click", this._startButtonClick, this);

            this._instructionBtn = new objects.Button("instructionBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 160);
            // this._instructionBtn = new objects.Button("instructionBtn", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 120);
            this._instructionBtn.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._instructionBtn);
            this._instructionBtn.on("click", this._instructionBtnClick, this);

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        /**
         * This method runs when the Menu Scene updates
         * 
         * @public
         * @method update
         * 
         * @memberOf Menu
         * @return {void}
         */
        public update(): void {

        }

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
        private _startButtonClick(event: createjs.MouseEvent): void {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.GAME;
            changeScene();
        }

        private _instructionBtnClick(event: createjs.MouseEvent): void {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        }
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */