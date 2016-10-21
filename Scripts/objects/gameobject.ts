/**
 * @file gameobject.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @studentID 300867968
 * @date Oct 18 2016
 * @description GameObject class represents any game object in the game. 
 * @version 0.3.0
 */
module objects {
    export abstract class GameObject extends createjs.Sprite {
        // INSTANCE VARIABLES
        private _width: number;
        private _height: number;
        private _name: string;
        private _position: Vector2;

        // PUBLIC PROPERTIES
        get halfWidth(): number {
            return this.width / 2
        }

        get halfHeight(): number {
            return this.height / 2
        }

        get width(): number {
            return this._width
        }

        set width(w: number) {
            this._width = w;
        }

        get height(): number {
            return this._height
        }

        set height(h: number) {
            this._height = h;
        }

        get name(): string {
            return this._name;
        }

        set name(s: string) {
            this._name = s;
        }

        get position(): Vector2 {
            return this._position
        }

        set position(p: Vector2) {
            this._position = p;
        }

        constructor(atlas: createjs.SpriteSheet, imageString: string, public deathAnimString: string) {
            super(atlas, imageString);

            this._initialize(imageString);
            this.start();
        }

        private _initialize(imageString: string): void {
            this.name = imageString;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.position = new Vector2(this.x, this.y);
        }

        public start(): void { }
        public update(): void { }
    }
}