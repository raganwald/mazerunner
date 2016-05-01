'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;
exports.zipWith = zipWith;

var _lazy = require('./lazy.js');

var lazy = _interopRequireWildcard(_lazy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function range() {
  var from = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var to = arguments.length <= 1 || arguments[1] === undefined ? from : arguments[1];

  return [].concat(_toConsumableArray(lazy.range(from, to)));
}

function zipWith(zipper) {
  for (var _len = arguments.length, iterables = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    iterables[_key - 1] = arguments[_key];
  }

  return [].concat(_toConsumableArray(lazy.zipWith.apply(lazy, [zipper].concat(iterables))));
}