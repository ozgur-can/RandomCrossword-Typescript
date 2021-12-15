interface IWordPuzzle {
  words: IWord[];
  selectedWord: IWord;
  wordDb: IWordDb;
  addWords(words: string[]);
  sortWordsDesc();
  search(word: IWord, charIndex: number);
  run();
}

interface IWord {
  value: string;
  unusedChars: string[];
  checkCharUnused(charIndex: number): boolean;
  useChar(char: string);
}

interface IWordDb {
  chars: Map<string, IWordDbObject>; // 0*0, { char: 'e', parent.. }
  wordCount: number;
  addToDb(word: IWord, charIndexOfNewChar?: number, oldCharData?: ICoord);
  printItems();
  useChar(x: number, y: number);
}

interface IWordDbObject {
  char: string;
  parent: IWord; // word of the char
  direction: DbAddDirection;
}

interface ICoord {
  x: number;
  y: number;
  direction: DbAddDirection;
}

enum DbAddDirection {
  leftToRight,
  upToDown,
}

enum Direction {
  LR,
  UP,
}

export { IWordPuzzle, IWord, IWordDb, DbAddDirection, IWordDbObject, ICoord, Direction };
