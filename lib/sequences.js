"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.take = take;
exports.destructure = destructure;
exports.range = range;
exports.zipWith = zipWith;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = [take, range, zipWith].map(regeneratorRuntime.mark);

function take(numberToTake, iterable) {
  var iterator, i, _iterator$next, done, value;

  return regeneratorRuntime.wrap(function take$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          iterator = iterable[Symbol.iterator]();
          i = 0;

        case 2:
          if (!(i < numberToTake)) {
            _context.next = 12;
            break;
          }

          _iterator$next = iterator.next();
          done = _iterator$next.done;
          value = _iterator$next.value;

          if (done) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return value;

        case 9:
          ++i;
          _context.next = 2;
          break;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function destructure(iterable) {
  var iterator = iterable[Symbol.iterator]();

  var _iterator$next2 = iterator.next();

  var done = _iterator$next2.done;
  var value = _iterator$next2.value;


  if (!done) {
    return { first: value, rest: iterator };
  }
}

function range() {
  var from = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var to = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var number;
  return regeneratorRuntime.wrap(function range$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          number = from;

          if (!(to == null)) {
            _context2.next = 9;
            break;
          }

        case 2:
          if (!true) {
            _context2.next = 7;
            break;
          }

          _context2.next = 5;
          return number++;

        case 5:
          _context2.next = 2;
          break;

        case 7:
          _context2.next = 14;
          break;

        case 9:
          if (!(number <= to)) {
            _context2.next = 14;
            break;
          }

          _context2.next = 12;
          return number++;

        case 12:
          _context2.next = 9;
          break;

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function zipWith(zipper) {
  for (var _len = arguments.length, iterables = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    iterables[_key - 1] = arguments[_key];
  }

  var iterators, pairs, dones, values;
  return regeneratorRuntime.wrap(function zipWith$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          iterators = iterables.map(function (i) {
            return i[Symbol.iterator]();
          });

        case 1:
          if (!true) {
            _context3.next = 9;
            break;
          }

          pairs = iterators.map(function (j) {
            return j.next();
          }), dones = pairs.map(function (p) {
            return p.done;
          }), values = pairs.map(function (p) {
            return p.value;
          });

          if (!(dones.indexOf(true) >= 0)) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("break", 9);

        case 5:
          _context3.next = 7;
          return zipper.apply(undefined, _toConsumableArray(values));

        case 7:
          _context3.next = 1;
          break;

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked[2], this);
};