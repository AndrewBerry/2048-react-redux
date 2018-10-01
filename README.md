# 2048 with React and Redux


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing
```bash
npm i
```

### Running the Development Build
```bash
npm run start
```

### Deployment
```bash
# Building 2048
npm run build

# Deploying the game to Github Pages
npm run deploy
```

## Features
- PRNG implemented in reducers
- CSS animations

## Built With
- [create-react-app](https://www.npmjs.com/package/create-react-app) - Bootstrapped with Create React App.
- [Redux](https://www.npmjs.com/package/redux) - Game state managed with Redux.
- [lodash.throttle](https://www.npmjs.com/package/lodash.throttle) - Game speed limited using Lodash's `throttle`.
- [prop-types](https://www.npmjs.com/package/prop-types) - Runtime type checking for our React component props.
- [gh-pages](https://www.npmjs.com/package/gh-pages) - Publish to Github Pages.

## License
This project is licensed under the MIT license - see the LICENSE file for details.

## Acknowledgments
This version of 2048 is remake of [Gabriele Cirulli](http://gabrielecirulli.com/)'s [2048](http://git.io/2048). Gabriele's version was originally based on [1024 by Veewo Studio](https://itunes.apple.com/us/app/1024!/id823499224) and conceptually similar to [Threes by Asher Vollmer](http://asherv.com/threes/).