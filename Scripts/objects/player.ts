/**
 * @file player.ts
 * @author Kevin Ma 
 * @date: Oct 20 2016
 * @description: Player class is used to manage the particle launcher in the game Blastimoes (behavior and attributes)
 * @version 0.11.0 - implemented firing one bullet for player
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module objects {
    export class Player extends createjs.Shape {
        //instance variables
        private _bullet: objects.Bullet[]

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super()
            this.start()
        }

        //properties
        get bullet(): objects.Bullet[] {
            return this._bullet
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
            }
        }

        public shootBullet(newBullet: objects.Bullet): void {
            this._bullet.push(newBullet)
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
            this._bullet = []
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