import fs from "fs";
import { md5 } from 'js-md5';


const wordList = process.argv[2] ||  'word_list.txt';
const textFromFile = fs.readFileSync(wordList, 'utf8');

const arrayFromText = textFromFile.split('\n');

const modifiedArray = arrayFromText.map(word => `${word} ${md5(word)}`) // create new Array with hashes
fs.writeFileSync('./rainbow_word_list.txt', modifiedArray.join('\n'))