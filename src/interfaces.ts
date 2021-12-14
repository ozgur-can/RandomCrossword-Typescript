interface IWordPuzzle {
  words: IWord[];
  selectedWord: IWord;
  wordDb: IWordDb;
  addWords(words: string[]);
  sortWordsDesc();
  joinWords();
}

interface IWord {
  value: string;
  unusedChars: string[];
  checkCharUnused(charIndex: number): boolean;
  useChar(charIndex: number);
}

interface IWordDb {
  chars: Map<string, IWordDbObject>; // 0*0, { char: 'e', parent.. }
  addToDb(word: IWord, charIndexOfNewChar?: number, oldCharData?: ICoord);
  addLeftToRight(word: IWord, x: number, y: number);
  checkCoordEmpty(x: number, y: number): boolean;
  addUpToDown(
    word: IWord,
    number,
    x: number,
    y: number,
    charIndexOfNewChar?: number
  );
  existSameChar(char: string): boolean | ICoord; // search same unused char
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

export { IWordPuzzle, IWord, IWordDb, DbAddDirection, IWordDbObject, ICoord };
