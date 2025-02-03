// import input from "./testinput.txt";
// import input from "./testinput2.txt";
import input from "./input.txt";

let safe: number = 0;
let unsafe: number = 0;

// create an array from the text-input
// each line (report) is a new element
const reports: string[] = input.split("\n");

reports.forEach((reportString: string, reportIndex: number) => {
    let report: string[] = reportString.split(" "); // let because one level will possibly be deleted
    const changes: number[] = []; // keeps track of direction of change (in/decreasing)

    let levelSkip = false;

    // comparison current with next number
    for (let i: number = 0; i < report.length - 1; i++) {
        const a: number = Number(report[i]);
        const b: number = Number(report[i + 1]);
        const diff: number = b - a;
        changes[i] = diff; // used to push, but now with level skip needs to be bound to position/index

        // test if change level is out of bounds

        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            if (!levelSkip) {
                levelSkip = true;
                // remove element
                report = report.filter((level, levelIndex) => levelIndex != i);
                // reset loop to test levels again from start
                i = -1;
            } else {
                unsafe++;
                return;
            }
        }

        // test if current change follows the pattern of
        // last change (increasing/decreasing)
        else if ((i > 0) && ((changes[i - 1] > 0 && changes[i] < 0) || (changes[i - 1] < 0 && changes[i] > 0))) {
            if (!levelSkip) {
                levelSkip = true;
                // remove element
                report = report.filter((level, levelIndex) => levelIndex != i);
                // reset loop to test levels again from start
                i = -1;
            } else {
                unsafe++;
                return;
            }
        }

    }
    safe++;
});

console.log("safe:", safe, "unsafe:", unsafe, "check:", reports.length == safe + unsafe);