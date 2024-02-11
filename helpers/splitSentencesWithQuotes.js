/**
 * Splits a string into an array of sentences, taking into account quotes.
 *
 * @param {string} sentences - The string containing sentences to be split.
 * @returns {string[]} - An array of sentences.
 */
const splitSentencesWithQuotes = (sentences) => {
  const sentencesArray = [];
  let currentSentence = '';
  let insideQuotes = false;

  for (let i = 0; i < sentences.length; i++) {
    const char = sentences[i];

    if (char === '"') {
      if (insideQuotes) {
        // If the quotes are closing, add the closing quote to the current sentence and push it to the array
        currentSentence += char;
        sentencesArray.push(currentSentence.trim());
        // Reset the current sentence
        currentSentence = '';
      } else {
        // If the quotes are opening, add the opening quote to the current sentence
        currentSentence += char;
      }
      insideQuotes = !insideQuotes;
    } else if (['.', '!', '?'].includes(char) && !insideQuotes) {
      // If the character is a period, exclamation point, or question mark, and not inside quotes,
      // add the character to the current sentence and push it to the array
      currentSentence += char;
      if (i + 1 < sentences.length && sentences[i + 1] !== ' ') {
        currentSentence += sentences[i + 1];
        i++;
      }
      sentencesArray.push(currentSentence.trim());
      // Reset the current sentence
      currentSentence = '';
    } else {
      // If the character is not a period, exclamation point, or question mark, or is inside quotes,
      currentSentence += char;
    }
  };

  // If there's a remaining sentence that hasn't been pushed to the array, push it now
  if (currentSentence) {
    sentencesArray.push(currentSentence.trim());
  }

  return sentencesArray;
};

module.exports = splitSentencesWithQuotes;
