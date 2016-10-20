/**
 * @file player.ts
 * @author Kevin Ma 
 * @date: Oct 20 2016
 * @description: Player class is used to manage the particle launcher in the game Blastimoes (behavior and attributes)
 * @version 0.8.0 - created player class
 */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module objects {
    export class Player extends createjs.Shape {

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super()

            //set registration point to middle of Shape
            this.regX = this.getBounds().width / 2
            this.regY = this.getBounds().height / 2

            this.graphics.beginFill('#00f')
                .drawRect(0, 0, 20, 20)

            //set intiial position to be in the middle bottom of Screen
            this.x = config.Screen.CENTER_X
            this.y = 465

        }
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */