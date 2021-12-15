interface IWordPuzzle {
  words: IWord[];
  wordDb: IWordDb;
  addWords(words: string[]);
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
  charLists: Map<number, ILinkedList>; // 0*0, { char: 'e', parent.. }
  addToDb(word: IWord, charIndexOfNewChar?: number, oldCharData?: ICoord);
  printItems();
  useChar(x: number, y: number);
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

interface ICharNode {
  prev?: ICharNode;
  next?: ICharNode;
  value?: string;
  direction: Direction;
}

interface ILinkedList {
  head: ICharNode;
  addChar(char: string, direction: Direction);
  addWord(word: string, direction: Direction);
  searchChar(char: string, direction: Direction): ICharNode | undefined;
  getLast(): ICharNode;
  printList();
}

export {
  IWordPuzzle,
  IWord,
  IWordDb,
  DbAddDirection,
  ICoord,
  Direction,
  ICharNode,
  ILinkedList,
};
