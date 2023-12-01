import run from "./boilerplate.js";
import { parseInts, sum } from "./utils.js";

run(1, (input) => 
{
    //code goes here
    
    let lines = input.split("\n");
    //var numberPattern = /\d|one|two|three|four|five|six|seven|eight|nine/g;
    var numberPatterns = [
        /\d/g,
        /one/g,
        /two/g,
        /three/g,
        /four/g,
        /five/g,
        /six/g,
        /seven/g,
        /eight/g,
        /nine/g,
    ];

    
    function wosrtCode(l)
    {

    //dumb all indicies lookup 
    let allIndicies = {};
    for (var numberPattern of numberPatterns) {
        let indices = [];
        let result;
        while ( (result = numberPattern.exec(l)) ) {
            indices.push(result.index);
        }
        allIndicies[numberPattern] = indices;
    }

    let mins = {}
    let maxs = {}
    for (var i in allIndicies)
    {
        if (allIndicies[i].length == 0) continue;
        mins[i] = allIndicies[i].reduce((a,b) => Math.min(a,b));
        maxs[i] = allIndicies[i].reduce((a,b) => Math.max(a,b));
    }
    //console.log({allIndicies, mins, maxs});

    //find which index of mins contains the smallest value
    let min = Number.MAX_SAFE_INTEGER;
    let minIndex = null;
    for (var i in mins)
    {
        if (mins[i] < min) {
            min = mins[i];
            minIndex = i;
        }
    }

    //find which index of maxs contains the largest value
    let max = Number.MIN_SAFE_INTEGER;
    let maxIndex = null;
    for (var i in maxs)
    {
        if (maxs[i] > max) {
            max = maxs[i];
            maxIndex = i;
        }
    }

    //console.log({min, minIndex, max, maxIndex});

    //get the index in numberPatterns of the min and max
    let minIndexInNumberPatterns = numberPatterns.map(n=>n.toString()).indexOf(minIndex);
    let maxIndexInNumberPatterns = numberPatterns.map(n=>n.toString()).indexOf(maxIndex);
    
    //console.log({minIndexInNumberPatterns, maxIndexInNumberPatterns});
    //if index is zero 
    if (minIndexInNumberPatterns == 0) 
    {
        //regex the line for first digit
        let regex = /\d/g;
        let result = l.match(regex);
        minIndexInNumberPatterns = result[0];
    }
    //same for max
    if (maxIndexInNumberPatterns == 0) 
    {
        //regex the line for a digit
        let regex = /\d/g;
        let result = l.match(regex);
        maxIndexInNumberPatterns = result[result.length-1];
    }

    return minIndexInNumberPatterns.toString()+maxIndexInNumberPatterns.toString();

}
    
    var numbers = lines.map(wosrtCode).map(n=>parseInt(n));
    console.log({numbers});
    
    var s = sum(numbers);
    console.log({s});

    
});