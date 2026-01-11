import type {AABB} from "../collision/types";
import Tree1 from "../assets/Trees1.png"
import Tree2 from "../assets/Trees2.png"

export interface Tree extends AABB {
    sprite: string;
}

export const TREES: Tree[] =[
    {
        x: 1644,
        y: 768,
        width: 339,
        height: 457,
        sprite: Tree1,   
    },
    {
        x: 1330,
        y: 621,
        width: 325,
        height: 377,
        sprite: Tree2,  
         
    },
    {
        x: 220,
        y: 921,
        width: 315,
        height: 377,
        sprite: Tree2,  
         
    },
];