/**
 * @file bullet.ts
 * @author Kevin Ma 
 * @date: Oct 20 2016
 * @description: Bullet class is used to manage the attributes and behavior of bullets fired from the particle launcher (Player)
 * @version 0.10.0 - added bullet class to the build
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module objects {
    export class Bullet extends createjs.Shape {

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super()
            this.start()
        }

        //public methods
        public start(): void {
            
        }
        public update(): void {

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