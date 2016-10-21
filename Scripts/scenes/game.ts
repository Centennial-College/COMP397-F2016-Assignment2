/**
 * @file game.ts
 * @author Kevin Ma
 * @date: Oct 20, 2016
 * @description: Game scene that contains all assets and functionality associated with the game itself
 * @version 0.12.0 - successfully checked collision between bullet and squareTetromino
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module scenes {
    export class Game extends objects.Scene {

        // PRIVATE VARIABLES +++++++++++++++++++++++++++++++++++++++++++++++++
        private _animationDurationCounter: number

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
            window.onkeydown = this._player.onKeyDown
            window.onkeyup = this._player.onKeyUp
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
            //tetromino reached bottom of map
            if (this._currentTetromino.isFinished) {
                //need to decrement goal towards next level regardless
                //whether player shot the enemy or enemy reached player base
                this._goalToNextLevel--
                this._goalLabel.text = "Goal\n" + this._goalToNextLevel

                //only decrement player hp if enemy reached player base
                //spawn enemy without waiting for death animation to play
                if (!this._currentTetromino.isDead) {
                    this._hpPercent -= 13
                    this._createTetromino()
                }
            }
            //if player shot enemy, play death animation, wait till it finishes
            //then spawn new enemy
            if (this._currentTetromino.isDead) {
                this._currentTetromino.isFinished = false
                if (this._currentTetromino.isReadyToSpawn) {
                    this._createTetromino()
                }
            }
            //update hpbar when enemy reached bottom and not shot dead
            this._updateHpBar()

            //update player
            this._player.update()
            //bug when level > 1, bullets get removed while still in mid flight from array
            if (spaceKeyDown && this._player.ammo.length < this._currentLevel) {
                let tempBullet = new objects.Bullet("bullet1", this._player.x + 10, this._player.y, this._currentLevel)
                this._player.shootBullet(tempBullet)
                this.addChild(tempBullet)
                console.log('shoot bulet');
                console.log(this._player.ammo.length);
            }
            let playerBullets = this._player.ammo
            playerBullets.forEach(bullet => {
                bullet.update()
                //check if bullet(s) hitbox coincide with the squares hitbox, aka a collision 
                if ((bullet.y >= this._currentTetromino.y - this._currentTetromino.halfHeight
                    && bullet.y <= this._currentTetromino.y + this._currentTetromino.halfHeight
                    && bullet.x >= this._currentTetromino.x - this._currentTetromino.halfWidth
                    && bullet.x <= this._currentTetromino.x + this._currentTetromino.halfWidth)) {
                    //do post-death checks
                    this._currentTetromino.isDead = true
                    this._currentTetromino.isFinished = true

                    //remove the bullet from the player's ammunition and remove from the scene
                    this._player.ammo.pop()
                    this.removeChild(bullet)
                }
                //bullet reach end of map 
                if (bullet.y <= 75) {
                    this._player.ammo.pop()
                    this.removeChild(bullet)
                }
            });

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
            this._animationDurationCounter = 0
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