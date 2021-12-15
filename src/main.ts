import { Direction } from "./interfaces";
import { LinkedList } from "./linkedlist";
import { WordPuzzle } from "./wordpuzzle";

// "seat", "tea", "east", "eat", "tea"

// let testList = new LinkedList();
// testList.addWord("east", Direction.UD);
// testList.addCharToHead('x', Direction.UD);
// testList.addCharToLast('f', Direction.UD);

const words: string[] = ["east", "seat", "set"];
const puzzle = new WordPuzzle(words);
// let index = 0;
// puzzle.wordDb.charLists.get(index).printList()
// puzzle.printWordTable();

// console.log(puzzle.wordDb.charLists.get(index).head.value);
// console.log(puzzle.wordDb.charLists.get(index).head.next.value);
// console.log(puzzle.wordDb.charLists.get(index).head.next.next.value);
// console.log(puzzle.wordDb.charLists.get(index).head.next.next.next.value);

// let cur = puzzle.wordDb.charLists.get(3).head;

// while(cur.next != undefined){
//     console.log(cur.value, cur.index)
//     cur = cur.next;
// }
// console.log(cur.value, cur.index)