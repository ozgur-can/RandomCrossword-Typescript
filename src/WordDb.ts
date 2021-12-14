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
      if (!this.checkCoordEmpty(x, i)) {
        continue;
      } else {
        this.chars.set(`${x}*${i}`, {
          char: word.value[i],
          parent: word,
          direction: DbAddDirection.upToDown,
        });
      }
    }
    // update unused char of word
    word.useChar(charIndexOfNewChar);
    this.useChar(x, y);
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
    return !this.chars.has(`${x}*${y}`);
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
    let arr = [[]];

    for (let i = 0; i < 4; i++) {
      let temp = [];
      for (let j = 0; j < 4; j++) {
        temp.push("   ");
      }
      arr.push(temp);
    }

    for (const char of this.chars) {
      let coords = char[0].split("*");
      let cX = Number(coords[0]);
      let cY = Number(coords[1]);

      arr[cY][cX] = ` ${char[1].char} `;
    }

    console.log(arr);
  }

  useChar(x: number, y: number) {
    let char = this.chars.get(`${x}*${y}`);

    if (char) {
      // remove the used existing char from db
      char.parent.useChar(char.parent.value.indexOf(char.char));
    }
  }
}

export { WordDb };
