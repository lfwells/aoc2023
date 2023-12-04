import run from "./boilerplate.js";
import { parseInts, sum } from "./utils.js";

run(4, (input) => 
{
    //code goes here
    var games = input.split("\r\n").map(game => game.split(": ")[1]).map(game => game.split(" | ").map(card => parseInts(card.split(" ").filter(number => number != ""))));
    console.log(games[0]);

    let numbersWon = games.map(game => game[1].map(ourNumber => game[0].includes(ourNumber)).filter(ourNumber => ourNumber == true).length);
    console.log({numbersWon});

    let scores = numbersWon.map(count => {
        return count == 0 ? 0 : Math.pow(2, count-1);
    });
    console.log({s:sum(scores)});
});