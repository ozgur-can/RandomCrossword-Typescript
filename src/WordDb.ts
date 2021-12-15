import {
  DbAddDirection,
  ICoord,
  ILinkedList,
  IWord,
  IWordDb,
} from "./interfaces";

class WordDb implements IWordDb {
  charLists: Map<number, ILinkedList>;
  constructor() {
    this.charLists = new Map();
  }
  addToDb(word: IWord, charIndexOfNewChar: number, oldCharData: ICoord) {
    // db is empty
    if (this.charLists.size == 0) {
      // let random = Math.random();

      // add first word L-R / U-D randomly
      // if(random > 0.5)
      // this.addLeftToRight(word, 0, 0);
      // else
      // this.addUpToDown(word, 0, 0);
      
      // this.charLists.set(this.charLists.size,)
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
    
    for (const char of this.charLists) {
      console.log(char[0], char[1]);
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
}

export { WordDb };
