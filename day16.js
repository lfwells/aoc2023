import run from "./boilerplate.js";
import { sum, parse2D, get2D, mapStr } from "./utils.js";

run(16, (input) => 
{
    //code goes here
    let map = parse2D(input);
    console.log(mapStr(map));

    let energized = [];
    for (var y = 0; y < map.length; y++)
    {
        energized[y] = [];
        for (var x = 0; x < map[0].length; x++)
        {
            energized[y][x] = [];
        }
    }
    console.log(mapStr(energized, (v) => v.length > 0 ? v.length : "."));

    let traverse = (x,y,dx,dy) => {
        if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) return;

        if (energized[y][x].filter(([otherDx,otherDy]) => otherDx==dx && otherDy==dy).length > 0) return;
        energized[y][x].push([dx,dy]);

        //console.clear();
        //clear terminal
        //console.log("\x1Bc");
        //console.log(mapStr(energized, (v) => v.length > 0 ? v.length : "."));

        let val = get2D(map,x,y);

        let continueInSameDir = false;
        if (val == ".")
            continueInSameDir = true;
        else if (dx != 0 && val == "-")
            continueInSameDir = true;
        else if (dy != 0 && val == "|")
            continueInSameDir = true;
        else if (val == "|")
        {
            traverse(x,y-1,0,-1);
            traverse(x,y+1,0,1);
        }
        else if (val == "-")
        {
            traverse(x-1,y,-1,0);
            traverse(x+1,y,1,0);
        }
        else if (val == "\\")
        {
            if (dx > 0)
                traverse(x,y+1,0,1);
            else if (dx < 0)
                traverse(x,y-1,0,-1);
            else if (dy > 0)
                traverse(x+1,y,1,0);
            else if (dy < 0)
                traverse(x-1,y,-1,0);
        }
        else if (val == "/")
        {
            if (dx > 0)
                traverse(x,y-1,0,-1);
            else if (dx < 0)
                traverse(x,y+1,0,1);
            else if (dy > 0)
                traverse(x-1,y,-1,0);
            else if (dy < 0)
                traverse(x+1,y,1,0);
        }

        if (continueInSameDir)
        {
            traverse(x+dx,y+dy,dx,dy);
        }
    };
    traverse(0,0,1,0);
    console.log(mapStr(energized, (v,x,y) => get2D(map,x,y) != "." ? get2D(map,x,y) : v.length > 0 ? v.length : "."));

    let count = sum(energized.map((row) => row.filter(v => v.length > 0).length));
    console.log({part1:count});
});