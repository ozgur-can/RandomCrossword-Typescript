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
  let map = null; 

  const button = k.add([
    k.rect(0,0),
    k.text("Shuffle"),
    k.pos(k.center().x, k.height() * 0.2),
    k.area(),
    k.scale(0.5),
    k.origin("center"),
  ]);
  
  k.add([
    k.text("words: seat, east, set, eat, tea"),
    k.color(k.Color.YELLOW),
    k.pos(k.center().x, k.height() * 0.3),
    k.scale(0.25),
    k.origin("center"),
  ])

  k.onClick(() => {
    if (button.isHovering()) {
      map.destroy();
      startGame();
    }
  });

  const boxSize = 40;
  const startGame = () => {
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
      map = addLevel(kaboomLevel, {
        height: boxSize,
        width: boxSize,
        pos: center(),
        // @ts-ignore
        any: (ch, pos) => mapChars(ch, pos),
      });
    } else {
      // no result
    }

  }

  startGame();
});

k.go("main");
