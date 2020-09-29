# How to configure ESlint and Prettier

https://thomlom.dev/setup-eslint-prettier-react/

https://github.com/yannickcr/eslint-plugin-react

```bash
npm install --save-dev eslint
npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks
```

.eslintrc

```json
{
  "env": {
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "error"
  }
}
```

# How to configure babel

.babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

```bash
$ npm install @babel/core @babel/preset-env @babel/preset-react
```
