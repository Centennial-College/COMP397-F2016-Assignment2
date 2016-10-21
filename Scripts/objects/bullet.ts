/**
 * @file bullet.ts
 * @author Kevin Ma 
 * @date: Oct 20 2016
 * @description: Bullet class is used to manage the attributes and behavior of bullets fired from the particle launcher (Player)
 * @version 0.12.0 - successfully checked collision between bullet and squareTetromino
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module objects {
    export class Bullet extends objects.GameObject {

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(imageString: string, startX: number, startY: number, private _bulletType: number) {
            super(blastimoesAtlas, imageString, "")
            this.x = startX
            this.y = startY
        }

        //public methods
        public start(): void {

        }
        public update(): void {
            this.y -= 5 * this._bulletType
            this.position = new objects.Vector2(this.x, this.y)
        }
        // public move(evt): void {
        //     switch (evt.keyCode) {
        //         case config.Controls.ARROW_KEY_LEFT:
        //             leftKeyDown = true
        //             break
        //         case config.Controls.ARROW_KEY_RIGHT:
        //             rightKeyDown = true
        //             break
        //     }
        // }
        // public stop(evt): void {
        //     switch (evt.keyCode) {
        //         case config.Controls.ARROW_KEY_LEFT:
        //             leftKeyDown = false
        //             break
        //         case config.Controls.ARROW_KEY_RIGHT:
        //             rightKeyDown = false
        //             break
        //     }
        // }

        // //private methods
        // private _renderNewPosition(): void {
        //     if (leftKeyDown) {
        //         //check prevents player from moving outside of left wall
        //         this.x = (this.x - 10 < 413) ? 413 : this.x - 10
        //     }
        //     else if (rightKeyDown) {
        //         //ensures that won't go beyond right wall when moving right
        //         this.x = (this.x + 10 > 591) ? 591 : this.x + 10
        //     }
        // }
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */