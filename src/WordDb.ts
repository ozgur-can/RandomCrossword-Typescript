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
      this.addLeftToRight(word, 0, 0);
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
      }
    }
  }

  addUpToDown(word: IWord, x: number, y: number, charIndexOfNewChar?: number) {
    for (let i = y - charIndexOfNewChar; i < word.value.length; i++) {
      this.chars.set(`${x}*${i}`, {
        char: word.value[charIndexOfNewChar],
        parent: word,
        direction: DbAddDirection.upToDown,
      });
    }
    // update unused char of word
    word.useChar(charIndexOfNewChar);
  }

  addLeftToRight(word: IWord, x: number, y: number) {
    for (let i = x; i < word.value.length; i++) {
      this.chars.set(`${i}*${y}`, {
        char: word.value[i],
        parent: word,
        direction: DbAddDirection.leftToRight,
      });
    }
  }

  checkCoordEmpty(x: number, y: number): boolean {
    return this.chars.has(`${x}*${y}`);
  }

  existSameChar(charToSearch: string): boolean | ICoord {
    let exist: boolean | ICoord = false;

    for (const char of this.chars) {
      let charIndex = char[0].split("*"); // 2*0 > `2`, `0`
      let wordObject = char[1]; // char, parent, direction
      let unusedCharIndex = wordObject.parent.unusedChars.indexOf(charToSearch);
      if (charToSearch == wordObject.char && unusedCharIndex != -1) {
        exist = {
          x: Number(charIndex[0]),
          y: Number(charIndex[1]),
          direction: DbAddDirection.leftToRight,
        };
        break;
      }
    }

    return exist;
  }

  printItems() {
    for (const char of this.chars) {
      console.log(char);
    }
  }
}

export { WordDb };
