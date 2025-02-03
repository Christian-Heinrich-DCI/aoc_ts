import input from "./input.txt";
// const input: string = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"

console.log(input);

// It does that with instructions like mul(X,Y), where X and Y are each 1-3 digit numbers. For instance, mul(44,46) multiplies 44 by 46 to get a result of 2024. Similarly, mul(123,4) would multiply 123 by 4.

const pattern: RegExp = /mul\(\d{1,3},\d{1,3}\)/g;

const results: any = input.match(pattern);
console.log(results);

if (results.length > 0) {
    const sumOfProducts: number = results.reduce((sum: number, opString: string) => {
        const opNumbers: string[] = opString.replace("mul(", "").replace(")", "").split(",");
        console.log(opString);
        const product: number = Number(opNumbers[0]) * Number(opNumbers[1]);
        return sum + product;
    }, 0);
    console.log(sumOfProducts);
}


