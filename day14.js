import run from "./boilerplate.js";
import { mapStr, parse2D, sum } from "./utils.js";

run(14, (input) => 
{
    const ROCK = "O";
    const IMMOVABLE_ROCK = "#";

    //code goes here
    let map = parse2D(input);
    console.log({map});

    let itrNorth = (map) => {
        let rocks = [];
        for (var y = 0; y < map.length; y++)
        {
            for (var x = 0; x < map[y].length; x++)
            {
                if (map[y][x] == ROCK)
                {
                    rocks.push({x, y});
                }
            }
        }
        return rocks;
    }
    let itrSouth = (map) => {
        let rocks = [];
        for (var y = map.length-1; y >= 0; y--)
        {
            for (var x = 0; x < map[y].length; x++)
            {
                if (map[y][x] == ROCK)
                {
                    rocks.push({x, y});
                }
            }
        }
        return rocks;
    }
    let itrWest = (map) => {
        let rocks = [];
        for (var y = 0; y < map.length; y++)
        {
            for (var x = 0; x < map[y].length; x++)
            {
                if (map[y][x] == ROCK)
                {
                    rocks.push({x, y});
                }
            }
        }
        return rocks;
    }
    let itrEast = (map) => {
        let rocks = [];
        for (var y = 0; y < map.length; y++)
        {
            for (var x = map[y].length-1; x >= 0; x--)
            {
                if (map[y][x] == ROCK)
                {
                    rocks.push({x, y});
                }
            }
        }
        return rocks;
    }

    let NORTH = {x: 0, y: -1};
    let SOUTH = {x: 0, y: 1};
    let WEST = {x: -1, y: 0};
    let EAST = {x: 1, y: 0};

    let move = (map, rock, dir) =>
    {
        let newPos = {x: rock.x + dir.x, y: rock.y + dir.y};
        if (newPos.x < 0 || newPos.x >= map[0].length || newPos.y < 0 || newPos.y >= map.length)
        {
            return false;
        }
        if (map[newPos.y][newPos.x] == ROCK)
        {
            return false;
        }
        if (map[newPos.y][newPos.x] == IMMOVABLE_ROCK)
        {
            return false;
        }
        map[newPos.y][newPos.x] = ROCK;
        map[rock.y][rock.x] = ".";
        return newPos;
    }

    for (var rockPos of itrNorth(map))
    {
        let newPos = rockPos;
        do{
            newPos = move(map, newPos, NORTH);
        }
        while (newPos !== false);
    }
    
    console.log("\n");
    console.log(mapStr(map));

    let height = map.length;
    let rowValues = map.map((row, y) => sum(row.map(c => c == ROCK ? height-y : 0)));
    console.log({part1:sum(rowValues)});
});