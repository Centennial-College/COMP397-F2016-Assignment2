/**
 * @file gameover.ts
 * @author Kevin Ma 
 * @date: Oct 21 2016
 * @description: This file is the gameover scene for the game.
 * @version 0.14.0 - implemented gameover scene
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module scenes {
    export class GameOver extends objects.Scene {

        // PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++++++
        private _background: createjs.Bitmap;
        private _gameoverLabel: objects.Label
        private _scoreLabel: objects.Label
        private _menuBtn: objects.Button
        private _playAgainBtn: objects.Button

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

            this._playAgainBtn = new objects.Button("playAgainBtn", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 245);
            this._playAgainBtn.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._playAgainBtn);
            this._playAgainBtn.on("click", this._onPlayAgainButtonClick, this);

            this._gameoverLabel = new objects.Label("good game", "100px custfont", "#0fc2d7", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this._gameoverLabel.shadow = new createjs.Shadow('#000', 5, 5, 15)
            this.addChild(this._gameoverLabel)

            this._scoreLabel = new objects.Label("High score: " + score, "40px custfont", "#0fc2d7", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100);
            this._scoreLabel.shadow = new createjs.Shadow('#000', 2, 2, 2)
            this.addChild(this._scoreLabel)

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
            changeScene();
        }

        private _onPlayAgainButtonClick(event: createjs.MouseEvent): void {
            scene = config.Scene.GAME;
            changeScene();
        }

    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */