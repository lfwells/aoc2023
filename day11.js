import run from "./boilerplate.js";

run(11, (input) => 
{
    //code goes here
    let map = input.split("\r\n").map(l => l.split(""));
    let locations = map.reduce((acc, row, y) => row.reduce((acc, cell, x) => cell === "#" ? [...acc, [x, y]] : acc, acc), []);
    //console.log({map, locations});

    //now expand (rows)
    let emptyRows = [];
    for (var y = 0; y < map.length; y++)
    {
        let emptyRow = locations.some(l => l[1] === y) == false;
        if (emptyRow) emptyRows.push(y);
    }
    emptyRows.sort();
    
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
        
    } 

    //now expand (cols)
    let emptyCols = [];
    for (var x = 0; x < map[0].length; x++)
    {
        let emptyCol = locations.some(l => l[0] === x) == false;
        if (emptyCol) emptyCols.push(x);   
    }
    emptyCols.sort();

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
    }

    function mapPos(x,y)
    {
        return locations[x][y] ?? null;
    }
    let visited = new Set();
    let neighbours = [[-1,0],[0,-1],[0,1],[1,0]];
    function traverse(x,y,visited,goal)
    {
        if (visited.has("${x},${y}")) return 0;
        visited.add("${x},${y}");
        console.log(x,y, goal);

        if (x == goal[0] && y == goal[1]) return 1;

        if ( x < 0 || y < 0 || x >= map[0].length || y >= map.length) return 0;
        for (var location of neighbours)
        {
            console.log({location});
            let result = traverse(x+neighbours[location][0],y+neighbours[location][1],visited,goal);
            if (result > 0) return result + 1;
        }
        return 0;
    }

    let start = locations[0];
    let goal = locations[1];
    let t = traverse(start[0],start[1],visited, goal);
    console.log({t});
    console.log({emptyRows, t});
});