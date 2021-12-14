import {
  DbAddDirection,
  ICoord,
  IWord,
  IWordDb,
  IWordDbObject,
} from "./interfaces";

class WordDb implements IWordDb {
  chars: Map<string, IWordDbObject>;
  constructor() {
    this.chars = new Map();
  }
  addToDb(word: IWord, charIndexOfNewChar: number, oldCharData: ICoord) {
    // db is empty
    if (this.chars.size == 0) {
      let random = Math.random();

      // add first word L-R / U-D randomly
      if(random > 0.5)
      this.addLeftToRight(word, 0, 0);

      else
      this.addUpToDown(word, 0, 0);

    }
    // db is not empty
    else {      
      // old L-R, new U-D
      if (oldCharData.direction == DbAddDirection.leftToRight) {        
        this.addUpToDown(
          word,
          oldCharData.x,
          oldCharData.y,
          charIndexOfNewChar
        );
      }

      // old U-D, new L-R
      if (oldCharData.direction == DbAddDirection.upToDown) {        
        this.addLeftToRight(
          word,
          oldCharData.x,
          oldCharData.y,
          charIndexOfNewChar
        );
      }
    }
  }

  addUpToDown(word: IWord, x: number, y: number, charIndexOfNewChar?: number) {   
    if(typeof charIndexOfNewChar !== "undefined"){
      for (let i = y - charIndexOfNewChar, j = 0; j < word.value.length, i < y - charIndexOfNewChar + word.value.length; i++, j++) {        
        if (!this.checkCoordEmpty(x, i)) {
          continue;
        } else {        
          this.chars.set(`${x}*${i}`, {
            char: word.value[j],
            parent: word,
            direction: DbAddDirection.upToDown,
          });
        }
      }

      // update unused char of word
      word.useChar(word.value[charIndexOfNewChar]);
      this.useChar(x, y);

    }
    else {
      for (let i = y; i < word.value.length; i++) {
        this.chars.set(`${x}*${i}`, {
          char: word.value[i],
          parent: word,
          direction: DbAddDirection.upToDown,
        });
      }
    }

  }

  addLeftToRight(word: IWord, x: number, y: number, charIndexOfNewChar?: number) {
    if (typeof charIndexOfNewChar !== "undefined") {
      for (let i = x - charIndexOfNewChar, j = 0; j < word.value.length, i < x - charIndexOfNewChar + word.value.length; i++, j++) {
        if (!this.checkCoordEmpty(i, y)) {
          continue;
        } else {
          this.chars.set(`${i}*${y}`, {
            char: word.value[j],
            parent: word,
            direction: DbAddDirection.leftToRight,
          });
        }
      }

      // update unused char of word
      word.useChar(word.value[charIndexOfNewChar]);
      this.useChar(x, y);
      
    } else {
      for (let i = x; i < word.value.length; i++) {
        this.chars.set(`${i}*${y}`, {
          char: word.value[i],
          parent: word,
          direction: DbAddDirection.leftToRight,
        });
      }
    }
  }

  checkCoordEmpty(x: number, y: number): boolean {
    return !this.chars.has(`${x}*${y}`);
  }

  existSameChar(charToSearch: string): boolean | ICoord {
    let exist: boolean | ICoord = false;

    for (const char of this.chars) {
      let charCoord = char[0].split("*"); // 2*0 > `2`, `0`
      let wordObject = char[1]; // char, parent, direction
      let unusedCharIndex = wordObject.parent.unusedChars.indexOf(charToSearch);
      
      if (charToSearch == wordObject.char && unusedCharIndex != -1 && this.areAdjacentCharsUnused(wordObject.parent, charToSearch)) {
        exist = {
          x: Number(charCoord[0]),
          y: Number(charCoord[1]),
          direction: char[1].direction,
        };
        break;
      }
    }

    return exist;
  }
  
  areAdjacentCharsUnused(word: IWord, charToSearch: string): boolean {
    let charIndex = word.value.indexOf(charToSearch);
    
    if(charIndex == 0 && word.checkCharUnused(charIndex + 1)){
      return true;
    }
    else if(charIndex == word.value.length - 1 && word.checkCharUnused(charIndex - 1)){
      return true;
    } 
    else if((charIndex > 0 || charIndex < word.value.length - 1) && word.checkCharUnused(charIndex - 1) && word.checkCharUnused(charIndex + 1)){
      return true
      }
    else return false;
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
    
    for (const char of this.chars) {
      console.log(char);
    }
  }

  useChar(x: number, y: number) {
    let char = this.chars.get(`${x}*${y}`);

    if (char) {
      // remove the used existing char from db
      char.parent.useChar(char.char);
    }
  }
}

export { WordDb };
