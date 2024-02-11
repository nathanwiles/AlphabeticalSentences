const splitSentencesWithQuotes = require('./splitSentencesWithQuotes'); //helper function to split sentences with quotes
/**
 * alphabetizeSentences.js
 * Function to take a string of sentences and return the sentences in alphabetical order
 * @param {string} sentences - the string of sentences to alphabetize
 * @param {boolean} quotes - if true, remove all quotation marks from the sentences
 * @returns {string} alphabetizedSentences
 */

function alphabetizeSentences(sentences, quotes) {
  // Remove all quotation marks from the sentences if quotes is false.
  const processedSentences = quotes ? sentences : sentences.replace(/["]+/g, '');

  // Split the sentences into an array.
  let sentencesArray;
  if (!quotes) {
    //split the sentences into an array, split by punctuation and whitespace
    sentencesArray = processedSentences.split(/(?<=[.!?'-])[\s\n]+/);
  } else {
    sentencesArray = splitSentencesWithQuotes(processedSentences);
  }
  // Remove any empty strings from the arraytest
  const filteredSentencesArray = sentencesArray.filter(sentence => sentence.trim() !== '');

  // Sort the array of sentences alphabetically
  const sortedSentencesArray = filteredSentencesArray.sort((a, b) => {
    // Remove leading non-alphanumeric characters from the sentences for comparison
    const sentenceA = a.replace(/^[^a-zA-Z0-9]*/, '');
    const sentenceB = b.replace(/^[^a-zA-Z0-9]*/, '');

    return sentenceA.localeCompare(sentenceB, undefined, { sensitivity: 'base' });
  });

  // Join the sorted sentences into a string, separated by newlines
  const alphabetizedSentences = sortedSentencesArray.join('\n').replace(/\n+/g, '\n').trim();

  return alphabetizedSentences;
}

module.exports = alphabetizeSentences;
