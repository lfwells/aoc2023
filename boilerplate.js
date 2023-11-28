import * as fs from 'fs';

export default function run(day, f)
{
    console.log(`--- Day ${day} ---`);
    console.time("run");

    const input = fs.readFileSync("day1.input").toString();
    f(input);

    console.log(`--- End Day ${day} ---`);
    console.timeEnd("run");
}
