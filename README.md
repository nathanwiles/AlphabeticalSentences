# SentenAl.js
## Sentence Alphabetizer
### Setup
Using this text alphabetizer is fairly straightforward:
- Download the files in the repo.
- Extract the files to a directory.
- Open a terminal that has node and cd to the directory containing the files
- Ensure that your file structure looks like this:
```bash
  .
  ├── docs
  │   └── SentenAl-screenshot.png
  ├── helpers
  │   ├── alphabetizeSentences.js
  │   ├── saveOutput.js
  │   ├── seperateSections.js
  │   └── splitSentencesWithQuotes.js
  ├── README.md
  ├── SentenAl.js
  └── shortStory.txt
```
- Run the program and respond to the CLI prompts.
```bash
  node SentenAl.js
```
### Example Run:
  ![Screenshot](https://github.com/nathanwiles/AlphabeticalSentences/blob/main/docs/SentenAl-screenshot.png?raw=true)
- you can find the generated .txt file in the new "outputs" directory.


### Notes
- Any .txt file can be moved into the parent directory and used instead of "story.txt"
- If preserving quotes, The .txt file cannot have any unpaired double quotation marks.
- Some minor edits to the text may be required to make it work properly.
- The "story.txt" file was modified to remove 2 floating quotation marks.
