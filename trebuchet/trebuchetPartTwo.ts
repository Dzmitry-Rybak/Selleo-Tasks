// -- Part Two ---
import fs from 'fs';

const filePath = process.argv[2] || './input.txt';
const inputFile: string = fs.readFileSync(filePath, 'utf8');

const txtToArray: string[] = inputFile.split('\n');

interface IReplace  {
    [key:string] : string
}

const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const replaceWithDigits: IReplace = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
}

const regExp = new RegExp(words.join("|"), "g");

let sum = 0;
txtToArray.forEach(row => {
    const matchesReplace = row.replace(regExp, matched => replaceWithDigits[matched])
    
    const first = matchesReplace.match(/\d/); // first digit
    const last = matchesReplace.match(/\d(?=[^\d]*$)/); // last digit 
    if(first && last) { // TypeScript think that first & last can be null type
        
        // console.log("first: ", first[0], "| Last: ", last[0]) - If you want to see how it works,

        const combinedNumber = parseInt(first[0] + last[0]);
        sum += combinedNumber;
    }
})

console.log('"Part two" answer is:', sum);