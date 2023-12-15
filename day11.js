import run from "./boilerplate.js";
import { parse2D } from "./utils.js";

run(11, (input) => 
{
    //code goes here
    let map = parse2D(input);
    let locations = map.reduce((acc, row, y) => row.reduce((acc, cell, x) => cell === "#" ? [...acc, [x, y]] : acc, acc), []);
    console.log({locations});

    //now expand (rows)
    let emptyRows = [];
    for (var y = 0; y < map.length; y++)
    {
        let emptyRow = locations.some(l => l[1] === y) == false;
        if (emptyRow) emptyRows.push(y);
    }
    emptyRows.sort();
    console.log({emptyRows});
    
    for (let i in emptyRows)
    {
        let mapPlace = emptyRows[i];
        for (let j = 0; j < locations.length; j++)
        {
            if (locations[j][1] > mapPlace)
            {
                locations[j] = [locations[j][0], locations[j][1]+1];
            }
        }
        //also push other emptyRows along
        for (let k = i; k < emptyRows.length; k++)
        {
            emptyRows[k] = emptyRows[k]+1;
        }
        
    } 

    //now expand (cols)
    let emptyCols = [];
    for (var x = 0; x < map[0].length; x++)
    {
        let emptyCol = locations.some(l => l[0] === x) == false;
        if (emptyCol) emptyCols.push(x);   
    }
    emptyCols.sort();
    console.log({emptyCols});

    for (let i in emptyCols)
    {
        let mapPlace = emptyCols[i];
        for (let j = 0; j < locations.length; j++)
        {
            if (locations[j][0] > mapPlace)
            {
                locations[j] = [locations[j][0]+1, locations[j][1]];
            }
        }
        //also push other emptyCols along
        for (let k = i; k < emptyCols.length; k++)
        {
            emptyCols[k] = emptyCols[k]+1;
        }
    }

    let minX = locations.reduce((acc, l) => Math.min(acc, l[0]), Number.MAX_SAFE_INTEGER);
    let minY = locations.reduce((acc, l) => Math.min(acc, l[1]), Number.MAX_SAFE_INTEGER);
    let maxX = locations.reduce((acc, l) => Math.max(acc, l[0]), Number.MIN_SAFE_INTEGER);
    let maxY = locations.reduce((acc, l) => Math.max(acc, l[1]), Number.MIN_SAFE_INTEGER);
    let width = maxX - minX + 1;
    let height = maxY - minY + 1;
    console.log({minX, minY, maxX, maxY, width, height, locations});
    
    
    let total = 0;
    let manhattan = (x1,y1,x2,y2) => Math.abs(x1-x2) + Math.abs(y1-y2);
    for (var i = 0; i < locations.length; i++)
    {
        for (var j = i+1; j < locations.length; j++)
        {
            let start = locations[i];
            let goal = locations[j];
            let t = manhattan(start[0],start[1],goal[0], goal[1]);
            if (i == 2 && j == 5) 
            {
                console.log({start, goal, t});
            }
            total += t;
        }
    }
    console.log({total});
});
//9562515 was too low