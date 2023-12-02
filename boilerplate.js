import * as fs from 'fs';

export default function run(day, f)
{
    var runNumber = recordRun(day);
    console.log(`--- Day ${day} (Run #${runNumber}) ---`);
    var startTime = process.hrtime();

    const input = fs.readFileSync(`day${day}.input`).toString();
    f(input);
    
    var elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
    console.log(`--- End Day ${day} in ${elapsedSeconds} seconds (Run #${runNumber}) ---`);
    recordRunTime(day, runNumber, elapsedSeconds);
}


function parseHrtimeToSeconds(hrtime) {
    var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
}

function recordRun(day)
{
    //load a json from the stats file
    let stats = loadStats();

    //add a run to the json
    let runNumber = (stats.runs?.filter(r => r.day == day)?.length ?? 0) + 1;
    let run = {day: day, runNumber, time: 0, date: new Date()};
    if (stats.runs == null) stats.runs = [];
    stats.runs.push(run);

    //save the json back to the stats file
    saveStats(stats);

    //return the number of times this day has been run
    return runNumber;

}
function recordRunTime(day, runNumber, time)
{
    //load a json from the stats file
    let stats = loadStats();

    //find the run for this day and add a field for time
    let run = stats.runs?.find(r => r.day == day && r.runNumber == runNumber);
    
    //set the run time
    run.time = time;

    //save
    saveStats(stats);
}

const STATS_FILE = "stats.json";
export function loadStats() {
    if (!fs.existsSync(STATS_FILE)) {
        fs.writeFileSync(STATS_FILE, JSON.stringify({ runs: [] }));
    }
    
    var statsRaw = fs.readFileSync(STATS_FILE).toString();
    var stats = JSON.parse(statsRaw);
    return stats;
}

export function saveStats(stats) {   
    let statsRaw = JSON.stringify(stats);
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats));
}