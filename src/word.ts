import { IWord } from "./interfaces";

class Word implements IWord {
  value: string;
  unusedChars: string[]; // 'e', 'a', 's', 't'
  constructor(value: string) {
    this.value = value;
    this.unusedChars = value.split("");
  }

  checkCharUnused(charIndex: number): boolean {
    if (this.value[charIndex] && this.unusedChars[charIndex]) {
      return true;
    } else {
      return false;
    }
  }

  useChar(charToSearch: string) {
    this.unusedChars = this.unusedChars.filter((char) => char != charToSearch);
  }
}

export { Word };
