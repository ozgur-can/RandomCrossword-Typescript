import { Direction, ICharNode, ILinkedList } from "./interfaces";

class CharNode implements ICharNode {
  prev?: ICharNode;
  next?: ICharNode;
  value?: string;
  direction: Direction;
  constructor(char: string, direction: Direction) {
    this.value = char;
    this.direction = direction
  }
}

class LinkedList implements ILinkedList {
  head: CharNode;
  constructor() {}

  // add char to last // > 'e'
  addChar(char: string, direction: Direction) {
    if (!this.head) {
      this.head = new CharNode(char, direction);
    } else {
      // current last
      let last: ICharNode = this.getLast();

      // new char object
      let node = new CharNode(char, direction);

      // add new to next of last char
      last.next = node;
      node.prev = last;
    }
  }

  // add word to last // > 'east'
  addWord(word: string, direction: Direction) {
    for (let i = 0; i < word.length; i++) {
      this.addChar(word[i], direction);
    }
  }

  searchChar(char: string, direction: Direction): ICharNode {
    // first
    let current = this.head;

    if (current.value == char && current.direction == direction) {
      // found
      return current;
    } else
      while (current.next !== undefined) {
        // move next
        current = current.next;
        // check again
        if (current.value == char && current.direction == direction) {
          return current;
        }
      }

    // not found
    return undefined;
  }

  // get last node
  getLast(): ICharNode {
    // first
    let current = this.head;

    // go to end of list
    while (current.next !== undefined) current = current.next;

    // last
    return current;
  }

  // print all nodes
  printList() {
    let current = this.head;

    while (current.next !== undefined) {
      // log current
      console.log(current.value);
      current = current.next;
    }
    // log last
    console.log(current.value);
  }
}

export { LinkedList };
