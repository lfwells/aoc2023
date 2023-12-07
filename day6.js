import run from "./boilerplate.js";
import { parseInts } from "./utils.js";

run(6, (input) => 
{
    //code goes here
    input = input.split("\r\n").map(l => parseInts(l.split(" ").filter(i => i != "" && i != undefined).slice(1)));

    console.log({input});
    let races = [];
    for (var index in input[0])
    {
        let time = input[0][index];
        let distance = input[1][index];
        races.push({time, distance});
    }
    console.log({races});

    function simulate(race, charge)
    {
        let movingDuration = race.time - charge;
        let distance = movingDuration * charge;
        return distance;
    }
    function getOptions(race)
    {
        let options = [];
        for (var chargeDuration = 0; chargeDuration < race.time; chargeDuration++)
        {
            var distance = simulate(race, chargeDuration);
            //console.log({chargeDuration, distance});

            //if we beat the record, save it
            if (distance > race.distance) options.push(chargeDuration);
            //lets bail out early to save some time?
            if (options.length > 1 && distance <= race.distance)
            {
                break;
            }
        }
        return options;
    }

    let numberOfOptionsPerRace = races.map(r => getOptions(r).length);

    console.log({part1:numberOfOptionsPerRace.reduce((a, b) => a * b)});

    //part 2
    let oneRace = {time: parseInt(races.reduce((a, b) => a + ""+b.time, "")), distance: parseInt(races.reduce((a, b) => a + ""+b.distance, ""))};
    races = [oneRace];

    console.log({races});

    

    let numberOfOptions = races.map(r => getOptions(r).length);

    console.log({part2:numberOfOptions});
    
});