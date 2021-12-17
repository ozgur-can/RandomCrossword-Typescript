import { IWordDb, IWordPuzzle } from "./interfaces";
import { WordDb } from "./worddb";

class WordPuzzle implements IWordPuzzle {
  words: string[] = [];
  wordDb: IWordDb;
  unusedWords: string[];
  finalCheck: boolean; // to start run two times if necessary

  constructor(words: string[]) {
    this.wordDb = new WordDb();
    this.words = words;
    this.unusedWords = [];
    this.finalCheck = false;
    this.run(this.words);
  }

  search(word: string, charIndex: number) {
    // check char is found & same & unused in db
    let wordAdded: boolean = this.wordDb.searchAndAddToDb(word, charIndex);

    // search next char for this word
    if (!wordAdded) {
      // search next char of word
      if (charIndex < word.length - 1) return this.search(word, charIndex + 1);
      // add word to unused words if it didn't added
      else if (
        charIndex == word.length - 1 &&
        !this.unusedWords.includes(word)
      ) {
        this.unusedWords.push(word);
      }
    }
    // word added
    else return;
  }

  run(words: string[]) {
    for (let i = 0; i < words.length; i++) {
      // add first without search
      if (i == 0) {
        this.wordDb.addToDb(words[i]);
      } else {
        // search word in other words
        this.search(words[i], 0);
      }
    }

    // start run() one more time if unused word exist
    if (this.unusedWords.length != 0 && !this.finalCheck) {
      this.finalCheck = true;
      return this.run(this.unusedWords);
    }
  }
}

export { WordPuzzle };
