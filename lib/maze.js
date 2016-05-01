'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eager = require('./eager.js');

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maze = function () {
  function Maze() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

    _classCallCheck(this, Maze);

    this.grid = (0, _eager.range)(0, size - 1).map(function (row) {
      return (0, _eager.range)(0, size - 1).map(function (col) {
        return new Location({ row: row, col: col });
      });
    });

    for (var i = 0; i < size - 1; ++i) {
      this.initializeEachButLastRow(this.grid[i]);
    }

    this.initializeLastRow();
  }

  _createClass(Maze, [{
    key: 'print',
    value: function print() {
      console.log('*' + [].concat(_toConsumableArray((0, _eager.range)(1, this.grid.length))).map(function () {
        return '-*';
      }).join(''));
      this.grid.forEach(function (row) {
        console.log('|' + row.map(function (location) {
          return location.right ? '  ' : ' |';
        }).join(''));
        console.log('*' + row.map(function (location) {
          return location.down ? ' *' : '-*';
        }).join(''));
      });
    }
  }, {
    key: 'initializeEachButLastRow',
    value: function initializeEachButLastRow(row) {
      this.connectHalfRegions(row);
      this.connectDown(row);
    }
  }, {
    key: 'initializeLastRow',
    value: function initializeLastRow() {
      this.connectAllRegions(this.grid[this.grid.length - 1]);
    }
  }, {
    key: 'groupBySet',
    value: function groupBySet(row) {
      var _row = _toArray(row);

      var first = _row[0];

      var rest = _row.slice(1);

      var regions = [[first]];

      return rest.reduce(function (regions, eachLocation) {
        var lastRegion = regions[regions.length - 1];
        var lastRegionSet = lastRegion[0].set;

        if (lastRegionSet.has(eachLocation)) {
          lastRegion.push(eachLocation);
        } else {
          regions.push([eachLocation]);
        }
        return regions;
      }, [[first]]);
    }
  }, {
    key: 'maybeConnect',
    value: function maybeConnect(location1, location2) {
      if (Math.random() > 0.5) {
        this.connect(location1, location2);
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'connect',
    value: function connect(location1, location2) {
      if (location1.set.has(location2)) {
        throw 'cannot connect ' + location1 + ' to ' + location2 + ', they are already in the same set';
      } else if (location1.row === location2.row) {
        if (location1.col === location2.col - 1) {
          location1.right = location2;
          location2.left = location1;
        } else if (location1.col === location2.col + 1) {
          location1.left = location2;
          location2.right = location1;
        } else {
          throw 'cannot connect ' + location1 + ' to ' + location2;
        }
      } else if (location1.col === location2.col) {
        if (location1.row === location2.row - 1) {
          location1.down = location2;
          location2.up = location1;
        } else if (location1.row === location2.row + 1) {
          location1.up = location2;
          location2.down = location1;
        } else {
          throw 'cannot connect ' + location1 + ' to ' + location2;
        }
      } else {
        throw 'cannot connect ' + location1 + ' to ' + location2;
      }

      // merge sets
      location2.set.forEach(function (location) {
        location.set = location1.set;
        location1.set.add(location);
      });
    }
  }, {
    key: 'firstOfEachRegion',
    value: function firstOfEachRegion(regions) {
      return regions.map(function (region) {
        return region[0];
      });
    }
  }, {
    key: 'lastOfEachRegion',
    value: function lastOfEachRegion(regions) {
      return regions.map(function (region) {
        return region[region.length - 1];
      });
    }
  }, {
    key: 'zipWithPairs',
    value: function zipWithPairs(fn, row) {
      var regions = this.groupBySet(row);
      var firsts = this.firstOfEachRegion(regions).slice(1, regions.length);
      var lasts = this.lastOfEachRegion(regions).slice(0, regions.length - 1);

      return (0, _eager.zipWith)(fn, firsts, lasts); // force lazy iteration
    }
  }, {
    key: 'connectHalfRegions',
    value: function connectHalfRegions(row) {
      var _this = this;

      this.zipWithPairs(function (a, b) {
        return _this.maybeConnect(a, b);
      }, row);
    }
  }, {
    key: 'connectAllRegions',
    value: function connectAllRegions(row) {
      var _this2 = this;

      this.zipWithPairs(function (a, b) {
        return _this2.connect(a, b);
      }, row);
    }
  }, {
    key: 'connectDown',
    value: function connectDown(row) {
      var _this3 = this;

      var regions = this.groupBySet(row);

      regions.forEach(function (region) {
        var randomLocation = region[Math.floor(Math.random() * region.length)];
        var downLocation = _this3.grid[randomLocation.row + 1][randomLocation.col];

        _this3.connect(randomLocation, downLocation);
      });
    }
  }]);

  return Maze;
}();

exports.default = Maze;

var Location = function () {
  function Location(_ref) {
    var row = _ref.row;
    var col = _ref.col;

    _classCallCheck(this, Location);

    Object.assign(this, { row: row, col: col });

    this.set = new Set([this]);
  }

  _createClass(Location, [{
    key: 'toString',
    value: function toString() {
      return '' + this.row + '-' + this.col;
    }
  }]);

  return Location;
}();