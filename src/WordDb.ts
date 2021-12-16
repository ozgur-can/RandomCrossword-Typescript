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

  searchCharDb(word: string, charIndex: number): boolean {
    const charToAdd: string = word[charIndex];
    // search every list
    for (let i = 0; i < this.charLists.size; i++) {
      // current list
      let listFound = this.charLists.get(i);

      // list found
      if (listFound) {
        // char found
        let charFound = listFound.searchChar(charToAdd, false);

        // char found && Left-Right
        if (charFound && charFound.direction == Direction.LR) {
          // char used > true
          charFound.used = true;
          for (
            let j = charFound.index - charIndex, t = 0;
            j < charFound.index - charIndex + word.length, t < word.length;
            j++, t++
          ) {
            if (charFound.index == j) {
              continue;
            } else {
              // add downward
              if (charFound.index > j) {
                let currentChar = word[-1 - j];
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

        // old word is in Up-Down
        else if (charFound && charFound.direction == Direction.UD) {
          for (
            let j = i - charIndex, t = 0;
            j < i - charIndex + word.length, t < word.length;
            j++, t++
          ) {
            if (j == i) {
              continue;
            } else {
              // add to list
              // console.log(j, charFound.index, word[j]);
              this.addToIndex(j, charFound.index, word[j], Direction.LR);
            }
          }
        }
      }
    }

    return;
  }

  addToIndex(listIndex: number, charIndex: number, char: string, direction: Direction) {
    // get list
    let list = this.charLists.get(listIndex);

    // list not found
    if(!list){
      // create new list if not found
      this.charLists.set(listIndex, new LinkedList());
      // add char to new list
      this.addToIndex(listIndex, charIndex, char, direction);
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
}

export { WordDb };
