import { Direction, ICharNode, ILinkedList } from "./interfaces";

class CharNode implements ICharNode {
  prev?: ICharNode;
  next?: ICharNode;
  value?: string;
  constructor(char: string) {
    this.value = char;
  }
}

class LinkedList implements ILinkedList {
  head: CharNode;
  constructor() {}

  // add char to last
  addToLast(char: string) {
    if(!this.head){
      this.head = new CharNode(char);
    } else {
      // current last
      let last: ICharNode = this.getLast();

      // new char object
      let node = new CharNode(char);

      // add new to next of last char
      last.next = node;
      node.prev = last;
    }
  }
  
  getLast(): ICharNode {
    // first
    let current = this.head;

    // go to end of list
    while(current.next !== undefined) current = current.next;

    // last
    return current;
  }

  printList() {
      let current = this.head;

      while(current.next !== undefined){
        // log current
        console.log(current.value);
        current = current.next;
      }
      // log last
      console.log(current.value);
  }
}

export { LinkedList };
