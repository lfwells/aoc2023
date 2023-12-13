import run from "./boilerplate.js";
import {sum} from "./utils.js"

run(12, (input) => 
{
    let regex = /#+/g;
    function getMatches(line)
    {
        return line.match(regex)?.map(match => match.length) ?? [];
    }
    function lineMatchesSizes(lava, sizes)
    {
        //check array elements match
        let matches = getMatches(lava);
        return matches.length == sizes.length && matches.every((match, index) => match == sizes[index]);
    }
    function swapChar(lava, index, char)
    {
        return lava.substr(0, index) + char + lava.substr(index+1);
    }

    //code goes heres
    let lines = input.split("\n").map(line => line.split(" ")).map(([lava,sizes]) => ({lava,sizes:sizes.split(",").map(size => parseInt(size))}));
    let result = lines.map(line => {
        //regex to find posiitions of ?
        let regexWildcard = /\?/g;
        //use regex to find the positions of the wildcards
        let wildcardPositions = [];
        let match;
        while ((match = regexWildcard.exec(line.lava)) != null)
        {
            wildcardPositions.push(match.index);
        }

        let wildcardCount = wildcardPositions.length;
        //make a set of permutations of 0 and 1 of length wildcardCount
        let permutations = [];
        for (let i = 0; i < Math.pow(2, wildcardCount); i++)
        {
            let binary = i.toString(2).padStart(wildcardCount, "0");
            permutations.push(binary.split("").map(b => b=="0"?"#":"."));
        }

        let matches = permutations.map(p => {
            let possibleLine = line.lava;
            for (var i = 0; i < p.length; i++)
            {
                possibleLine = swapChar(possibleLine, wildcardPositions[i], p[i]);
            }
            return lineMatchesSizes(possibleLine,line.sizes);
        });
        return matches.filter(m => m).length;
    });
    console.log({result, part1:sum(result)});
});