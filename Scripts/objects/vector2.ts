/**
 * @file vector2.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @studentID 300867968
 * @date Oct 18 2016
 * @description Vector2 class extends the createjs native Point class to represent a vector in two dimensional space.
 * @version 0.1.0
 */

module objects {
    export class Vector2 extends createjs.Point {
        constructor(x: number = 0, y: number = 0) {
            super(x, y);
        }


        // Standard distance formula between 2 points
        public static distance(a: Vector2, b: Vector2): number {
            return Math.sqrt(Math.pow((b.x - a.x), 2 + Math.pow((b.y - a.y), 2)));
        }
    }
}