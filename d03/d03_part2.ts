import input from "./input.txt";
// let input: string = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

function processAssignment(assignment: string) {
    const pattern: RegExp = /mul\(\d{1,3},\d{1,3}\)/g;
    const results: string[] | null = assignment.match(pattern);

    if (results) {
        const sumOfProducts: number = results.reduce((sum: number, opString: string) => {
            const opNumbers: string[] = opString.replace("mul(", "").replace(")", "").split(",");
            const product: number = Number(opNumbers[0]) * Number(opNumbers[1]);
            return sum + product;
        }, 0);
        return sumOfProducts;
    }
}

// pattern: do() ... don't() or don't() ... don't() or don't() ... STRING_END
const invalidPattern: RegExp = /don't\(\).+?((do|don't)\(\)|$)/g;

let validInput = input;
const invalidSubstrings: string[] | null = input.match(invalidPattern);
invalidSubstrings?.forEach(invalidSubStr => validInput = validInput.replace(invalidSubStr, ""))

console.log(validInput);
console.log(processAssignment(validInput));
