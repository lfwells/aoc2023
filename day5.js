import run from "./boilerplate.js";
import { parseInts } from "./utils.js";

run(5, (input) => 
{
    //code goes here
    input = Object.fromEntries(input.split("\r\n\r\n").map(x => x.split(":")));
    for (var key in input)
    {
        input[key] = input[key].trim().split("\r\n").map(list => parseInts(list.split(" ")));
        if (key != "seeds")
        {
            input[key] = input[key].map(s => ({ start: s[1], end: s[1]+s[2], diff: s[1]-s[0] }));
        }
    }
    input.seeds = input.seeds[0];

    function traverse(n, map)
    {
        map = input[map];
        for (var mapItem of map)
        {
            if (n >= mapItem.start && n < mapItem.end)
            {
                n -= mapItem.diff;
                return n;
            }
        }
        return n;
    }

    let memo = {};
    
    function seedToLocation(seed)
    {
        //if (memo[seed] != undefined) return memo[seed];
        
        var r = traverse(
                    traverse(
                        traverse(
                            traverse(
                                traverse(
                                        traverse(
                                            traverse(
                                                seed, 
                                            "seed-to-soil map"),
                                        "soil-to-fertilizer map"),
                                    "fertilizer-to-water map"),
                                "water-to-light map"),
                            "light-to-temperature map"),
                        "temperature-to-humidity map"),
                    "humidity-to-location map"
                );
        //memo[seed] = r;
        return r;
    }

    let locations = input.seeds.map(seedToLocation);
    console.log(Math.min(...locations));

    //part 2
    let seeds = input.seeds;
    let allSeeds = [];
    let lowestSeed = [];
    for (var i = 0; i < seeds.length; i+=2)
    {
        console.log({i});
        lowestSeed[i] = Number.MAX_SAFE_INTEGER;
        for (var s = seeds[i]; s < seeds[i]+seeds[i+1]; s++)
        {
            let value = seedToLocation(s);
            //console.log({value, s});
            lowestSeed[i] = Math.min(lowestSeed[i], value);
        }
        
        console.log({i,lowest:lowestSeed[i]});
    }
    lowestSeed = lowestSeed.filter(x => x != undefined);
    console.log(Math.min(...lowestSeed));
});