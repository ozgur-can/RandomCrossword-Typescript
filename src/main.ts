import { WordPuzzle } from "./wordpuzzle";
import _ from "lodash";

// "seat", "tea", "east", "eat", "tea"

// shuffle
const words: string[] = _.shuffle(["east", "set", "tea"]);
const puzzle = new WordPuzzle(words);

// result
// let charMap = puzzle.wordDb.getCharmap();

let kaboomLevel = puzzle.wordDb.generateKaboomLevel();
