import fs from "fs";

const path = process.argv[2] || 'pan_tadeusz.txt';
const textFromFile = fs.readFileSync(path, 'utf8');

// /\s+|\n+/ - One or more space characters or one or more newline characters.
const setFromText = new Set(textFromFile.split(/\s+|\n+/)) 
const arrayFromSet = Array.from(setFromText);

fs.writeFileSync('./word_list.txt', arrayFromSet.join('\n'));