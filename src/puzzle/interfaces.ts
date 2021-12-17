interface IWordPuzzle {
  words: string[];
  wordDb: IWordDb;
  unusedWords: string[];
  finalCheck: boolean;
  search(word: string, charIndex: number);
  run(words: string[]);
}

interface IWordDb {
  charLists: Map<number, ILinkedList>;
  addToDb(word: string);
  searchAndAddToDb(word: string, charIndex: number): boolean;
  addToIndex(listIndex: number, charIndex: number, char: string, direction: Direction);
  checkWordAreaEmpty(loopIndex1: number, loopIndex2: number, word: string, direction: Direction, charFound?: ICharNode, listIndex?: number, add?: boolean): ICheckWordAreaEmpty
  getCharInList(listIndex: number, charIndex: number): ICharNode | undefined; 
  hasChar(listIndex: number, charIndex: number): boolean;
  getCharmap(): IChar[];
  generateKaboomLevel();
}

interface ILinkedList {
  head: ICharNode;
  tail: ICharNode;
  length: number;
  addCharToLast(char: string, direction: Direction);
  addCharToHead(char: string, direction: Direction);
  addWord(word: string, direction: Direction);
  addToIndex(index: number, char: string, direction: Direction);
  createHeadTail(index?: number, char?: string, direction?: Direction);
  searchChar(char: string, used: boolean): ICharNode | undefined;
  getCharAt(searchIndex: number): ICharNode | undefined;
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

interface IChar {
  x: number;
  y: number;
  value: string;
}

interface ICheckWordAreaEmpty{
  isEmpty?: boolean;
  isAdded?: boolean;
}

export {
  IWordPuzzle,
  IWordDb,
  Direction,
  ICharNode,
  IChar,
  ILinkedList,
  ICheckWordAreaEmpty
};
