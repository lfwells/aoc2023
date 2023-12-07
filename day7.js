import run from "./boilerplate.js";

const cardValues = {
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "T":10,
    "J":11,
    "Q":12,
    "K":13,
    "A":14
}

run(7, (input) => 
{
    //code goes here
    let hands = input.split("\r\n").map(x => x.split(" ")).map(([hand, bid]) => ({hand,bid}));
    hands = hands.map(({hand,bid}) => ({handString:hand, hand:hand.split("").map(c => cardValues[c]), bid:parseInt(bid)}) );

    //count cards
    hands = hands.map((h) => {
        let {hand,bid} = h;
        let cards = {};
        for (let card of hand)
        {
            if(!cards[card]) cards[card] = 0;
            cards[card]++;
        }
        return {...h, cards};
    });

    //determine type (straight, flush, etc)
    function getType(cards)
    {
        let keys = Object.keys(cards);
        if (keys.length == 1) return 7; //5-of-a-kind
        if (keys.length == 2) {
            if (keys.some(x => cards[x] == 4)) return 6; //4-of-a-kind
            else return 5; //full house
        }
        if (keys.length == 3) {
            if (keys.some(x => cards[x] == 3)) return 4; //3-of-a-kind
            else return 3; //two pair
        }
        if (keys.length == 4) return 2; //pair
        return 1; //high card
    }
    hands = hands.map(h => {
        let {hand,bid,cards} = h;
        return {...h, type: getType(cards)};
    });

    //sort by type then cards value in order
    hands = hands.sort((a,b) => {
        if (a.type == b.type) {
            let aKeys = (a.hand);
            let bKeys = (b.hand);
            for (let i = 0; i < aKeys.length; i++)
            {
                //console.log("compared", aKeys[i], bKeys[i], a.handString, b.handString, aKeys, bKeys);
                if (aKeys[i] != bKeys[i]) return aKeys[i] - bKeys[i]; // Reverse the comparison
            }
        }
        return a.type - b.type; // Reverse the comparison
    });

    //include rank in the object
    hands = hands.map((h,i) => ({...h, rank: i+1}));

    console.log({step1: Object.values(hands).reduce((acc, {rank, bid}) => acc + rank*bid, 0)});
    
});