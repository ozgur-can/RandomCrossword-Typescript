import { IWordDb, IWordPuzzle } from "./interfaces";
import { WordDb } from "./worddb";

class WordPuzzle implements IWordPuzzle {
  words: string[] = [];
  wordDb: IWordDb;

  constructor(words: string[]) {
    this.wordDb = new WordDb();
    this.words = words;
    this.run();
  }

  search(word: string, charIndex: number) {
    // check char is exist & same & unused in db
    let wordAdded: boolean = this.wordDb.searchAndAddToDb(word, charIndex);

    // search next char for this word
    if (!wordAdded) {
      if (charIndex < word.length - 1) return this.search(word, charIndex + 1);
    }
    // word added
    else return;
  }

  run() {
    for (let i = 0; i < this.words.length; i++) {
      if (i == 0) {
        this.wordDb.addToDb(this.words[i]);
      } else {
        this.search(this.words[i], 0);
      }
    }
  }

  printWordTable() {
    let lists = this.wordDb.charLists;

    for (let i = 0; i < lists.size; i++) {
      console.log(i, lists.get(i).returnList());
    }
  }
}

export { WordPuzzle };
