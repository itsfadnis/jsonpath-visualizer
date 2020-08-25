<h1 align="center">jsonpath-visualizer</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/itsfadnis" target="_blank">
    <img alt="Twitter: itsfadnis" src="https://img.shields.io/twitter/follow/itsfadnis.svg?style=social" />
  </a>
</p>

> Visualize JSON with JSONPath querying

### ✨ [Demo](https://vigorous-euler-fd1608.netlify.app/)

## What it does?
- Reads a JSON file and renders a beautiful tree visualization
- Supports [JSONPath](https://restfulapi.net/json-jsonpath/) querying to highlight matching nodes
- Allows inspection of individual nodes/node-ranges
- Theming!: Choose from 37 awesome themes styled with [base16](https://github.com/chriskempson/base16)

## Implementation
- Built with TypeScript, React.js with Redux state management
- Tree rendering done using [react-json-tree](https://github.com/itsfadnis/react-json-tree). A fork of the react tree component used by redux-devtools(https://github.com/reduxjs/redux-devtools/blob/master/packages/)
- Progressive rendering, to handle large JSON.  Nodes are rendered upto a limit, while the rest of the nodes are rendered as node ranges. Matching nodes are highlighted and expanded. Matching node-ranges are highlighted and expandable. The idea is to highlight matching nodes/node paths, without having to render way too many nodes.
- JSON files are read using the [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

## Further optimization?
- JSON streaming for huge files that can't be read/parsed in-memory
- Introduce a service worker to handle querying, so as to keep the main thread responsive in case the computation is super expensive
- I'm sure there could be lots more...

## Install

```sh
yarn install
```

## Usage

```sh
yarn start
```

## Run tests

```sh
yarn test
```

## Author

👤 **itsfadnis <nik.fadnis@gmail.com>**

* Twitter: [@itsfadnis](https://twitter.com/itsfadnis)
* Github: [@itsfadnis](https://github.com/itsfadnis)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/itsfadnis/jsonpath-visualizer/issues). 

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_