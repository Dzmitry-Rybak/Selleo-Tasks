// -- Part One ---
import fs from 'fs';

const filePath = process.argv[2] || './input.txt';
const inputFile: string = fs.readFileSync(filePath, 'utf8');

const txtToArray: string[] = inputFile.split('\n');

let sum = 0;
txtToArray.forEach(row => {
    const first = row.match(/\d/); // first digit
    const last = row.match(/\d(?=[^\d]*$)/); // last digit 
    if(first && last) { // TypeScript think that first & last can be null type
        const combinedNumber = parseInt(first[0] + last[0]);
        sum += combinedNumber;
    }
});

console.log('"Part one" answer is:', sum);