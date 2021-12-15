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
    let exist: boolean = this.wordDb.searchCharDb(word, charIndex);
    // console.log(exist);

    // add this word to db
    // if (exist) {
    //   // this.wordDb.addToDb(word, charIndex, exist as ICoord);
    // } else {
    //   if (charIndex < word.length - 1) {
    //     return this.search(word, charIndex + 1);
    //   }
    // }
  }

  run() {
    for (let i = 0; i < this.words.length; i++) {
      if (i == 0) {
        this.wordDb.addToDb(this.words[i]);
      } else {
        this.search(this.words[i], i);
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
