import * as fs from 'fs';

export default function run(day, f)
{
    console.log(`--- Day ${day} ---`);
    var startTime = process.hrtime();

    const input = fs.readFileSync("day1.input").toString();
    f(input);
    for (var i = 0; i < 1000; i++) console.log("haha");
    
    var elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
    console.log(`--- End Day ${day} in ${elapsedSeconds} seconds---`);
}


function parseHrtimeToSeconds(hrtime) {
    var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
}

function recordRunTime(day, time)
{

}