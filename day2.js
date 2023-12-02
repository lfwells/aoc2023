import run from "./boilerplate.js";
import { sum } from "./utils.js";

let limits = {
    "red": 12,
    "green": 13,
    "blue": 14
}

run(2, (input) => 
{
    //code goes here
    let lines = input.split("\r\n");
    let games = {};
    for (var line of lines)
    {
        let [game, actions] = line.split(": ");
        game = game.replace("Game ", "");

        actions = actions.split("; ").map(a => a.split(", ").map(b => b.split(" ")));
        games[game] = actions;
    }
    //console.log({game:JSON.stringify(games[1])});

    let valid = Object.entries(games).map(([game, sets]) => {
        let valid = true;
        for (var actions of sets)
        {
            for (var action of actions)
            {
                let [number, color] = action;
                //console.log({game, color, number});
                if (limits[color] < number) valid = false;
            }
        }
        return [game, valid];
    });
    //console.log({valid});

    let sums = valid.filter(v => v[1]);
    let s = sum(sums.map(v => parseInt(v[0])));
    console.log({s});
   
    //part 2
    let maxes = Object.values(games).map(sets =>
    {
        let max = {};
        for (var actions of sets)
        {
            for (var action of actions)
            {
                let [number, color] = action;
                number = parseInt(number);
                if (max[color] == null || max[color] < number) max[color] = number;
            }
        }
        return max;
    });
    console.log({maxes});

    let powers = maxes.map(colours => Object.values(colours).reduce((a,b) => a*b));
    console.log({powers, s: sum(powers)});
});