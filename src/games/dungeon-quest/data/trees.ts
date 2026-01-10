import type {AABB} from "../collision/types";
import Tree1 from "../assets/Trees1.png"
import Tree2 from "../assets/Trees2.png"

export interface Tree extends AABB {
    sprite: string;
}

export const TREES: Tree[] =[
    {
        x: 194,
        y: 1368,
        width: 339,
        height: 457,
        sprite: Tree1,   
    },
    {
        x: 480,
        y: 1368,
        width: 385,
        height: 457,
        sprite: Tree2,   
    },
];