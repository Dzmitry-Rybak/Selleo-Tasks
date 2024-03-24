# Selleo Test Projects

This repository contains solutions to test assignments completed for Selleo.

## 1. Inline Editing

### Description:
Create a component for live writing (inline input).

### Complite:
1. Create a placeholder text.
2. After clicking the placeholder, change it to an input field.
3. After pressing Enter or clicking away from the input field, revert to displaying normal text and show the typed value.

## 2. Microblog

### Description:
Create a simple microblog with a list of posts and a form for adding new ones.

### Complite:
1. Display a mocked list of posts.
2. Implement a form for adding a new post.
3. Add notifications to inform the creator that a post has been added.
4. Implement a simple voting system for each post. (+1 / -1)
5. Import 3 default articles from an external JSON file.
6. Provide the ability to remove posts.
7. Display the current count of articles.

## 3. Rainbow Table

### Description:
Create a script to generate rainbow tables from a list of words.

### Interface:
- First Script: `node firstScript.js word_list.txt`
  - Produces `rainbow_word_list.txt` containing words and their MD5 representations.
- Second Script: `node secondScript.js rainbow_word_list.txt yourHash`
  - Outputs a table with hash values and their corresponding words.
  - Outputs a password.

## 4. Storage

### Description:
Create an API server with endpoints to manage files and directories on disk.

### Endpoints:
- List files and directories.
- Display content of given files.
- Upload new files.

## 5. Trebuchet

### Description:
The task is to restore the calibration values that have been altered and calculate the sum of all these values.

### Details:
- In the first part of the task, the calibration values are presented on each line of the text. The calibration value on each line is found by combining the first and last digits (in this order) into a two-digit number.
- In the second part of the task, it is revealed that some digits are represented by English words (e.g., one, two, three, etc.). You need to find the actual first and last digits in each line, taking this information into account.

Each project is organized into separate directories within this repository. Refer to individual project directories for more details and code implementation.