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
  addLeftToRight(word: IWord, x: number, y: number, charIndexOfNewChar?: number);
  addUpToDown(word: IWord, x: number, y: number, charIndexOfNewChar?: number);
  checkCoordEmpty(x: number, y: number): boolean;
  checkCoordEmptyLoop(x: number, y: number, wordLength: number, direction: DbAddDirection): boolean;
  existSameChar(char: string, wordLength: number): boolean | ICoord; // search same unused char
  areAdjacentCharsUnused(word: IWord, char: string): boolean;
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
