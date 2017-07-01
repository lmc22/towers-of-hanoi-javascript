const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Hanoi {
  constructor(stacks) {
    // this.stacks = [[3, 2, 1], [], []];
    this.stacks = stacks;
  }

  promptMove(callback) {
    // 1. print stacks
    this.print();

    // 2. ask user to/from
    reader.question("Select starting stack: ", (res1) => {
      let startTowerIdx = res1;

      reader.question("Select destination stack: ", (res2) => {
        let endTowerIdx = res2;
        console.log(`Start from ${res1}`);
        console.log(`Start from ${res2}`);
        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    //  if the disc in the starting position is smaller than the disc in the
    //  ending position, it is a valid move.
    const stack = this.stacks,
          startLast = stack[startTowerIdx].length-1,
          endLast = stack[endTowerIdx].length-1;

    let startTop = stack[startTowerIdx][startLast],
        endTop = stack[endTowerIdx][endLast],
        validity = (startTop > endTop) ? false : true;

    console.log(`Valid move? ${validity}`);
    return validity;
  }


  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      let moveDisc = this.stacks[startTowerIdx].pop();
      this.stacks[endTowerIdx].push(moveDisc);
      this.print();
      return true;
    } else {
      return false;
    }
  }


  print() {
    console.log(this.stacks);
    // console.log(JSON.stringify(this.stacks));
  }

  gameWon() {
    for (let i = 1; i < this.stacks.length; i++) {
      if (this.stacks[i].length === 3) {
        return true;
      } else {
        return false;
      }
    }
  }

  run(completionCallback) {
    this.promptMove( (startIdx, endIdx) => {
      this.move(startIdx, endIdx);

      if (this.gameWon()) {
        completionCallback();
        reader.close();
      } else {
        this.run(completionCallback);
      }
    });
  }
}

let game = new Hanoi([[3, 2, 1], [], []]);
game.run( () => console.log("Game Complete!"));
