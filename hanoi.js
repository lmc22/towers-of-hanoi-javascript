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
      console.log(`Start from ${res1}`);

      reader.question("Select destination stack: ", (res2) => {
        let endTowerIdx = res2;
        console.log(`Start from ${res2}`);

        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

}

let game = new Hanoi([[3, 2, 1], [], []]);
