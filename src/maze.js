import { range, zipWith } from './eager.js'

export default class Maze {
  constructor (size = 10) {

    this.grid = range(0, size-1).map(
      (row) => range(0, size-1).map(
        (col) => new Location({row, col})
      )
    );

    for(let i = 0; i < (size-1); ++i) {
      this.initializeEachButLastRow(this.grid[i]);
    }

    this.initializeLastRow();
  }

  print () {
    console.log(`*${[...range(1, this.grid.length)].map(() => '-*').join('')}`);
    this.grid.forEach((row) => {
      console.log(`|${row.map((location) => location.right ? '  ' : ' |').join('')}`);
      console.log(`*${row.map((location) => location.down ? ' *' : '-*').join('')}`);
    });
  }

  initializeEachButLastRow (row) {
    this.maybeConnectAcrossRow(row);
    this.connectDown(row);
  }

  initializeLastRow () {
    this.connectAcrossRow(this.grid[this.grid.length - 1]);
  }

  maybeConnect (location1, location2) {
    if (Math.random() > 0.5) {
      this.connect(location1, location2);
      return true;
    } else {
      return false;
    }
  }

  connect (location1, location2) {
    if (location1.set.has(location2)) {
      throw `cannot connect ${location1} to ${location2}, they are already in the same set`;
    } else if (location1.row === location2.row) {
      if (location1.col === location2.col - 1) {
        location1.right = location2;
        location2.left = location1;
      } else if (location1.col === location2.col + 1) {
        location1.left = location2;
        location2.right = location1;
      } else {
        throw `cannot connect ${location1} to ${location2}`;
      }
    } else if (location1.col === location2.col) {
      if (location1.row === location2.row - 1) {
        location1.down = location2;
        location2.up = location1;
      } else if (location1.row === location2.row + 1) {
        location1.up = location2;
        location2.down = location1;
      } else {
        throw `cannot connect ${location1} to ${location2}`;
      }
    } else {
      throw `cannot connect ${location1} to ${location2}`;
    }

    // merge sets
    location2.set.forEach(function (location) {
      location.set = location1.set;
      location1.set.add(location);
    });
  }

  zipWithPairs (fn, row) {
    const firsts = row.slice(1, row.length);
    const lasts = row.slice(0, row.length - 1);

    return zipWith(fn, firsts, lasts); // force lazy iteration
  }

  maybeConnectAcrossRow (row) {
    this.zipWithPairs((a, b) => { a.set.has(b) ? null : this.maybeConnect(a, b) }, row);
  }

  connectAcrossRow (row) {
    this.zipWithPairs((a, b) => { a.set.has(b) ? null : this.connect(a, b) }, row);
  }

  groupedBySet (row) {
    return row.reduce((groupedBySet, location) => {
      const existingGroup = groupedBySet.find((group) => group[0].set.has(location));

      if (existingGroup) {
        existingGroup.push(location);
      } else {
        groupedBySet.push([location]);
      }
      return groupedBySet;
    }, []);
  }

  connectDown (row) {
    const groupedBySet = this.groupedBySet(row);

    groupedBySet.forEach((group) => {
      group.forEach((location) => {
        const downLocation = this.grid[location.row + 1][location.col];

        this.maybeConnect(location, downLocation);
      });

      if (group.every((location) => location.down === undefined)) {
        const randomLocation = group[Math.floor(Math.random() * group.length)];
        const downLocation = this.grid[randomLocation.row + 1][randomLocation.col];

        this.connect(randomLocation, downLocation);
      }
    });
  }
}

class Location {
  constructor ({row, col}) {
    Object.assign(this, {row, col});

    this.set = new Set([this]);
  }

  toString () {
    return '' + this.row + '-' + this.col;
  }
}
