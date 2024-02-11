const fs = require('fs');
const readline = require('readline');
const alphabetizeSentences = require('./helpers/alphabetizeSentences');
const seperateSections = require('./helpers/seperateSections');
const saveOutput = require('./helpers/saveOutput');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Welcome message
console.log(`
Welcome to 'SentenAl' the Sentence Alphabetizer!

This program will take a .txt file and alphabetize the sentences.
- You can choose to keep quotations or not.
- You can choose to alphabetize the entire text or alphabetize the text in sections.

If you choose to alphabetize the text in sections, the source file should have this line between each section:

------------------------------------------------

The output will separate the sections with the same line.
The output will be saved to a named .txt file, of your choice, in the 'outputs' directory.
if keeping quotations, ensure that quotations are properly opened and closed in the source file.
`);


/**
 * The main function that executes the Sentence Alphabetizer program.
 * It prompts the user for input, reads a text file, alphabetizes the sentences,
 * and saves the output to a file.
 * @returns {Promise<void>} A promise that resolves when the program is finished.
 */
async function main() {
  rl.question('Please enter the .txt filename (defaults to "story"):', async (sourceFile) => {
    let sourceText;
    try {
      if (!sourceFile) {
        sourceFile = 'story.txt';
      }
      if (!sourceFile.endsWith('.txt')) {
        sourceFile += '.txt';
      }
      sourceText = fs.readFileSync(sourceFile, 'utf8');
    } catch (err) {
      console.error(`Error reading file from disk: ${err}`);
      main();  // restart the program on failed file read
      return;
    }

    rl.question('\nWould you like to keep quotations? (y/n) ', (keepQuotations) => {
      rl.question('\nWould you like to alphabetize the text in sections? (y/n) ', async (keepSections) => {
        let alphabetizedSections = []; // store the alphabetized sections
        let sections = seperateSections(sourceText); // separate the sections
        let quotes = keepQuotations.toLowerCase() === 'y' ? true : false; // boolean to store quotations option

        if (keepSections.toLowerCase() === 'y') {
          console.log("Alphabetizing the text in sections...");

          for (let section of sections) {
            let alphabetizedSection = alphabetizeSentences(section, quotes);
            alphabetizedSections.push(alphabetizedSection);
          }
        } else {
          console.log("Alphabetizing the entire text...");
          let text = sections.join('\n'); // join the sections into one string
          let alphabetizedSection = alphabetizeSentences(text, quotes);
          alphabetizedSections.push(alphabetizedSection);
        }

        rl.question('\nPlease enter the desired filename for the output: ', async (outputFile) => {
          await saveOutput(alphabetizedSections, outputFile)
            .catch((err) => {
              console.error(`Error saving file to disk: ${err}`);
            });// save the output to a file
          console.log("Thank you for using 'SentenAl' the Sentence Alphabetizer!");
          rl.close();
        });
      });
    });
  });
}

// Start the program
main();
