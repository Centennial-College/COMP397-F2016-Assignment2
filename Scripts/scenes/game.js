/**
 * @file game.ts
 * @author Kevin Ma
 * @date: Oct 21, 2016
 * @description: Game scene that contains all assets and functionality associated with the game itself
 * @version 1.0.0 - Initial Release; implemented diff bullet types
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
         * This function prepares the game scene for the user to play
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
            this._initializeVariables();
            this._initializeUI();
            this._initializeGameObjects();
            // Add gamescene to main stage container. 
            stage.addChild(this);
            //handle keys
            window.onkeydown = this._player.onKeyDown;
            window.onkeyup = this._player.onKeyUp;
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
            var _this = this;
            //tetromino reached bottom of map
            if (this._currentTetromino.isFinished) {
                //need to decrement goal towards next level regardless
                //whether player shot the enemy or enemy reached player base
                this._goalToNextLevel--;
                //when goal reaches 0, level up, new goal
                if (this._goalToNextLevel == 0) {
                    this._currentLevel++;
                    switch (this._currentLevel) {
                        case 2:
                            this._bullets[2].alpha = 1;
                            break;
                        case 3:
                            this._bullets[3].alpha = 1;
                            break;
                    }
                    this._goalToNextLevel = this._currentLevel * 10;
                    this._levelLabel.text = this._currentLevel.toString();
                }
                this._goalLabel.text = this._goalToNextLevel.toString();
                //only decrement player hp if enemy reached player base
                //spawn enemy without waiting for death animation to play
                if (!this._currentTetromino.isDead) {
                    this._hpPercent -= 13;
                    //if hp = 0%, game over
                    if (this._hpPercent <= 0) {
                        scene = config.Scene.GAMEOVER;
                        changeScene();
                    }
                    this._createTetromino();
                }
            }
            //if player shot enemy, play death animation, wait till it finishes
            //then spawn new enemy
            if (this._currentTetromino.isDead) {
                this._currentTetromino.isFinished = false;
                if (this._currentTetromino.isReadyToSpawn) {
                    this._createTetromino();
                }
            }
            //update hpbar when enemy reached bottom and not shot dead
            this._updateHpBar();
            //update player
            this._player.update();
            //bug when level > 1, bullets get removed while still in mid flight from array
            // if (spaceKeyDown && this._player.ammo.length < this._currentLevel) {
            if (spaceKeyDown && this._player.ammo.length < 1) {
                var tempBullet = new objects.Bullet(this._bulletImageString, this._player.x + 10, this._player.y, this._bulletUsing);
                this._player.shootBullet(tempBullet);
                this.addChild(tempBullet);
            }
            var playerBullets = this._player.ammo;
            playerBullets.forEach(function (bullet) {
                bullet.update();
                //only allow colliisons if square isnt dead
                if (!_this._currentTetromino.isDead) {
                    //check if bullet(s) hitbox coincide with the squares hitbox, aka a collision 
                    if ((bullet.y >= _this._currentTetromino.y - _this._currentTetromino.halfHeight
                        && bullet.y <= _this._currentTetromino.y + _this._currentTetromino.halfHeight
                        && bullet.x >= _this._currentTetromino.x - _this._currentTetromino.halfWidth
                        && bullet.x <= _this._currentTetromino.x + _this._currentTetromino.halfWidth)) {
                        //do post-death checks
                        _this._currentTetromino.isDead = true;
                        _this._currentTetromino.isFinished = true;
                        score += 4 * _this._currentLevel;
                        _this._scoreLabel.text = score.toString();
                        //remove the bullet from the player's ammunition and remove from the scene
                        _this._player.ammo.pop();
                        _this.removeChild(bullet);
                    }
                }
                //bullet reach end of map 
                if (bullet.y <= 75) {
                    _this._player.ammo.pop();
                    _this.removeChild(bullet);
                }
            });
            //change bullet type when pressing Q, W, or T and level requirment is met
            if (qDown) {
                this._bulletImageString = 'bullet';
                this._bulletUsing = 1;
                this.removeChild(this._currentBullet);
                this._currentBullet = new createjs.Sprite(blastimoesAtlas, "bulletContinuous");
                this._currentBullet.x = 678;
                this._currentBullet.y = 126;
                this.addChild(this._currentBullet);
            }
            if (wDown && this._currentLevel >= 2) {
                this._bulletImageString = 'bullet1';
                this._bulletUsing = 2;
                this.removeChild(this._currentBullet);
                this._currentBullet = new createjs.Sprite(blastimoesAtlas, "bullet1Continuous");
                this._currentBullet.x = 678;
                this._currentBullet.y = 126;
                this.addChild(this._currentBullet);
            }
            if (tDown && this._currentLevel >= 3) {
                this._bulletImageString = 'bullet2';
                this._bulletUsing = 3;
                this.removeChild(this._currentBullet);
                this._currentBullet = new createjs.Sprite(blastimoesAtlas, "bullet2Continuous");
                this._currentBullet.x = 678;
                this._currentBullet.y = 126;
                this.addChild(this._currentBullet);
            }
            //update square object 
            this._currentTetromino.update();
        };
        // PRIVATE FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++
        Game.prototype._createHpBar = function () {
            this._hpBar = new createjs.Shape();
            this._hpBar.x = 413;
            this._hpBar.y = 480;
            this._hpBar.graphics.setStrokeStyle(2);
            this._hpBar.graphics.beginStroke('#000');
            this._hpBar.graphics.drawRect(0, 0, 200, 15);
            this.addChild(this._hpBar);
        };
        Game.prototype._updateHpBar = function () {
            this._hpBar.graphics.clear();
            this._hpBar.graphics.beginFill('#0fc2d7');
            this._hpBar.graphics.drawRect(0, 0, 200 * this._hpPercent / 100, 15);
            this._hpBar.graphics.endFill();
            this._hpBar.graphics.setStrokeStyle(2);
            this._hpBar.graphics.beginStroke('#000');
            this._hpBar.graphics.drawRect(0, 0, 200, 15);
            this._hpBar.graphics.endStroke();
        };
        Game.prototype._initializeGameObjects = function () {
            this._createTetromino();
            this._player = new objects.Player();
            this.addChild(this._player);
        };
        Game.prototype._initializeVariables = function () {
            this._currentLevel = 1;
            this._goalToNextLevel = this._currentLevel * 10;
            this._hpPercent = 100;
            score = 0;
            this._bulletUsing = 1;
            this._bullets = [];
            this._bulletsLabel = [];
            this._bulletImageString = 'bullet';
        };
        Game.prototype._initializeUI = function () {
            this._background = new createjs.Bitmap(assets.getResult('BG'));
            this.addChild(this._background);
            //Create and add UI labels and buttons to the container
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
            this._levelHeader = new objects.Label("Level", "30px custfont", "#0fc2d7", 380, 235);
            this._levelHeader.textAlign = 'center';
            this._levelHeader.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._levelHeader);
            this._levelLabel = new objects.Label("" + this._currentLevel, "50px custfont", "#0fc2d7", 350, 280);
            this._levelLabel.textAlign = 'center';
            this._levelLabel.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._levelLabel);
            this._goalHeader = new objects.Label("Goal", "30px custfont", "#0fc2d7", 380, 365);
            this._goalHeader.textAlign = 'center';
            this._goalHeader.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._goalHeader);
            this._goalLabel = new objects.Label("" + this._goalToNextLevel, "50px custfont", "#0fc2d7", 365, 408);
            this._goalLabel.textAlign = 'center';
            this._goalLabel.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._goalLabel);
            this._hpLabel = new objects.Label("HP", "25px custfont", "#0fc2d7", 400, 488);
            this._hpLabel.textAlign = 'center';
            this._hpLabel.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._hpLabel);
            this._scoreHeader = new objects.Label("Score", "30px custfont", "#0fc2d7", 385, 100);
            this._scoreHeader.textAlign = 'center';
            this._scoreHeader.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._scoreHeader);
            this._scoreLabel = new objects.Label("" + score, "50px custfont", "#0fc2d7", 355, 145);
            this._scoreLabel.textAlign = 'center';
            this._scoreLabel.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._scoreLabel);
            this._bulletHeader = new objects.Label("Using", "30px custfont", "#0fc2d7", 725, 100);
            this._bulletHeader.textAlign = 'center';
            this._bulletHeader.shadow = new createjs.Shadow('#000', 2, 2, 2);
            this.addChild(this._bulletHeader);
            this._currentBullet = new createjs.Sprite(blastimoesAtlas, "bulletContinuous");
            this._currentBullet.x = 678;
            this._currentBullet.y = 126;
            this.addChild(this._currentBullet);
            this._bullets[1] = new createjs.Sprite(blastimoesAtlas, "bulletFrozen");
            this._bullets[1].x = 678;
            this._bullets[1].y = 226;
            this.addChild(this._bullets[1]);
            this._bulletsLabel[1] = new objects.Label("Q.", "30px custfont", "#0fc2d7", 700, 200);
            this._bulletsLabel[1].textAlign = 'center';
            this.addChild(this._bulletsLabel[1]);
            this._bulletsLabel[2] = new objects.Label("W.", "30px custfont", "#0fc2d7", 700, 300);
            this._bulletsLabel[2].textAlign = 'center';
            this._bulletsLabel[2].shadow = new createjs.Shadow('#000', 2, 2, 2);
            this._bulletsLabel[2].alpha = 0.3;
            this.addChild(this._bulletsLabel[2]);
            this._bullets[2] = new createjs.Sprite(blastimoesAtlas, "bullet1Frozen");
            this._bullets[2].x = 678;
            this._bullets[2].y = 326;
            this._bullets[2].alpha = 0.3;
            this.addChild(this._bullets[2]);
            this._bulletsLabel[3] = new objects.Label("T.", "30px custfont", "#0fc2d7", 697, 400);
            this._bulletsLabel[3].textAlign = 'center';
            this._bulletsLabel[3].shadow = new createjs.Shadow('#000', 2, 2, 2);
            this._bulletsLabel[3].alpha = 0.3;
            this.addChild(this._bulletsLabel[3]);
            this._bullets[3] = new createjs.Sprite(blastimoesAtlas, "bullet2Frozen");
            this._bullets[3].x = 678;
            this._bullets[3].y = 426;
            this._bullets[3].alpha = 0.3;
            this.addChild(this._bullets[3]);
            this._createHpBar();
        };
        Game.prototype._createTetromino = function () {
            this._currentTetromino = new objects.Square(this._currentLevel);
            this.addChild(this._currentTetromino);
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
         * Changes scene to a new game scene since currentScene references game scene
         *
         * @private
         * @param {createjs.MouseEvent} event
         *
         * @memberOf Game
         */
        Game.prototype._onRestartButtonClick = function (event) {
            changeScene();
        };
        return Game;
    }(objects.Scene));
    scenes.Game = Game;
})(scenes || (scenes = {}));
//# sourceMappingURL=game.js.map