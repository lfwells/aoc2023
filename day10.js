import run from "./boilerplate.js";

//run with node --stack-size=10000 day10.js

let connections = {
    "|" : [[0,-1], [0,1]],
    "-" : [[-1,0], [1,0]],
    "L" : [[0,-1], [1,0]],
    "J" : [[0,-1], [-1,0]],
    "7" : [[0,1], [-1,0]],
    "F" : [[0,1], [1,0]],
    "." : [],
}
let allNeighbours = [[0,-1], [0,1], [-1,0], [1,0]];

run(10, (input) => 
{
    //code goes here
    let map = input.split("\r\n").map(l => l.split(""));

    let startingPos = map.reduce((acc, row, y) => acc == null ? (row.indexOf("S") != -1 ? [row.indexOf("S"), y] : null) : acc, null);
    console.log({map, startingPos});

    //navigate all neighbours until starting pos is found again
    let visited = new Set();
    const traverse = (x,y,path) =>
    {
        if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) return null;

        let key = `${x},${y}`;
        let pipe = map[y][x];
        //console.log({x,y, pipe, path});
        if (pipe == "S" && path.length > 2) {
        
            return [...path, [x,y]];
        }


        if (visited.has(key)) return null;
        visited.add(key);

        let connection = connections[pipe];
        if (connection == null) connection = allNeighbours;
        for (var i = 0; i < connection.length; i++)
        {
            let result = traverse(x + connection[i][0], y + connection[i][1], [...path, [x,y]]);
            if (result != null)
            {
                //console.log({x,y,pipe,connection,result});
                return result;
            }
        }
        return null;
    }

    let path = traverse(startingPos[0], startingPos[1], []);
    let mid = Math.floor(path.length/2);
    console.log({path, mid});
    return;

    //traverse all starting points neighbours
    let search = allNeighbours.map(n => traverse(startingPos[0] + n[0], startingPos[1] + n[1]));
    console.log({search, path});
});