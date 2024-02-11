/**
 * Function to seperate the sentences into sections
 * @param {string} text
 * @returns {array of strings} seperatedSections
 */

function seperateSections(text) {
  // Split the sentences into an array, split by newline
  const sentencesArray = text.split('------------------------------------------------');
  // Remove any empty strings from the array
  const filteredSentencesArray = sentencesArray.filter(sentence => sentence.trim() !== '');
  // Return the filteredSentencesArray
  return filteredSentencesArray;
}

module.exports = seperateSections;
