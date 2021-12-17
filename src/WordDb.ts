import {
  Direction,
  IChar,
  ICharNode,
  ICheckWordAreaEmpty,
  ILinkedList,
  IWordDb,
} from "./interfaces";
import { LinkedList } from "./linkedlist";
import _ from "lodash";

class WordDb implements IWordDb {
  charLists: Map<number, ILinkedList>;

  constructor() {
    this.charLists = new Map();
  }

  addToDb(word: string) {
    // db is empty
    if (this.charLists.size == 0) {
      // add first word L-R / U-D randomly
      let random = Math.random();

      if (random > 0.5) {
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

          // char found
          if (charFound) {
            if (charFound.direction == Direction.LR) {
              // check area to add new word
              let area = this.checkWordAreaEmpty(
                charFound.index,
                charIndex,
                word,
                charFound.direction,
                charFound,
                i,
                false
              );

              // add if empty
              if (area && area.isEmpty) {
                isAdded = this.checkWordAreaEmpty(
                  charFound.index,
                  charIndex,
                  word,
                  charFound.direction,
                  charFound,
                  i,
                  true
                ).isAdded;

                return isAdded;
              }
            } else if (charFound.direction == Direction.UD) {
              // check area to add new word
              let area = this.checkWordAreaEmpty(
                i,
                charIndex,
                word,
                charFound.direction,
                charFound,
                i,
                false
              );

              // add if empty
              if (area && area.isEmpty) {
                isAdded = this.checkWordAreaEmpty(
                  i,
                  charIndex,
                  word,
                  charFound.direction,
                  charFound,
                  i,
                  true
                ).isAdded;

                return isAdded;
              }
            }
          }
        }
      }
    }

    return isAdded;
  }

  // add char to given list > (x, y, 'a', LR/UD)
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

  checkWordAreaEmpty(
    loopIndex1: number,
    loopIndex2: number,
    word: string,
    direction: Direction,
    charFound: ICharNode,
    listIndex?: number,
    add?: boolean
  ): ICheckWordAreaEmpty {
    let wordLength = word.length;
    let startIndex = loopIndex1 - loopIndex2;
    let endIndex = startIndex + wordLength;

    // @ts-ignore
    for (let j = startIndex, t = 0; j < endIndex, t < wordLength; j++, t++) {
      // Left - Right
      if (direction == Direction.LR) {
        if (t == 0) {
          // check up side
          if (!add && this.hasChar(listIndex, j - 1)) {
            return { isEmpty: false };
          }
        }

        // check down side
        else if (t == wordLength - 1) {
          if (!add && this.hasChar(listIndex, j + 1)) {
            return { isEmpty: false };
          }
        }

        // joint char
        if (loopIndex1 == j) {
          continue;
        } else {
          // check left and right side
          if (
            !add &&
            (this.hasChar(listIndex - 1, j) || this.hasChar(listIndex + 1, j))
          ) {
            return { isEmpty: false };
          } else {
            // add downward
            if (add && loopIndex1 > j) {
              let currentChar = word[t];

              // current list
              let list = this.charLists.get(listIndex);

              // add to head
              list.addCharToHead(currentChar, Direction.UD);
            }
            // add upward
            else if (add && loopIndex1 < j) {
              let currentChar = word[t];

              // current list
              let list = this.charLists.get(listIndex);

              // add to last
              list.addCharToLast(currentChar, Direction.UD);
            }
          }
        }
      }

      // Up - Down
      else if (direction == Direction.UD) {
        if (t == 0) {
          // check left side
          if (!add && this.hasChar(j - 1, charFound.index)) {
            return { isEmpty: false };
          }
        }

        // check right side
        else if (t == wordLength - 1) {
          if (!add && this.hasChar(j + 1, charFound.index)) {
            return { isEmpty: false };
          }
        }

        // joint char
        if (loopIndex1 == j) {
          continue;
        } else {
          // check up and down side
          if (
            !add &&
            (this.hasChar(j, charFound.index - 1) ||
              this.hasChar(j, charFound.index + 1))
          ) {
            return { isEmpty: false };
          } else if (add) {
            // add to list
            this.addToIndex(j, charFound.index, word[t], Direction.LR);
          }
        }
      }

      // last turn of loop with add > true
      if (t == word.length - 1 && add) {
        charFound.used = true;
        return { isAdded: add };
      }

      // last turn of loop with add >  false
      if (t == word.length - 1 && !add) {
        return { isEmpty: true };
      }
    }
  }

  // get char in a list if exist
  getCharInList(listIndex: number, charIndex: number): ICharNode | undefined {
    // return (x, y) char if exist
    if (this.charLists.has(listIndex)) {
      return this.charLists.get(listIndex).getCharAt(charIndex);
    } else return undefined;
  }

  // check char if exist
  hasChar(listIndex: number, charIndex: number): boolean {
    // return true char if exist
    if (this.charLists.has(listIndex)) {
      let charFound = this.charLists.get(listIndex).getCharAt(charIndex);
      return charFound && charFound.value != "?" ? true : false;
    } else return false;
  }

  // char map of result
  getCharmap(): IChar[] {
    let headIndex, tailIndex;

    let lines: IChar[] = [];

    this.charLists.forEach((list, i) => {
      headIndex = list.head.index;
      tailIndex = list.tail.index;

      for (let j = headIndex; j <= tailIndex; j++) {
        let current = list.getCharAt(j);
        if (current) {
          let char: IChar = {
            value: current.value,
            x: i,
            y: j,
          };
          lines.push(char as any);
        }
      }
    });

    return lines;
  }

  generateKaboomLevel() {
    let chars: IChar[] = this.getCharmap();

    // get min and max values for loop
    let yMin = _.minBy(chars, "y").y;
    let yMax = _.maxBy(chars, "y").y;
    let xMin = _.minBy(chars, "x").x;
    let xMax = _.maxBy(chars, "x").x;

    // update missing chars in map
    for (let i = yMin; i <= yMax; i++) {
      for (let j = xMin; j <= xMax; j++) {
        let found = chars.some((item) => item.x == j && item.y == i);

        if (!found) {
          chars.push({ value: "?", x: j, y: i });
        }
      }
    }

    // TODO: use lodash later
    // sort x and y
    chars.sort((a, b) => a.x - b.x);
    chars.sort((a, b) => a.y - b.y);

    // group by y / listIndex values
    let lines = _.chain(chars)
      .groupBy("y")
      .map((value, key) => ({ y: key, chars: value }))
      .value();

    // kaboom level
    let level = [];

    for (let i = 0; i < lines.length; i++) {
      let line = "";
      // update line
      lines[i].chars.forEach((item) => (line += item.value));
      // add lines to level
      level.push(line);
    }

    return level;
  }
}

export { WordDb };
