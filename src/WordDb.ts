import {
  DbAddDirection,
  Direction,
  ICharNode,
  ICoord,
  ILinkedList,
  IWord,
  IWordDb,
} from "./interfaces";
import { CharNode, LinkedList } from "./linkedlist";

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

      if (random > 0) {
        console.log("L-R");

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
        console.log("U-D");

        // create list
        const list = new LinkedList();

        // add word in LR dir
        list.addCharToLast(word, Direction.UD);

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

  useChar(x: number, y: number) {
    // let char = this.chars.get(`${x}*${y}`);
    let char;

    if (char) {
      // remove the used existing char from db
      char.parent.useChar(char.char);
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
        let charFound = listFound.searchChar(charToAdd, false);

        // char found
        if (charFound) {
          // old word is in Left-Right
          if (charFound.direction == Direction.LR) {
            for (
              let j = charFound.index - charIndex, t = 0;
              j < charFound.index - charIndex + word.length, t < word.length;
              j++, t++
            ) {

              if (charFound.index == j) {
                continue;
              } else {
                // console.log(i, j, currentChar, charFound.value);
                if (charFound.index > j) {
                  let currentChar = word[- 1 - j];
                  // add to head
                  listFound.addCharToHead(currentChar, Direction.UD);
                }

                if (charFound.index < j) {
                  let currentChar = word[t];
                  // add to last
                  listFound.addCharToLast(currentChar, Direction.UD);
                }
              }
              // add downward
              // if(charFound.index < j){
              //   // console.log('ekle', curChar);
              //   // listFound.addCharNext(currentChar, charFound, Direction.UP);\
              //   listFound.addCharGivenIndex(j, currentChar, Direction.UP);
              // }
              // // add upward
              // else if(charFound.index > j) {
              //   // console.log('ekle2', curChar);
              //   // listFound.addCharPrev(currentChar, charFound, Direction.UP);
              // }
            }
          }

          // old word is in Up-Down
          else if (charFound.direction == Direction.UD) {
            let listPrev = this.getSpecificList(i - 1);
            let listNext = this.getSpecificList(i - 1);

            if (listPrev && listPrev.getCharAt(charFound.index)) {
              return false;
            } else if (listNext && listNext.getCharAt(charFound.index)) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    }
  }

  getSpecificList(index: number): ILinkedList | undefined {
    return this.charLists.get(index);
  }

  printItems() {
    let arr = [[]];

    // for (let i = 0; i < 4; i++) {
    //   let temp = [];
    //   for (let j = 0; j < 4; j++) {
    //     temp.push("   ");
    //   }
    //   arr.push(temp);
    // }

    // for (const char of this.chars) {
    //   let coords = char[0].split("*");
    //   let cX = Number(coords[0]);
    //   let cY = Number(coords[1]);

    //   arr[cY][cX] = ` ${char[1].char} `;
    // }

    // console.log(arr);

    // for (const list of this.charLists) {
    //   console.log(list[1]);
    // }

    // console.log(this.charLists.get(0));

    console.log(this.charLists.get(0).printList());
    // for (let i = 0; i < this.charLists.get(0).length; i++) {
    // }
  }
}

export { WordDb };
