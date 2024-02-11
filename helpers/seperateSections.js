/**
 * Function to seperate the sentences into sections
 * @param {string} sentences
 * @returns {array of strings} seperatedSections
 */

function seperateSections(sentences) {
  // Split the sentences into an array, split by newline
  const sentencesArray = sentences.split('------------------------------------------------');
  // Remove any empty strings from the array
  const filteredSentencesArray = sentencesArray.filter(sentence => sentence.trim() !== '');
  // Return the filteredSentencesArray
  return filteredSentencesArray;
}

module.exports = seperateSections;
