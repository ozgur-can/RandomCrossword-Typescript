import {
  DbAddDirection,
  Direction,
  ICharNode,
  ICoord,
  ILinkedList,
  IWordDb,
} from "./interfaces";
import { LinkedList } from "./linkedlist";

class WordDb implements IWordDb {
  charLists: Map<number, ILinkedList>;

  constructor() {
    this.charLists = new Map();
  }

  addToDb(word: string, charIndexOfNewChar: number, oldCharData?: ICoord) {
    // db is empty
    if (this.charLists.size == 0) {
      // add first word L-R / U-D randomly
      let random = Math.random();

      if (random < 0) {
        // Direction L-R

        for (let i = 0; i < word.length; i++) {
          // create list
          const list = new LinkedList();

          // add char in LR dir
          list.addCharToLast(word[i], Direction.LR);

          // add list to db
          this.charLists.set(i, list);
        }
      } else {
        // Direction U-D

        // create list
        const list = new LinkedList();

        // add word in LR dir
        list.addWord(word, Direction.UD);

        // add list to db
        this.charLists.set(0, list);
      }
    }
    // db is not empty
    else {
      // old L-R, new U-D
      if (oldCharData.direction == DbAddDirection.leftToRight) {
      }

      // old U-D, new L-R
      if (oldCharData.direction == DbAddDirection.upToDown) {
      }
    }
  }

  searchAndAddToDb(word: string, charIndex: number): boolean {
    // result check
    let isAdded = false;
    const charToSearch: string = word[charIndex];

    // run if lists found
    if (this.charLists.size > 0) {
      // search every list
      for (let i = 0; i < this.charLists.size; i++) {
        // current list
        let listFound = this.charLists.get(i);

        // list found
        if (listFound) {
          // char found
          let charFound = listFound.searchChar(charToSearch, false);

          // char found && Left-Right
          if (charFound && charFound.direction == Direction.LR) {
            for (
              let j = charFound.index - charIndex, t = 0;
              j < charFound.index - charIndex + word.length, t < word.length;
              j++, t++
            ) {
              if (t == 0) {
                // check up side
                if (this.hasChar(i, j - 1)) {
                  return;
                }
              }
              // check down side
              else if (t == word.length - 1) {
                if (this.hasChar(i, j + 1)) {
                  return;
                }
              }

              if (charFound.index == j) {
                continue;
              } else {
                // check left and right side
                if (this.hasChar(i - 1, j) || this.hasChar(i + 1, j)) {
                  return;
                } else {
                  // add downward
                  if (charFound.index > j) {
                    let currentChar = word[t];
                    // add to head
                    listFound.addCharToHead(currentChar, Direction.UD);
                  }

                  // add upward
                  if (charFound.index < j) {
                    let currentChar = word[t];
                    // add to last
                    listFound.addCharToLast(currentChar, Direction.UD);
                  }
                }
              }
            }
            // update added status
            isAdded = true;
            // char used > true
            charFound.used = true;
            // exit loop with value
            return isAdded;
          }

          // old word is in Up-Down
          else if (charFound && charFound.direction == Direction.UD) {
            for (
              let j = i - charIndex, t = 0;
              j < i - charIndex + word.length, t < word.length;
              j++, t++
            ) {
              if (t == 0) {
                // check left side
                if (this.hasChar(j - 1, charFound.index)) {
                  return;
                }
              }
              // check right side
              else if (t == word.length - 1) {
                if (this.hasChar(j + 1, charFound.index)) {
                  return;
                }
              }

              if (j == i) {
                continue;
              } else {
                // check up and down side
                if (
                  this.hasChar(j, charFound.index - 1) ||
                  this.hasChar(j, charFound.index + 1)
                ) {
                  return;
                }
                // add to list
                else this.addToIndex(j, charFound.index, word[t], Direction.LR);
              }
            }
            // update added status
            isAdded = true;
            // char used > true
            charFound.used = true;
            // exit loop with value
            return isAdded;
          }
        }
      }
    }

    return isAdded;
  }

  addToIndex(
    listIndex: number,
    charIndex: number,
    char: string,
    direction: Direction
  ) {
    // get list
    let list = this.charLists.get(listIndex);

    // list not found
    if (!list) {
      // create new list if not found
      this.charLists.set(listIndex, new LinkedList());
      // add char to new list
      this.charLists.get(listIndex).addToIndex(charIndex, char, direction);
    } else {
      // add char to list
      list.addToIndex(charIndex, char, direction);
    }
  }

  getList(index: number): ILinkedList | undefined {
    return this.charLists.get(index);
  }

  getChar(listIndex: number, charIndex: number): ICharNode | undefined {
    // return (x, y) char if exist
    if (this.charLists.has(listIndex)) {
      return this.charLists.get(listIndex).getCharAt(charIndex);
    } else return undefined;
  }

  hasChar(listIndex: number, charIndex: number): boolean {
    // return true char if exist
    if (this.charLists.has(listIndex)) {
      let charFound = this.charLists.get(listIndex).getCharAt(charIndex);
      return charFound && charFound.value != "" ? true : false;
    } else return false;
  }

  printWords() {
    let headIndex, tailIndex;
    interface IChar {
      x: number;
      y: number;
      value: string;
      used: boolean;
    }

    let lines: IChar[][] = [];

    this.charLists.forEach((list, i) => {
      let line: IChar[] = [];
      headIndex = list.head.index;
      tailIndex = list.tail.index;

      for (let j = headIndex; j <= tailIndex; j++) {
        let current = list.getCharAt(j);
        if (current) {
          let char: IChar = {
            value: current.value,
            x: i,
            y: j,
            used: current.used,
          };
          line.push(char);
        }
      }
      lines.push(line);
    });

    console.log(lines);
  }
}

export { WordDb };
