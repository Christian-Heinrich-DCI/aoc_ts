// import input from "./testinput.txt";
// import input from "./testinput2.txt";
import input from "./input.txt";

// checking of levels is now a function, removed console.logs and some comments for more compactness
// see d02.ts for more details
function testReport(reportString: string, reportIndex: number) {
    let report: string[] = reportString.split(" "); // let because one level will possibly be deleted
    const changes: number[] = []; // keeps track of direction of change (in/decreasing)
    // comparison current with next number
    for (let i: number = 0; i < report.length - 1; i++) {
        const a: number = Number(report[i]);
        const b: number = Number(report[i + 1]);
        const diff: number = b - a;
        changes[i] = diff; // used to push, but now with level skip needs to be bound to position/index
        // test if change level is out of bounds
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
        // test if current change follows the pattern of last change (increasing/decreasing)
        if ((i > 0) && ((changes[i - 1] > 0 && changes[i] < 0) || (changes[i - 1] < 0 && changes[i] > 0))) return false;
    }
    return true;
}

// create an array from the text-input
// each line (report) is a new element
const reports: string[] = input.split("\n");
let safe: number = 0;
let unsafe: number = 0;

reports.forEach((reportString: string, reportsIndex: number) => {
    if (testReport(reportString, reportsIndex)) safe++;
    // if the report failed the check we need to check every other variant (with each of the levels removed)
    else {
        const report: string[] = reportString.split(" ");

        for (let removeIndex: number = 0; removeIndex < reportString.split(" ").length; removeIndex++) {
            // report with single level removed
            const variantReport: string[] = report.filter((level: string, levelIndex: number) => levelIndex != removeIndex);
            const variantResult: boolean = testReport(variantReport.join(" "), reportsIndex);
            // if any of the variants tests safe, the report itself is considered safe
            if (variantResult) {
                safe++;
                return;
            }
        }
        unsafe++;
    }
});

console.log("safe:", safe, "unsafe:", unsafe, "check:", reports.length == safe + unsafe);