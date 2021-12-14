import { ICoord, IWord, IWordDb, IWordPuzzle } from "./interfaces";
import { Word } from "./word";
import { WordDb } from "./WordDb";

class WordPuzzle implements IWordPuzzle {
  words: IWord[] = [];
  selectedWord: IWord;
  wordDb: IWordDb;

  constructor(words: string[]) {
    this.wordDb = new WordDb();
    this.addWords(words);
    this.sortWordsDesc();
    this.run();
  }

  addWords(words: string[]) {
    for (let i = 0; i < words.length; i++) {
      this.words.push(new Word(words[i]));
    }
  }

  sortWordsDesc() {
    this.words.sort((a, b) => b.value.length - a.value.length);
  }

  joinWords() {
    // this.selectedWord = this.words[0];
    // while(!this.selectedWord.getUnusedChar()){
    // }
  }

  binarySearch(word: string[], first, last, search) {
    if (last >= 1) {
      let mid = first + Math.floor(last / 2);
      if (search == word[mid]) {
        // found
        word.splice(mid, 1);
        // return this.binarySearch(word, 0, word.length, )
      }
    } else {
    }
  }

  minarySearch(word: IWord, charIndex: number) {
    // check char is exist & same & unused in db
    let exist: boolean | ICoord = this.wordDb.existSameChar(
      word.value[charIndex]
    );

    // add this word to db
    if (exist != false) {
      this.wordDb.addToDb(word, charIndex, exist as ICoord);            
    } else {      
      if(charIndex < word.value.length - 1) {
        return this.minarySearch(word, charIndex + 1);
      }
    }
  }

  run() {
    for (let i = 0; i < this.words.length; i++) {
      if (i == 0) {
        this.wordDb.addToDb(this.words[i]);
      } else {
        this.minarySearch(this.words[i], 0);
      }
    }

    this.wordDb.printItems();
  }
}

export { WordPuzzle };
