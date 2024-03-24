# Rainbow Table Project

### Description:
Create a script to generate rainbow tables from a list of words.

## run `node wordListCreator.js` to create word_list.txt wich contain unique words

### Interface:
- First Script: `node firstScript.js word_list.txt`
  - Produces `rainbow_word_list.txt` containing words and their MD5 representations.
- Second Script: `node secondScript.js rainbow_word_list.txt yourHash`
  - Outputs a table with hash values and their corresponding words.
  - Outputs a password.
