# mazerunner

Builds a maze in ES6 using [Eller's Algorithm](http://www.neocomputer.org/projects/eller.html) as described by [Jamis Buck](http://weblog.jamisbuck.org/2010/12/29/maze-generation-eller-s-algorithm).

### setup

```
npm install --save-dev babel-cli

# package.json
{
  "name": "mazerunner",
  "version": "1.0.0",
  "scripts": {
    "build": "babel src -d lib"
  },
  "devDependencies": {
    "babel-cli": "~6.7.7",
    "babel-preset-es2015": "~6.6.0"
  }
}

# building
npm run build

# install the cli and this preset
npm install --save-dev babel-cli babel-preset-es2015

# make a .babelrc (config file) with the preset
echo '{ "presets": ["es2015"] }' > .babelrc
```

### running it

```
npm run build && node /Users/raganwald/github/mazerunner/lib/index.js


*-*-*-*-*-*-*-*-*-*-*
|   |   | | |       |
* *-* *-* * * *-*-*-*
|         | |       |
*-*-* *-*-* *-* *-*-*
|   |   |     | | | |
*-* *-* *-*-* * * * *
| | | | |   |     | |
* * * * * *-*-* *-* *
|   | |       |     |
*-* * *-*-* *-*-*-* *
|   | | |   | | | | |
* *-* * *-* * * * * *
| | |     |   | |   |
* * *-*-* *-* * * *-*
| |     |   |   | | |
* *-*-* * *-* *-* * *
|     | |         | |
*-*-* * *-* *-*-*-* *
|                   |
*-*-*-*-*-*-*-*-*-*-*
```
