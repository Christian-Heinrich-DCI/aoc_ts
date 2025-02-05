/**
 * Ideas/Thoughts
 * checking:
 * 
 * horizontal
 * horizontal, backwards
 * 
 * vertical
 * vertical, backwards
 * 
 * diagonal (\) 
 * diagonal (\), backwards
 * 
 * diagonal (/)
 * diagonal (/), backwards
 * 
 * */

// import input from "./d4_input.txt";
const input: string = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const horizontals: string[] = input.split("\n");
const verticals: string[] = [];
const singles: string[][] = [];
const diagonalsBackwards: string[] = [];
const diagonalsForwards: string[] = [];

// horizontals has to be checked by itself (because it constructs verticals and singles,
// which are needed for the rest)
const compactInput: string[][] = [verticals, diagonalsBackwards, diagonalsForwards];
let foundAmount: number = 0;

function checkForXMAS(line: string) {
    const pattern: RegExp = /XMAS/g;
    let found: string[] | null = line.match(pattern);
    if (found) foundAmount += found.length;
    found = line.split("").reverse().join("").match(pattern);
    if (found) foundAmount += found.length;
}

// Checking horizontal + horizontal, reversed lines
// at the same time constructing verticals and 
// singles (for diagonals later)
horizontals.forEach((line: string, i: number) => {
    checkForXMAS(line);

    // at the same time constructing verticals
    for (let linePos: number = 0; linePos < line.length; linePos++) {
        // beginning of vertical construction there's no vertical
        // present, so += adds undefined -> extra case for first
        // string "addition" (here assignment)
        if (i == 0)
            verticals[linePos] = line.charAt(linePos);
        else
            verticals[linePos] += line.charAt(linePos);
    }

    // constructing 2d-array of all single letters (for diagonals)
    singles.push(line.split(""));
});

console.log("found in verticals (incl. reverse):", foundAmount)

verticals.forEach((line: string) => {
    checkForXMAS(line);
});

console.log("found in verticals (incl. reverse):", foundAmount)

console.table(singles);

// assuming input is square (same amount of lines as characters in one line)
const size = singles[0].length;

for (let x: number = 0; x <= size - 1; x++) {
    let diagString: string = "";

    for (let l: number = 0; l < size - x; l++) {
        diagString += singles[l][x + l];
    }
    diagonalsBackwards.push(diagString);
}

// starting with y=1 instead of 0 to not count the 0,0 diagnal 2x
for (let y: number = 1; y <= size - 1; y++) {
    let diagString: string = "";

    for (let l: number = 0; l < size - y; l++) {
        diagString += singles[y + l][l];
    }
    diagonalsBackwards.push(diagString);
}

console.table(diagonalsBackwards)


