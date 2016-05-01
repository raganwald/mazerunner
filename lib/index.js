"use strict";

require("babel-polyfill");

var _maze = require("./maze.js");

var _maze2 = _interopRequireDefault(_maze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var m = new _maze2.default();

m.print();