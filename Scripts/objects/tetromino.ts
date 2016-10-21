/**
 * @file tetromino.ts
 * @author Kevin Ma 
 * @date Oct 20 2016
 * @description Tetromino class represents any tetromino block in the game. All 7 types of tetrominoes will extend this class
 * @version 0.5.0 - implemented square tetromino moving on its own
 */
module objects {
    export abstract class Tetromino extends objects.GameObject {
        //instance variables
        //used for spawning new enemies
        private _dead: boolean

        //used for automating square dynamics
        //block only goes down so dont need yDir
        private _ySpeed: number
        private _xSpeed: number
        private _xDir: number
        private _levelMultiplier: number

        //constructor
        constructor(imageString: string, multiplier: number) {
            super(blastimoesAtlas, imageString, "")
            this._levelMultiplier = multiplier
        }
        //properties
        get levelMultiplier(): number {
            return this._levelMultiplier
        }
        get ySpeed(): number {
            return this._ySpeed
        }
        set ySpeed(y: number) {
            this._ySpeed = y
        }

        get xSpeed(): number {
            return this._xSpeed
        }
        set xSpeed(x: number) {
            this._xSpeed = x
        }
        get xDir(): number {
            return this._xDir
        }
        set xDir(x: number) {
            this._xDir = x
        }
        get dead(): boolean {
            return this._dead
        }
        set dead(d: boolean) {
            this._dead = d
        }

        //public methods
        public start(): void {
            this._intiailize()
        }

        abstract update(): void
        abstract move(): void
        abstract checkCollision(): void

        //These methods randomize the x speed and y speed that block is moving
        public randomizeXSpeed(): void {
            this.xSpeed = (Math.random() * 5) + 1
        }

        public randomizeYSpeed(): void {
            this.ySpeed = (Math.random() * 1) + 0.1
        }

        //private methods
        /**
         * Iniitalizes the values of the tetromino
         * 
         * @private
         * 
         * @memberOf Tetromino
         */
        private _intiailize(): void {
            //center registration point
            this.regX = this.halfWidth
            this.regY = this.halfHeight

            this.dead = false


            //randomized speed everytime the tetromino is spawned
            this.randomizeXSpeed()
            this.randomizeYSpeed()
            this.xDir = 1
        }
    }
}