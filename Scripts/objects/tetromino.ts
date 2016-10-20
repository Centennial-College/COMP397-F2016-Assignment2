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
        private _dropSpeed: number
        private _arrowControlSpeed: number
        private _rotationSide: number
        private _dead: boolean
        private _canMove: boolean

        //constructor
        constructor(imageString: string) {
            super(tetrominoAtlas, imageString, "")
            this.dead = false
        }
        //properties
        get dropSpeed(): number {
            return this._dropSpeed
        }
        get arrowControlSpeed(): number {
            return this._arrowControlSpeed
        }
        get dead(): boolean {
            return this._dead
        }
        set dead(d: boolean) {
            this._dead = d
        }

        //public methods
        public start(): void {
            //center registration point
            this.regX = this.halfWidth
            this.regY = this.halfHeight

            //all tetrominoes have default speed
            this._dropSpeed = 60
            this._arrowControlSpeed = 15
        }
        public update(): void { }

        public move(keyPressed: number): void {
            switch (keyPressed) {
                case config.Controls.ARROW_KEY_LEFT:
                    this.moveLeft()
                    break;
                case config.Controls.ARROW_KEY_RIGHT:
                    this.moveLeft()
                    break;
                case config.Controls.ARROW_KEY_DOWN:
                    this.hardDrop()
                    break
                case config.Controls.SPACE_KEY:
                    this.moveDown()
                    break;
            }
            this.checkCollision(keyPressed)
        }

        public moveDown(): void {
            this.y = this.y + config.Game.BLOCKSIZE
            this.checkCollision(config.Controls.ARROW_KEY_DOWN)
        }
        public moveRight(): void {
            this.x += config.Game.BLOCKSIZE
            this.checkCollision(config.Controls.ARROW_KEY_RIGHT)
        }
        public moveLeft(): void {
            // console.log('moving left');
            this.x -= config.Game.BLOCKSIZE
            this.checkCollision(config.Controls.ARROW_KEY_LEFT)
        }

        public hardDrop(): void {
            this.y = this.y + 600
            this.checkCollision(config.Controls.ARROW_KEY_DOWN)
        }

        public rotate(): void {
            this.rotation = 90
        }

        public abstract checkCollision(keyPressed: number): void
        //private methods
    }
}