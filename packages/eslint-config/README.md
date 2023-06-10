# `@whitebird/eslint-config`

`@whitebird/eslint-config` is an opinionated ESLint configuration aimed at promoting clear and readable code.

## Installation

Install the package with the following command:

```bash
npm install --save-dev @whitebird/eslint-config@1.0.0-beta.2
```

## Usage

```js
// .eslintrc.js
module.exports = {
  "root": true,
  "extends": ["@whitebird"],
  "ignorePatterns": ["**/node_modules/**", "**/dist/**", "**/coverage/**", ".eslintrc.js"],
}
```
