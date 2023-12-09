import run from "./boilerplate.js";
import {parseInts, sum } from "./utils.js";
run(9, (input) => 
{
    //code goes here
    let lines = input.split("\r\n").map(l => l.split(" ")).map(l => l.map(i => parseInt(i)));

    function process(a)
    {
        
        console.log({a});
        let allZero = a[0] == 0;
        let newA = [];

        for (var i = 1; i < a.length; i++)
        {
            allZero &= a[i] == 0;
            newA.push(a[i] - a[i - 1]);
        }
        if (allZero)
            return a[a.length - 1];

        return process(newA) + a[a.length - 1];
    }

    let part1 = sum(lines.map(process));
    console.log({part1});

    
    function processPart2(a)
    {
        
        console.log({a});
        let allZero = a[0] == 0;
        let newA = [];

        for (var i = 1; i < a.length; i++)
        {
            allZero &= a[i] == 0;
            newA.push(a[i] - a[i - 1]);
        }
        if (allZero)
        {
            return a[0];
        }

        let r = a[0] - processPart2(newA);
        return r;
    }
    
    let part2 = sum(lines.map(processPart2));
    console.log({part2});

});