/**
 * @file tetromino.ts
 * @author Kevin Ma 
 * @date Oct 18 2016
 * @description Tetromino class represents any tetromino block in the game 
 * @version 0.3.0
 */
module objects {
    export abstract class Tetromino extends objects.GameObject {
        //instance variables
        private _speed: number
        private _rotationSide: number

        //constructor
        constructor(imageString: string) {
            super(tetrominoAtlas, imageString, "")
        }
        //properties
        get speed(): number {
            return this._speed
        }

        //public methods
        public start(): void {
            //center registration point
            this.regX = this.halfWidth
            this.regY = this.halfHeight

            //start square in middle (columns 5 and 6)
            this.x = 513
            this.y = 75

            //all tetrominoes have default speed
            this._speed = 1
        }
        public update(): void { }

        //private methods
    }
}