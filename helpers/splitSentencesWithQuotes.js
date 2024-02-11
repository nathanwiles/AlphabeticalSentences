const splitSentencesWithQuotes = (sentences) => {
  const sentencesArray = [];
  let currentSentence = '';
  let insideQuotes = false;

  for (let i = 0; i < sentences.length; i++) {
    const char = sentences[i];
    if (char === '"') {
      if (insideQuotes) {
        currentSentence += char;
        sentencesArray.push(currentSentence.trim());
        currentSentence = '';
      } else {
        currentSentence += char;
      }
      insideQuotes = !insideQuotes;
    } else if (['.', '!', '?'].includes(char) && !insideQuotes) {
      currentSentence += char;
      if (i + 1 < sentences.length && sentences[i + 1] !== ' ') {
        currentSentence += sentences[i + 1];
        i++;
      }
      sentencesArray.push(currentSentence.trim());
      currentSentence = '';
    } else {
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
