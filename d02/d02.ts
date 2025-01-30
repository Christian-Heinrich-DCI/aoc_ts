// import input from "./testinput.txt";
// import input from "./testinput2.txt";
import input from "./input.txt";

// will store index of safe reports - would probably not need this, but good for debugging
const safe: number[] = [];

// will store index of safe reports - would probably not need this, but good for debugging
let unsafe: number[] = [];

// create an array from the text-input
// each line (report) is a new element
const reports: string[] = input.split("\n");
console.log(reports);

// ---------- Requirements ----------
// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.

// ---------- Thoughts / Ideas ----------
// Idea: Math.abs(a - b) >= 1 && ... <=3

reports.forEach((reportString: string, reportIndex) => {
    // const report : number[] = reportString.split(" ");
    const report: string[] = reportString.split(" ");
    const changes: number[] = [];

    // comparison current with next number
    for (let i: number = 0; i < report.length - 1; i++) {
        const a: number = Number(report[i]);
        const b: number = Number(report[i + 1]);
        const diff: number = b - a;
        changes.push(diff);

        // test if change level is out of bounds

        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            console.log("difference out of bounds - index:", reportIndex, "diff: ", diff);
            unsafe.push(reportIndex);
            return;
        }

        // test if current change follows the pattern of
        // last change (increasing/decreasing)
        if ((i > 0) && ((changes[i - 1] > 0 && changes[i] < 0) || (changes[i - 1] < 0 && changes[i] > 0))) {
            console.log("direction changed!", changes[i - 1], changes[i]);
            unsafe.push(reportIndex);
            return;
        }
    }
    // end of for loop

    safe.push(reportIndex);
});

console.log("safe: ", safe.length, "unsafe: ", unsafe.length);