const fs = require('fs');

const saveOutput = (alphabetizedSections, fileName) => {
  let output = '';

  if (alphabetizedSections.length > 1) {
    // mark the end of each section with a line of dashes
    for (let section of alphabetizedSections) {
      output += section;
      output += "\n------------------------------------------------\n";
    }
  } else {
    // if there is only one section, don't add the line of dashes
    output = alphabetizedSections[0];
  }

  let i = 1;
  if (!fileName) {
    fileName = 'output';
    filePath = './outputs/output.txt';
  } else {
    // remove any file extension from the filename
    fileName = fileName.replace(/\.[^/.]+$/, "");
    filePath = `./outputs/${fileName}.txt`;
  }

  // create a directory to store the output files if it doesn't exist
  if (!fs.existsSync('./outputs')) {
    fs.mkdirSync('./outputs');
  }

  // find the next available filename
  while (fs.existsSync(filePath)) {
    filePath = `./outputs/${fileName}_${i}.txt`;
    i++;
  }

  // write the output to a file
  fs.writeFile(filePath, output, (err) => {
    if (err) throw err;
    console.log(`The result has been saved to '${filePath}'.\n`);
  });
}

module.exports = saveOutput;
