import run from "./boilerplate.js";

//251777324

const cardValues = {
    "J":1,//part 2
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "T":10,
    "Q":11,
    "K":12,
    "A":13
}


    const types = {
        1: "high card",
        2: "pair",
        3: "two pair",
        4: "3-of-a-kind",
        5: "full house",
        6: "4-of-a-kind",
        7: "5-of-a-kind",
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
    
    function getTypeWithJoker(cards){
        
        let keys = Object.keys(cards);
        let jokerCount = 0;
        if (cards["1"]) jokerCount = cards["1"];
        keys = keys.filter(x => x != "1");
        
        if (keys.length == 1 || keys.length == 0) return 7; //5-of-a-kind
        if (keys.length == 2) {
            if (jokerCount >= 2)
            {
                return 6; //4-of-a-kind
            }
            if (jokerCount == 1) 
            {
                if (keys.some(x => cards[x] == 3)) return 6; //4-of-a-kind
                return 5; //full house
            }
            if (keys.some(x => cards[x] == 4)) return 6; //4-of-a-kind
            else return 5; //full house
        }
        if (keys.length == 3) {
            if (jokerCount >= 2)
            {
                return 4; //3-of-a-kind
            }
            if (jokerCount == 1) 
            {
                return 3; //two pair
            }
            if (keys.some(x => cards[x] == 3)) return 4; //3-of-a-kind
            else return 3; //two pair
        }
        if (keys.length == 4) {
            return 2; //pair
        }
        return 1; //high card
    }
    
    hands = hands.map(h => ({...h, jokerCount:h.cards["1"] || 0}));
    /*
    //debugging
    hands = hands.filter(h => h.jokerCount == 2 && Object.keys(h.cards).filter(k => k != "1").length == 2).map(h => {
        let {hand,bid,cards} = h;
        return {...h, type: types[getTypeWithJoker(cards)]};
    });
    console.log(hands);
    return; 
    */

    hands = hands.map(h => {
        let {hand,bid,cards} = h;
        return {...h, type: getTypeWithJoker(cards)};
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
    //hands = hands.filter(h => h.jokerCount == 2);
    console.log({h:hands.map(({handString, type, bid, rank}) => ({handString, t:types[type], bid, rank})), step1: Object.values(hands).reduce((acc, {rank, bid}) => acc + rank*bid, 0)});
    
});