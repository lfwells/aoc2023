import run from "./boilerplate.js";

run(7, (input) => 
{
    //code goes here
    
    function rankKinds(hand, withJoker) {
        let k = {}; //a bucket for each card type
        hand.forEach(c => {
            k[c] = (k[c] || 0)+1; 
        });
    
        let j = 0; //may or may not add amt of Joker cards
    
        if ( withJoker ) {
            j = k["J"] || 0;
            if ( j ) delete k["J"]; //discard Joker bucket
            if ( j === 5 ) return 9; //edge case of JJJJJ, why 9 see below
        }
    
        let n = Object.keys(k).length; //amt of buckets, lower=>higher rank
        let max = +Object.values(k).sort().pop() + j; /*AAAKT and AAKKT have the same number of buckets, size of biggest buckets allows to differentiate. Joker adds to the biggest bucket*/
    
        return (5-n)+max; //inverse n as lower is better, and add max to differentiate between rank, see table below
    
        /*
            Hand  (5-n)+max
            AAAAA 4+5 = 9 -> Five of a kind AAAAA
            AAAA1 3+4 = 7 -> Four of a kind AAAA1
            AAA11 3+3 = 6 -> Full house AAA11
            AAAK1 2+3 = 5 -> Three of a kind AAAK1
            AAKK1 2+2 = 4 -> Two pair AAKK1
            AAK12 1+2 = 3 -> One Pair AAK12
            AK123 0+1 = 1 -> High card AK123
        */
    }
    
    function getCardOrder(withJoker) {
        let co = {};
        [
            ["2","3","4","5","6","7","8","9","T","J","Q","K","A"],
            ["J","2","3","4","5","6","7","8","9","T","Q","K","A"]
        ][withJoker ? 1 : 0].forEach((o,i) => { co[o] = i });
        return co;
    }
    
    
    function sortAndSumCards(input, withJoker) {
        let co = getCardOrder(withJoker); //prepare the order value map
    
        //Transform line "AT777 727" to [ [ 'A', 'T', '7', '7', '7' ], 727 ]
        let si = input.split("\n")
                      .map(o=>o.split(" ")
                      .map((o,i)=>i === 0 ? o.split("") : +o)); 
    
        //to reduce runtime, precalculate ranking:
        for ( let i = 0; i < si.length; ++i ) {
            si[i].push(rankKinds(si[i][0], withJoker)); 
        }
    
        let ssi = si.sort((a,b) => {
            if ( a[2] > b[2] ) return 1; //check precalculated ranking
            if ( a[2] < b[2] ) return -1;
            // Rank made no difference, compare individual cards
            for ( let i = 0; i < 5; ++i ) { 
                if ( co[a[0][i]] > co[b[0][i]] ) return 1; 
                if ( co[a[0][i]] < co[b[0][i]] ) return -1; 
            }
            return 0;
        })
    
        return si.reduce((v,o,i) => v+o[1]*(i+1), 0); //multiply bid by rank
    }
    
        console.log(`Part 1: ${sortAndSumCards(input, false)}`);
        console.log(`Part 2: ${sortAndSumCards(input, true)}`);
    
});