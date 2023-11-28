import * as fs from 'fs';

export default function run(day, f)
{
    var runNumber = recordRun(day);
    console.log(`--- Day ${day} (Run #${runNumber}) ---`);
    var startTime = process.hrtime();

    const input = fs.readFileSync("day1.input").toString();
    f(input);
    for (var i = 0; i < 1000; i++) console.log("haha");
    
    var elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
    console.log(`--- End Day ${day} in ${elapsedSeconds} seconds (Run #${runNumber}) ---`);
}


function parseHrtimeToSeconds(hrtime) {
    var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
}

function recordRun(day)
{
    //load a json from the stats file
    if (!fs.existsSync("stats.json")) {
        fs.writeFileSync("stats.json", JSON.stringify({ runs: [] }));
    }
    
    var statsRaw = fs.readFileSync("stats.json").toString();
    var stats = JSON.parse(statsRaw);

    //add a run to the json
    var run = {day: day, time: 0, date: new Date()};
    stats.runs.push(run);

    //save the json back to the stats file
    statsRaw = JSON.stringify(stats);
    fs.writeFileSync("stats.json", statsRaw);

    //return the number of times this day has been run
    return stats.runs.filter(r => r.day == day).length ?? 0;

}
function recordRunTime(day, time)
{

}