import run from "./boilerplate.js";
import { parse2D, get2D, match, mapStr } from "./utils.js";
run(13, (input) => 
{
    //code goes here

    let part1 = 0;

    let allMaps = input.split("\n\n").map(map => parse2D(map));
    let reflectionCaches = [];

    let findReflectionWrapper = function(map, idx)
    {
        return findReflection(map, idx, false);
    }
    let findReflectionWrapperPart2 = function(map, idx)
    {
        return findReflection(map, idx, true);
    }
    let findReflection = function(map, idx, part2)
    {
        let ignoreResult = null;
        if (reflectionCaches[idx] != undefined)
        {
            ignoreResult = reflectionCaches[idx];
        }
        let cols = [];
        for (var x = 0; x < map[0].length; x++)
        {
            let c = [];
            for (var y = 0; y < map.length; y++)
            {
                c.push(map[y][x]);
            }
            cols.push(c);
        }
    
        let foundX;
        for (var x = 1; x < cols.length; x++)
        {
            if (match(cols[x-1], cols[x]))
            {
                //console.log("thought we found x ", x);
                //however, now need to check the reflection extends to end
                let found = true;
                for (var i = 1; i < map[0].length; i++)
                {
                    if (x-1-i < 0 || x+i >= cols.length)
                    {
                        break;
                    }
                    if (!match(cols[x-1-i], cols[x+i]))
                    {
                        found = false;
                        break;
                    }
                }

                if (found)
                {
                    console.log({idx, ignoreResult, x});
                    if (ignoreResult != undefined && ignoreResult.x == x) continue;

                    foundX = x;
                    part1 += x;
                    break;
                }
            }
        }
        let foundY;
        if (foundX == undefined)
        {
            for (var y = 1; y < map.length; y++)
            {
                if (match(map[y-1], map[y]))
                {
                    //console.log("thought we found y ", y);
                    //however now need to check refleciton extends to end
                    let found = true;
                    for (var i = 1; i < map.length; i++)
                    {
                        if (y-1-i < 0 || y+i >= map.length)
                        {
                            break;
                        }
                        if (!match(map[y-1-i], map[y+i]))
                        {
                            found = false;
                            break;
                        }
                    }
                    if (found)
                    {
                        console.log({idx, ignoreResult, y});
                        if (ignoreResult != undefined && ignoreResult.y == y) continue;

                        foundY = y;
                        part1 += y * 100;
                        break;
                    }
                }
            }
        }
        let result = {x: foundX, y: foundY};
        if (!part2) reflectionCaches[idx] = result;
        return result;
    }
    allMaps.map(findReflectionWrapper);
    console.log({part1});

    let part2 = 0;
    let tryAllPossible = function(map, idx)
    {
        for (var y = 0; y < map.length; y++)
        {
            for (var x = 0; x < map[y].length; x++)
            {
                if (map[y][x] != "#") continue;
                let mapCopy = JSON.parse(JSON.stringify(map));
                mapCopy[y][x] = ".";

                //console.log(mapStr(mapCopy));
                let result = findReflectionWrapperPart2(mapCopy, idx, true);
                //console.log({result, reflectionCaches});
                if (result.x != undefined && result.x != reflectionCaches[idx].x)
                {
                    //console.log("increaed part 2 by", result.x);
                    part2 += result.x;
                    return;
                }
                else if (result.y != undefined && result.y != reflectionCaches[idx].y)
                {
                    //console.log("increaed part 2 by", result.y*100);
                    part2 += result.y * 100;
                    return;
                }
            }
        }
        part2 += reflectionCaches[idx];
    }
    allMaps.map(tryAllPossible);
    console.log({part2});
});