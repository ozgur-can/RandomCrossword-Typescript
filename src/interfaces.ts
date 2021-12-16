interface IWordPuzzle {
  words: string[];
  wordDb: IWordDb;
  search(word: string, charIndex: number);
  run();
  printWordTable();
}

interface IWordDb {
  charLists: Map<number, ILinkedList>; // 0*0, { char: 'e', parent.. }
  addToDb(word: string, charIndexOfNewChar?: number, oldCharData?: ICoord);
  searchAndAddToDb(word: string, charIndex: number): boolean;
  addToIndex(listIndex: number, charIndex: number, char: string, direction: Direction);
  getList(index: number): ILinkedList | undefined;
  getChar(listIndex: number, charIndex: number): ICharNode | undefined; 
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
  None
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
  addToIndex(index: number, char: string, direction: Direction);
  searchChar(char: string, used: boolean): ICharNode | undefined;
  getCharAt(searchIndex: number): ICharNode | undefined;
  printList();
  returnList(): string;
}

export {
  IWordPuzzle,
  IWordDb,
  DbAddDirection,
  ICoord,
  Direction,
  ICharNode,
  ILinkedList,
};
