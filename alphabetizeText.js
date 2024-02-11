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
console.log("\nWelcome to the Sentence Alphabetizer!\n");
console.log("This program will take a .txt file and alphabetize the sentences.");
console.log("You can choose to alphabetize the entire text or alphabetize the text in sections.\n");
console.log("If you choose to alphabetize the text in sections, the sections will be separated by a line of dashes.");
console.log("\n------------------------------------------------\n");
console.log("The output will be saved to a named .txt file, of your choice, in the 'outputs' directory.\n");


function askForSourceFile() {
  rl.question('Please enter the .txt filename (defaults to "story"):', (sourceFile) => {
    let sentences;
    try {
      if (!sourceFile) {
        sourceFile = 'story.txt';
      }
      if (!sourceFile.endsWith('.txt')) {
        sourceFile += '.txt';
      }
      sentences = fs.readFileSync(sourceFile, 'utf8');
    } catch (err) {
      console.error(`Error reading file from disk: ${err}`);
      askForSourceFile();  // Ask for the source filename again
      return;
    }

    rl.question('\nWould you like to keep quotations? (y/n) ', (keepQuotations) => {
      rl.question('\nWould you like to alphabetize the text in sections? (y/n) ', (answer) => {
        let alphabetizedSections = [];
        let sections = seperateSections(sentences);
        let quotes = keepQuotations.toLowerCase() === 'y' ? true : false;

        if (answer.toLowerCase() === 'y') {
          console.log("Alphabetizing the text in sections...");

          for (let section of sections) {
            // alphabetize each section
            let alphabetizedSection = alphabetizeSentences(section, quotes);
            alphabetizedSections.push(alphabetizedSection);
          }
        } else {
          console.log("Alphabetizing the entire text...");
          // join the sections into one string
          let text = sections.join('\n');
          // alphabetize the entire story
          let alphabetizedSection = alphabetizeSentences(text, quotes);
          alphabetizedSections.push(alphabetizedSection);
        }

        rl.question('\nPlease enter the desired filename for the output: ', (outputFile) => {
          // save the output to a file
          saveOutput(alphabetizedSections, outputFile);
          rl.close();
        });
      });
    });
  });
}

// Start by asking for the source filename
askForSourceFile();
