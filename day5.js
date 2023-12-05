import run from "./boilerplate.js";
import { parseInts } from "./utils.js";

run(5, (input) => 
{
    //code goes here
    input = Object.fromEntries(input.split("\r\n\r\n").map(x => x.split(":")));
    for (var key in input)
    {
        input[key] = input[key].trim().split("\r\n").map(list => parseInts(list.split(" ")));
    }
    input.seeds = input.seeds[0];
    console.log({input});

    let soil = {};
    let fertilizer = {};
    let water = {};
    let light = {};
    let temperature =  {};
    let humidity = {};
    let location = {};

    function generateMap(map, destination)
    {
        function handleLine(sourceStart, destinationStart, length)
        {
            for (var i = 0; i < length; i++)
            {
                destination[destinationStart + i] = sourceStart + i;
            }
        }
        map.forEach(line => handleLine(line[0], line[1], line[2]));

        //now fill in the others
        for (var i = 0; i < 100; i++)
        {
            if (!destination[i])
            {
                destination[i] = i;
            }
        }
    }

    generateMap(input["seed-to-soil map"], soil);
    generateMap(input["soil-to-fertilizer map"], fertilizer);
    generateMap(input["fertilizer-to-water map"], water);
    generateMap(input["water-to-light map"], light);
    generateMap(input["light-to-temperature map"], temperature);
    generateMap(input["temperature-to-humidity map"], humidity);
    generateMap(input["humidity-to-location map"], location);

    //console.log({input:input["seed-to-soil map"], soil});
    console.log(input.seeds.map(seed => soil[seed]));
    let locations = input.seeds.map(seed => location[humidity[temperature[light[water[fertilizer[soil[seed]]]]]]]);
    console.log({locations, min: Math.min(...locations)});
});