import { Direction } from "./interfaces";

interface ICharNode {
  prev?: CharNode;
  next?: CharNode;
  value?: string;
  direction?: Direction;
}

class CharNode implements ICharNode {}

interface ILinkedList {
  head: CharNode;
}

class LinkedList implements ILinkedList {
  head: CharNode;
  constructor() {}
}
