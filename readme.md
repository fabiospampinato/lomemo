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

const memoized = lomemo ( ( a, b ) => a + b );

memoized ( 1, 2 ); // => 3
memoized ( 1, 5 ); // => 3

// Memoize a function, using a custom function to generate the key

const resolver = ( ...args ) => args.join ( '' );
const memoized = lomemo ( ( a, b ) => a + b, resolver );

memoized ( 1, 2 ); // => 3
memoized ( 1, 5 ); // => 6
memoized ( '', '15' ); // => 6
```

## License

MIT © [`lodash`](https://github.com/lodash/lodash)
