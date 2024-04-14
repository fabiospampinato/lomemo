# Lomemo

Lodash's memoize function, but in a much smaller package than [`lodash.memoize`](https://www.npmjs.com/package/lodash.memoize)'s.

Read lodash's [docs](https://lodash.com/docs/4.17.15#memoize) for more info.

## Install

```sh
npm install --save lomemo
```

## Usage

```ts
import lomemo from 'lomemo';

// Memoize a function, using the first argument as the key

const memoize = lomemo ( ( a, b ) => a + b );

memoize ( 1, 2 ); // => 3
memoize ( 1, 5 ); // => 3

// Memoize a function, using a custom function to generate the key

const resolver = ( ...args ) => args.join ( '' );
const memoize = lomemo ( ( a, b ) => a + b, resolver );

memoize ( 1, 2 ); // => 3
memoize ( 1, 5 ); // => 6
memoize ( '', '15' ); // => 6
```

## License

MIT © [`lodash`](https://github.com/lodash/lodash)
