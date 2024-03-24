import fs from 'fs';

const rainbowWord = process.argv[2] || 'rainbow_word_list.txt';
const hash = process.argv[3] ||  'c8e095e2a26f8540afabb36dcdaee3b1';

const textFromFile = fs.readFileSync(rainbowWord, 'utf8');

const arrayFromText = textFromFile.split('\n');
let password = 'Not found';
arrayFromText.forEach(row => {
    if(row.split(' ')[1] === hash) {
        return password = row.split(' ')[0]
    }
})

console.log('Password is: ', password);