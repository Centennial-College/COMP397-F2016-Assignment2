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

            //all tetrominoes have default speed
            this._speed = 60
        }
        public update(): void { }

        public moveDown(): void {
            this.y = this.y + config.Game.BLOCKSIZE
        }
        public moveRight(): void {

        }
        public moveLeft(): void {
            console.log('moving left');

        }

        public rotate(): void { }

        //private methods
    }
}