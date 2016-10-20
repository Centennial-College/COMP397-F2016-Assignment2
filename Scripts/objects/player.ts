/**
 * @file player.ts
 * @author Kevin Ma 
 * @date: Oct 20 2016
 * @description: Player class is used to manage the particle launcher in the game Blastimoes (behavior and attributes)
 * @version 0.9.0 - implemented move functionality for player
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module objects {
    export class Player extends createjs.Shape {

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super()
            this.start()
        }

        //public methods
        public start(): void {
            this.graphics.beginFill('#142b5c')
                .beginStroke('#000')
                .drawRect(0, 0, 20, 20)

            //set intiial position to be in the middle bottom of Screen
            this.x = config.Screen.CENTER_X - 10
            this.y = 453
        }
        public update(): void {
            this._renderNewPosition()
        }
        public move(evt): void {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = true
                    break
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = true
                    break
            }
        }
        public stop(evt): void {
            switch (evt.keyCode) {
                case config.Controls.ARROW_KEY_LEFT:
                    leftKeyDown = false
                    break
                case config.Controls.ARROW_KEY_RIGHT:
                    rightKeyDown = false
                    break
            }
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
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */