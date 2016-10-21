/**
 * @file instructions.ts
 * @author Kevin Ma 
 * @date: Oct 21 2016
 * @description: This file is the instructions scene for the game.
 * @version 0.15.0 - implemented instructons scene
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module scenes {
    export class Instructions extends objects.Scene {

        // PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++++++
        private _background: createjs.Bitmap;
        private _titleLabel: objects.Label
        private _scoreLabel: objects.Label
        private _instructions: HTMLElement
        private _menuBtn: objects.Button
        private _startGameBtn: objects.Button

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
         * @memberOf Gameover
         * @return {void}
         */
        public start(): void {
            this._background = new createjs.Bitmap(assets.getResult("BG"));
            this.addChild(this._background);

            this._menuBtn = new objects.Button("menuBtn", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 245);
            this._menuBtn.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._menuBtn);
            this._menuBtn.on("click", this._onMenuButtonClick, this);

            // 5x5 Box Blur filter on bg image
            let blurFilter = new createjs.BlurFilter(25, 25);
            this._background.filters = [blurFilter];
            let bitmapBounds = this._background.getBounds();

            this._background.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);

            this._startGameBtn = new objects.Button("startBtn", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 245);
            this._startGameBtn.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._startGameBtn);
            this._startGameBtn.on("click", this._onStartGameButtonClick, this);

            this._titleLabel = new objects.Label("Instructions", "100px custfont", "#0fc2d7",
                config.Screen.CENTER_X, 75);
            this._titleLabel.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._titleLabel)

            this._instructions = document.getElementById('instructions')
            this._instructions.style.display = 'block'
            this._instructions.style.boxShadow = '10px 10px 10px #333'
            let instructionsDOM = new createjs.DOMElement(this._instructions);
            instructionsDOM.alpha = 0;
            this.addChild(instructionsDOM)
            createjs.Tween.get(instructionsDOM).wait(1000).to({
                x: 215,
                y: 195,
                alpha: 1
            }, 2000,
                createjs.Ease.quadOut);
            stage.addChild(this);
        }

        /**
         * This method runs when the scene needs to be updated
         * 
         * @public
         * @method update
         * 
         * @memberOf Gameover
         * @return {void}
         */
        public update(): void {

        }

        public removeInstructions(): void {
            this._instructions.style.display = 'none'
        }

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
        private _onMenuButtonClick(event: createjs.MouseEvent): void {
            scene = config.Scene.MENU;
            this.removeInstructions()
            changeScene();
        }

        private _onStartGameButtonClick(event: createjs.MouseEvent): void {
            scene = config.Scene.GAME;
            this.removeInstructions()
            changeScene();
        }

    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */