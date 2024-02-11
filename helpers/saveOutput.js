const fs = require('fs');

const saveOutput = (alphabetizedSections, fileName) => {
  return new Promise((resolve, reject) => {
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

    // set the filename and filepath
    let i = 1;
    if (!fileName) {
      // use a default filename
      fileName = 'output';
      filePath = './outputs/output.txt';
    } else {
      // remove any file extension from the filename
      fileName = fileName.replace(/\.[^/.]+$/, "");
      // set the file path
      filePath = `./outputs/${fileName}.txt`;
    }

    // create a the outputs directory if it doesn't exist
    if (!fs.existsSync('./outputs')) {
      fs.mkdirSync('./outputs');
    }

    // check if the file already exists
    while (fs.existsSync(filePath)) {
      // if the file already exists, add an incrementing number to the filename
      filePath = `./outputs/${fileName}_${i}.txt`;
      i++;
    }

    // write the output to the file
    fs.writeFile(filePath, output, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`The result has been saved to '${filePath}'.\n`);
        resolve();
      }
    });
  });
}

module.exports = saveOutput;
