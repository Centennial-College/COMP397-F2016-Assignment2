/**
 * @file tetromino.ts
 * @author Kevin Ma 
 * @date Oct 20 2016
 * @description Tetromino class represents any tetromino block in the game. All 7 types of tetrominoes will extend this class
 * @version 0.16.1- square randomly spawns going right or left
 */
module objects {
    export abstract class Tetromino extends objects.GameObject {
        //instance variables
        //used for spawning new enemies
        private _isDead: boolean
        private _isReadyToSpawn: boolean
        private _isFinished: boolean

        //used for automating square dynamics
        //block only goes down so dont need yDir
        private _ySpeed: number
        private _xSpeed: number
        private _xDir: number
        private _levelMultiplier: number

        //constructor
        constructor(imageString: string, multiplier: number) {
            super(blastimoesAtlas, imageString, "explosion")
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
        get isDead(): boolean {
            return this._isDead
        }
        set isDead(d: boolean) {
            this._isDead = d
        }

        get isReadyToSpawn(): boolean {
            return this._isReadyToSpawn
        }
        set isReadyToSpawn(r: boolean) {
            this._isReadyToSpawn = r
        }
        get isFinished(): boolean {
            return this._isFinished
        }
        set isFinished(f: boolean) {
            this._isFinished = f
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
            this.xSpeed = (Math.random() * 2) + 1
        }

        public randomizeYSpeed(): void {
            this.ySpeed = (Math.random() * 3) + 1
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

            this.isDead = false
            this.isReadyToSpawn = true
            this.isFinished = false

            //randomized speed everytime the tetromino is spawned
            this.randomizeXSpeed()
            this.randomizeYSpeed()
            // 50% chance initial dir is left, 50% chance right
            this.xDir = Math.random() > 0.5 ? 1 : -1
        }
    }
}