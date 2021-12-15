import {
  DbAddDirection,
  ICoord,
  IWord,
  IWordDb,
  IWordDbObject,
} from "./interfaces";

class WordDb implements IWordDb {
  chars: Map<string, IWordDbObject>;
  wordCount: number;
  constructor() {
    this.chars = new Map();
    this.wordCount = 0;
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
    let isAdded = false;

    if(typeof charIndexOfNewChar !== "undefined"){
      for (let i = y - charIndexOfNewChar, j = 0; j < word.value.length, i < y - charIndexOfNewChar + word.value.length; i++, j++) {        
        if (!this.checkCoordEmpty(x, i)) {
          continue;
        } else {      
          // if(!this.checkCoordEmpty(x - 1, i) || (!this.checkCoordEmpty(x + 1, i))){
          //   break;
          // }
          this.chars.set(`${x}*${i}`, {
            char: word.value[j],
            parent: word,
            direction: DbAddDirection.upToDown,
          });
          isAdded = true;
        }
      }

      if(isAdded){
        // update unused char of word
        word.useChar(word.value[charIndexOfNewChar]);
        this.useChar(x, y);
        this.wordCount++;
      }

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
    let isAdded = false;
    if (typeof charIndexOfNewChar !== "undefined") {
      for (let i = x - charIndexOfNewChar, j = 0; j < word.value.length, i < x - charIndexOfNewChar + word.value.length; i++, j++) {
        if (!this.checkCoordEmpty(i, y)) {
          continue;
        } else {
          // if(!this.checkCoordEmpty(i, y - 1) || (!this.checkCoordEmpty(i, y - 2))){
          //   break;
          // }
          this.chars.set(`${i}*${y}`, {
            char: word.value[j],
            parent: word,
            direction: DbAddDirection.leftToRight,
          });
          isAdded = true;
        }
      }

      if(isAdded){
        // update unused char of word
        word.useChar(word.value[charIndexOfNewChar]);
        this.useChar(x, y);
        this.wordCount++;
      }
      
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

  checkCoordEmptyLoop(x: number, y: number, wordLength: number, direction: DbAddDirection): boolean {
      let result = false;

      if(direction == DbAddDirection.leftToRight){
        for (let i = x - 1; i < wordLength + 1; i++) {
          if(!this.checkCoordEmpty(i, y)){
            result = true;
            break;
          }
        }
      }

      if(direction == DbAddDirection.upToDown){
        for (let i = y - 1; i < wordLength + 1; i++) {
          if(!this.checkCoordEmpty(x, i)){
            result = true;
            break;
          }
        }
      }

      return result;
  }

  existSameChar(charToSearch: string, wordLength: number): boolean | ICoord {
    let exist: boolean | ICoord = false;

    for (const char of this.chars) {
      let charCoord = char[0].split("*"); // 2*0 > `2`, `0`
      let wordObject = char[1]; // char, parent, direction
      let unusedCharIndex = wordObject.parent.unusedChars.indexOf(charToSearch);

      if (charToSearch == wordObject.char && unusedCharIndex != -1 && this.areAdjacentCharsUnused(wordObject.parent, charToSearch)) {       
        let x = Number(charCoord[0]);
        let y = Number(charCoord[1]);
        let direction = wordObject.direction;

        let chk = this.checkCoordEmptyLoop(x, y, wordLength, direction);
        
        if(chk)
          exist = { x, y, direction };
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
      console.log(char[0], char[1]);
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
