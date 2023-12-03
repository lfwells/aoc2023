import run from "./boilerplate.js";
import {sum} from "./utils.js";

run(3, (input) => 
{
    //code goes here
    let map = input.split("\r\n").map(x => x.split(""));
    let width = map[0].length;
    let height = map.length;

    let numberPattern = /\d+/g;
    let notANumberPattern = /\D+/g;

    let numbers = input.split("\n").map((line, y) => {
        let indices = [];
        let result;
        while ( (result = numberPattern.exec(line)) ) {
            let x = result.index;
            let number = parseInt(result[0]);
            let length = result[0].length;
            indices[[x,y]] = {number, length, x, y};
        }
        return indices;
    });
    numbers = numbers.reduce((a,b) => ({...a, ...b}), {});

    function isSymbol(x) {
        return x.match(notANumberPattern) && x != "." && !x.match(numberPattern);
    }

    let gears = {};

    let neighbours = Object.entries(numbers).map((number) => {
        let startPos = number[0];
        number = number[1];
        let [x, y] = startPos.split(",").map(x => parseInt(x));
        let neighbours = [];
        neighbours.push([x-1, y-1]);
        neighbours.push([x-1, y]);
        neighbours.push([x-1, y+1]);
        for (var i = 0; i < number.length; i++) {
            neighbours.push([x+i, y-1]);
            neighbours.push([x+i, y+1]);
        }
        neighbours.push([x+number.length, y-1]);
        neighbours.push([x+number.length, y]);
        neighbours.push([x+number.length, y+1]);
        //remove any where the x and y are outside teh bounds
        neighbours = neighbours.filter(([x,y]) => x >= 0 && x < width && y >= 0 && y < height);
        neighbours = neighbours.map(([x,y]) => [x,y,map[y][x]]);

        //find gears
        let gearLocation = neighbours.filter(x => x[2] == "*").map(v => [v[0],v[1]]);
        if (gearLocation != "")
        {
            if (gears[gearLocation] == undefined) { gears[gearLocation] = []; }
            gears[gearLocation].push(number.number);
        }

        let justValues = neighbours.map(x => x[2]);
        return [number.number, justValues.some(isSymbol), justValues.filter(isSymbol).join("")];
    });

    gears = Object.values(gears).filter(g => g.length == 2);

    console.log({numbers, gears});

    let s = sum(neighbours.filter(x => x[1] == true).map(x => x[0]));
    console.log({s});

    let ratio = sum(gears.map(g=> g[0]*g[1]));
    console.log({ratio});
    
});