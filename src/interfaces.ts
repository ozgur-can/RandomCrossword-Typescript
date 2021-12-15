interface IWordPuzzle {
  words: string[];
  wordDb: IWordDb;
  search(word: string, charIndex: number);
  run();
  printWordTable();
}

interface IWord {
  value: string;
  unusedChars: string[];
  checkCharUnused(charIndex: number): boolean;
  useChar(char: string);
}

interface IWordDb {
  charLists: Map<number, ILinkedList>; // 0*0, { char: 'e', parent.. }
  addToDb(word: string, charIndexOfNewChar?: number, oldCharData?: ICoord);
  useChar(x: number, y: number);
  searchCharDb(word: string, charIndex: number): boolean;
  getSpecificList(index: number): ILinkedList | undefined;
  printItems();
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
  UD,
}

interface ICharNode {
  prev?: ICharNode;
  next?: ICharNode;
  value?: string;
  index?: number;
  direction: Direction;
  used?: boolean;
}

interface ILinkedList {
  head: ICharNode;
  tail: ICharNode;
  length: number;
  addCharToLast(char: string, direction: Direction);
  addCharToHead(char: string, direction: Direction);
  addWord(word: string, direction: Direction);
  searchChar(char: string, used: boolean): ICharNode | undefined;
  getLast(): ICharNode | undefined;
  getCharAt(searchIndex: number): ICharNode | undefined;
  printList();
  returnList(): string;
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
