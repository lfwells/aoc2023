//usage: node stats.js <day>

import { loadStats } from "./boilerplate.js";

//get a parameter from the cli of which day to display stats
var day = process.argv[2];
if(!day)
{
    console.log("Please provide a day to display stats for.");
    //end the process
    process.exit(1);
}

//load the stats
let stats = loadStats();

//get the stats for the day
let dayStats = stats.runs?.filter(r => r.day == day);

//if no stats for this day, end the process with message
if(!dayStats || dayStats.length == 0)
{
    console.log(`No stats for day ${day}.`);
    //end the process
    process.exit(1);
}

//display the stats
console.log(`Stats for day ${day}:`);
console.log(`\tRuns: ${dayStats?.length ?? 0}`);
console.log(`\tFastest: ${dayStats?.reduce((acc, cur) => acc.time < cur.time ? acc : cur)?.time ?? 0} seconds`);
console.log(`\tSlowest: ${dayStats?.reduce((acc, cur) => acc.time > cur.time ? acc : cur)?.time ?? 0} seconds`);
console.log(`\tAverage: ${dayStats?.reduce((acc, cur) => acc + cur.time, 0) / (dayStats?.length ?? 0)} seconds`);
console.log(`\tTotal: ${dayStats?.reduce((acc, cur) => acc + cur.time, 0)} seconds`);
console.log(`\tLast Run: ${dayStats?.reduce((acc, cur) => acc.date > cur.date ? acc : cur)?.date ?? 0}`);