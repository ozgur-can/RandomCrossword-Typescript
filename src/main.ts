import _ from "lodash";
import { KaboomCtx, Vec2 } from "./kaboom/types";
import { WordPuzzle } from "./puzzle/wordpuzzle";

let k: KaboomCtx;

//@ts-ignore
k = kaboom({
  global: true,
  crisp: true,
  background: [57, 110, 176],
  scale: 1.25
});

k.scene("main", () => {
  const boxSize = 40;

  // shuffle array
  const words: string[] = _.shuffle(["east", "set", "tea", "seat", "eat"]); // words > "seat", "tea", "east", "eat", "tea"
  const puzzle = new WordPuzzle(words);

  // result for console
  // let charMap = puzzle.wordDb.getCharmap();

  let kaboomLevel = puzzle.wordDb.generateKaboomLevel();

  // show if not "?"
  const mapChars = (ch: string, pos: Vec2) => {
    if (ch != "?") {
      return [
        rect(boxSize, boxSize),
        outline(2),
        area(),
        text(ch, {
          size: boxSize,
          width: boxSize,
          transform: {
            pos: vec2((pos.x + boxSize) / 5, pos.y),
            color: rgb(rand(255), rand(255), rand(255)),
          },
        }),
      ];
    }
  };

  if (kaboomLevel) {
    addLevel(kaboomLevel, {
      height: boxSize,
      width: boxSize,
      pos: center(),
      // @ts-ignore
      any: (ch, pos) => mapChars(ch, pos),
    });
  } else {
    // no result
  }
});

k.go("main");
