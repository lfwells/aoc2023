import run from "./boilerplate.js";
import { lcmArray } from "./utils.js";

run(8, (input) => 
{
    //code goes here
    let [turns, map] = input.split("\r\n\r\n");
    turns = turns.split("");
    map = map.split("\r\n").map(row => Object.fromEntries([row.split(" = ").map(v => v.replace("(", "").replace(")", "").split(", "))]));
    let map2 = {};
    for(let value of map) //don't @ me
    {
        let key = Object.keys(value)[0];
        let arr = Object.values(value)[0];
        let v = { "L": arr[0], "R": arr[1] };
        map2[key] = v;
    }
    
    /*
    let current = "AAA";
    let path = [];
    while (current != "ZZZ")
    {
        let instruction = turns[path.length % turns.length];
        let next = map2[current][instruction];
        path.push(next);
        current = next;
    }
    console.log({path, part1: path.length});
*/
    //part 2 
    let all = Object.keys(map2).filter(k => k[2] == "A");
    const allOnZ = function () { return all.every(k => k[2] == "Z"); }

    //brute force (Doesn't finish)
    /*
    let path2 = 0;
    while (allOnZ() == false)
    {
        let instruction = turns[path2 % turns.length];
        for (let key in all)
        {
            let current = all[key];
            //console.log({current, key, all});
            let next = map2[current][instruction];
            all[key] = next;
        }
        path2++;
        if (path2 % 10000 == 0) console.log({all, path2});
    }
    console.log({all, path2});
    */
   let allLengths = all.map(current => {
    let path = [];
    while (current[2] != "Z")
    {
        let instruction = turns[path.length % turns.length];
        let next = map2[current][instruction];
        path.push(next);
        current = next;
    }
    return path.length;
   });

   //find lowest common multiple of allLengths
   
   console.log({allLengths, lcm:lcmArray(allLengths)});
    
});