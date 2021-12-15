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
  length: number;
  constructor() {
    this.length = 0;
  }

  // add char to last // > 'e'
  addCharToLast(char: string, direction: Direction) {
    if (!this.head) {
      this.head = new CharNode(char, 0, direction);
    } else {
      // current last
      let last: ICharNode = this.getLast();

      // new char object
      let node = new CharNode(char, last.index + 1, direction);

      // add new to next of last char
      last.next = node;
      node.prev = last;
      // update length
      this.length++;
    }
  }

  addCharToHead(char: string, direction: Direction) {
    if (!this.head) {
      this.head = new CharNode(char, 0, direction);
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
    }
  }

  addCharPrev(char: string, node: ICharNode, direction: Direction) {
    // create prev node
    let prevNode: ICharNode = new CharNode(char, node.index - 1, direction);

    // set prev and next
    node.prev = prevNode;
    prevNode.next = node;

    // update length
    this.length++;
  }

  addCharNext(char: string, node: ICharNode, direction: Direction) {
    // create next node
    let nextNode: ICharNode = new CharNode(char, node.index + 1, direction);

    // set prev and next
    node.next = nextNode;
    nextNode.prev = node;

    // update length
    this.length++;
  }

  // add word to last // > 'east'
  addWord(word: string, direction: Direction) {
    for (let i = 0; i < word.length; i++) {
      this.addCharToLast(word[i], direction);
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

  // get last node
  getLast(): ICharNode | undefined {
    // first
    let current = this.head;

    // go to end of list
    while (current.next !== undefined) current = current.next;

    // last
    return current;
  }

  getCharAt(searchIndex: number): ICharNode | undefined {
    // first
    let current = this.head;

    if (searchIndex < 0 || searchIndex < current.index) {
      // go to prev
      for (let i = current.index; i > searchIndex; i--) current = current.prev;
      return current;
    } else if (searchIndex > current.index) {
      // go to next
      for (let i = searchIndex; i < current.index; i++) current = current.next;
      return current;
    } else {
      // return
      return current;
    }
  }

  // print all nodes
  printList() {
    let line = "";
    let current = this.head;

    while (current.prev !== undefined) {
      current = current.prev;
    }

    while (current.next !== undefined) {
      line += current.value;
      // console.log(current.value);
      current = current.next;
    }

    line += current.value;

    console.log(line);
  }
}

export { LinkedList, CharNode };
