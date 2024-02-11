const splitSentencesWithQuotes = require('./splitSentencesWithQuotes');
/**
 * alphabetizeSentences.js
 * Function to take a string of sentences and return the sentences in alphabetical order
 * @param {string} sentences
 * @param {boolean} quotes - if true, remove all quotation marks from the sentences
 * @returns {string} alphabetizedSentences
 */

function alphabetizeSentences(sentences, quotes = false) {
  // Remove all quotation marks.
  const processedSentences = quotes ? sentences : sentences.replace(/["]+/g, '');

  // Split the sentences into an array.
  let sentencesArray;
  if (!quotes) {
    sentencesArray = processedSentences.split(/(?<=[.!?'-])[\s\n]+/);
  } else {
    sentencesArray = splitSentencesWithQuotes(processedSentences);
  }
  // Remove any empty strings from the arraytest
  const filteredSentencesArray = sentencesArray.filter(sentence => sentence.trim() !== '');

  // Sort the array of sentences alphabetically
  const sortedSentencesArray = filteredSentencesArray.sort((a, b) => {
    // Remove leading non-alphanumeric characters from the sentences
    const sentenceA = a.replace(/^[^a-zA-Z0-9]*/, '');
    const sentenceB = b.replace(/^[^a-zA-Z0-9]*/, '');

    // Compare the sentences
    return sentenceA.localeCompare(sentenceB, undefined, { sensitivity: 'base' });
  });

  // Join the sorted array of sentences into a string
  const alphabetizedSentences = sortedSentencesArray.join('\n').replace(/\n+/g, '\n').trim();

  // Return the alphabetizedSentences
  return alphabetizedSentences;
}

module.exports = alphabetizeSentences;
