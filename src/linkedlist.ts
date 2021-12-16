import { Direction, ICharNode, ILinkedList } from "./interfaces";

class CharNode implements ICharNode {
  prev?: ICharNode;
  next?: ICharNode;
  value?: string;
  index?: number;
  direction: Direction;
  used?: boolean;
  constructor(char: string, index: number, direction: Direction) {
    this.value = char;
    this.index = index;
    this.direction = direction;
    this.used = false;
  }
}

class LinkedList implements ILinkedList {
  head: CharNode;
  tail: ICharNode;
  length: number;
  constructor() {
    this.length = 0;
  }

  // add char to last // > 'e'
  addCharToLast(char: string, direction: Direction) {
    if (!this.head && !this.tail) {
      this.head = new CharNode(char, 0, direction);
      this.tail = this.head;
      this.length++;
    } else {
      // current last
      // let last: ICharNode = this.getLast();
      let last = this.tail;

      // new char object
      let node = new CharNode(char, last.index + 1, direction);

      // add new to next of last char
      last.next = node;
      node.prev = last;
      // set tail
      this.tail = node;
      // update length
      this.length++;
    }
  }

  addCharToHead(char: string, direction: Direction) {
    if (!this.head && !this.tail) {
      this.head = new CharNode(char, 0, direction);
      this.tail = this.head;
      this.length++;
    } else {
      // current head
      let currentHead = this.head;

      // new head
      let newHead: ICharNode = new CharNode(
        char,
        currentHead.index - 1,
        direction
      );

      // set new head
      currentHead.prev = newHead;
      newHead.next = currentHead;
      this.head = newHead;
      //update length
      this.length++;
    }
  }

  // add word to last // > 'east'
  addWord(word: string, direction: Direction) {
    if (direction == Direction.UD)
      for (let i = 0; i < word.length; i++) {
        this.addCharToLast(word[i], direction);
      }
    else {
      console.log("!!! word cannot add L-R dir !!!");
    }
  }

  addToIndex(index: number, char: string, direction: Direction) {
    let head = this.head;
    let tail = this.tail;

    if (!head && !tail) {
      if (index == 0) {
        this.createHeadTail(index, char, direction);
      } else {
        this.createHeadTail();

        let head = this.head;
        let tail = this.tail;

        if (index > head.index && index < tail.index) {
          for (let i = head.index; i < index; i++) {
            // add empty char
            this.addCharToLast("", Direction.None);
          }
          // add new char
          this.addCharToLast(char, direction);
        } else if (index > tail.index) {
          for (let i = tail.index + 1; i < index; i++) {
            // add empty char
            this.addCharToLast("", Direction.None);
          }
          // add new char
          this.addCharToLast(char, direction);
        }
      }
    } else {
      if (index < head.index) {
        for (let i = 0; i < index; i--) {
          // add empty char
          this.addCharToHead("", Direction.None);
        }
        // add new char
        this.addCharToHead(char, direction);
      } else if (index > head.index && index < tail.index) {
        for (let i = head.index; i < index; i++) {
          // add empty char
          this.addCharToLast("", Direction.None);
        }
        // add new char
        this.addCharToLast(char, direction);
      } else if (index > tail.index) {
        for (let i = tail.index; i < index; i++) {
          // add empty char
          this.addCharToLast("", Direction.None);
        }
        // add new char
        this.addCharToLast(char, direction);
      }
    }
  }

  // creates head & tail
  createHeadTail(index?: number, char?: string, direction?: Direction) {
    if (!char && !index && !direction) {
      this.head = new CharNode("", 0, Direction.None);
      this.tail = this.head;
      this.length++;
    } else {
      this.head = new CharNode(char, index, direction);
      this.tail = this.head;
      this.length++;
    }
  }

  searchChar(char: string, used: boolean): ICharNode | undefined {
    // first
    let current = this.head;

    if (current.value == char && current.used == used) {
      // found
      return current;
    } else
      while (current.next !== undefined) {
        // move next
        current = current.next;
        // check again
        if (current.value == char && current.used == used) {
          return current;
        }
      }

    // not found
    return undefined;
  }

  getCharAt(searchIndex: number): ICharNode | undefined {
    // last
    let current = this.tail;

    // go prev until found
    while (current.prev !== undefined) {
      // found > exit
      if (searchIndex == current.index) break;
      // go prev
      else current = current.prev;
    }

    // current now head, index found?
    if (searchIndex == current.index) return current;
    // not found
    else return undefined;
  }
}

export { LinkedList, CharNode };
