/**
 * @file player.ts
 * @author Kevin Ma 
 * @date: Oct 21 2016
 * @description: Player class is used to manage the particle launcher in the game Blastimoes (behavior and attributes)
 * @version 1.0.0 - Initial Release; implemented diff bullet types
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module objects {
    export class Player extends createjs.Shape {
        //instance variables
        private _ammunition: objects.Bullet[]

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super()
            this.start()
        }

        //properties
        get ammo(): objects.Bullet[] {
            return this._ammunition
        }

        //public methods
        public start(): void {
            this._init()
        }
        public update(): void {
            this._renderNewPosition()
        }
        public onKeyDown(evt): void {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = true
                    break
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = true
                    break
                case config.Controls.SPACE_KEY:
                    spaceKeyDown = true
                    break
                case config.Controls.Q:
                    qDown = true
                    break;
                case config.Controls.W:
                    wDown = true
                    break;
                case config.Controls.T:
                    tDown = true
                    break;
            }
        }
        public onKeyUp(evt): void {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = false
                    break
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = false
                    break
                case config.Controls.SPACE_KEY:
                    spaceKeyDown = false
                    break
                case config.Controls.Q:
                    qDown = false
                    break;
                case config.Controls.W:
                    wDown = false
                    break;
                case config.Controls.T:
                    tDown = false
                    break;
            }
        }

        public shootBullet(newBullet: objects.Bullet): void {
            this._ammunition.push(newBullet)
        }

        //private methods
        private _renderNewPosition(): void {
            if (leftKeyDown) {
                //check prevents player from moving outside of left wall
                this.x = (this.x - 10 < 413) ? 413 : this.x - 10
            }
            else if (rightKeyDown) {
                //ensures that won't go beyond right wall when moving right
                this.x = (this.x + 10 > 591) ? 591 : this.x + 10
            }
        }
        private _init(): void {
            this._ammunition = []
            //draws the particle launcher using native createjs.Shape methods
            this.graphics.beginFill('#142b5c')
                .beginStroke('#000')
                .drawRect(0, 0, 20, 20)

            //set intiial position to be in the middle bottom of Screen
            this.x = config.Screen.CENTER_X - 10
            this.y = 453
        }
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */