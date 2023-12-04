import run from "./boilerplate.js";
import { parseInts, sum } from "./utils.js";

run(4, (input) => 
{
    //code goes here
    var games = input.split("\r\n").map(game => game.split(": ")[1]).map(game => game.split(" | ").map(card => parseInts(card.split(" ").filter(number => number != ""))));
    console.log(games[0]);
    
    function winCount(game)
    {
        return game[1].map(ourNumber => game[0].includes(ourNumber)).filter(ourNumber => ourNumber == true).length
    }

    let numbersWon = games.map(winCount);
    console.log({numbersWon});

    let scores = numbersWon.map(count => {
        return count == 0 ? 0 : Math.pow(2, count-1);
    });
    console.log({s:sum(scores)});

    //part 2
    let indexedCards = Object.fromEntries(games.map((game, i) => [i+1, game]));
    let cardCounts = Object.fromEntries(games.map((game, i) => [i+1, 1]));
    
    let debug = false;
    let keys = Object.keys(cardCounts);
    for (var i = 0; i < keys.length; i++)
    {
        let cardNumber = parseInt(keys[i]);
        let cardCount = cardCounts[cardNumber];
        let card = indexedCards[cardNumber];
        let count = winCount(card);
        //count = count == 0 ? 0 : Math.pow(2, count-1);
        
        console.log("card", cardNumber, "appears", cardCount, "times");
        for (var c = 0; c < cardCount; c++)
        {
            if (debug) console.log("checking card", cardNumber);
            if (debug) console.log("card", cardNumber, "won", count, "times");

            //now increment the count of the next cards based upon count
            for (var c2 = cardNumber+1; c2 < cardNumber+count+1; c2++)
            {
                if (c2 < keys.length + 1) //<-- this was the check that screwed me, and ironically its not even needed!
                {
                    if (debug) console.log("\tincrementing card", c2);
                    cardCounts[c2]++;
                }
            }
        }
        if (debug && i == 5) break;
    }
    console.log({cardCounts, s:sum(Object.values(cardCounts))});
});