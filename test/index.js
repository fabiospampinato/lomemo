
/* IMPORT */

import {describe} from 'fava';
import lomemo from '../dist/index.js';

/* MAIN */

describe ( 'Lomemo', it => {

  it ( 'can memoize a function, keying on the first argument', t => {

    const fn = ( a, b ) => a + b;
    const mfn = lomemo ( fn );

    t.is ( mfn ( 1, 2 ), 3 );
    t.is ( mfn ( 1, 5 ), 3 );

    t.is ( fn ( 1, 2 ), 3 );
    t.is ( fn ( 1, 5 ), 6 );

  });

  it ( 'can memoize a function, keying on a custom function', t => {

    const fn = ( a, b ) => a + b;
    const mfn = lomemo ( fn, ( ...args ) => args.join ( '' ) );

    t.is ( mfn ( 1, 2 ), 3 );
    t.is ( mfn ( 1, 5 ), 6 );
    t.is ( mfn ( '', '15' ), 6 );

    t.is ( fn ( 1, 2 ), 3 );
    t.is ( fn ( 1, 5 ), 6 );

  });

  it ( 'calls the original function with the original this context', t => {

    const results = [];
    const fn = function ( arg ) { results.push ( this, arg ) };
    const mfn = lomemo ( fn );

    mfn ( 123 )
    mfn.call ( 1, 2 );

    t.deepEqual ( results, [undefined, 123, 1, 2] );

  });

  it ( 'calls the resolver function with the original this context', t => {

    const results = [];
    const fn = () => {};
    const mfn = lomemo ( fn, function ( arg ) { results.push ( this, arg ); } );

    mfn ( 123 )
    mfn.call ( 1, 2 );

    t.deepEqual ( results, [undefined, 123, 1, 2] );

  });

  it ( 'supports overriding the cache after creation', t => {

    class Cache extends Map {};

    const fn = ( a, b ) => a + b;
    const mfn = lomemo ( fn );

    mfn.cache = new Cache;

    t.is ( mfn ( 1, 2 ), 3 );
    t.is ( mfn ( 1, 5 ), 3 );

    t.is ( fn ( 1, 2 ), 3 );
    t.is ( fn ( 1, 5 ), 6 );

    t.true ( mfn.cache instanceof Cache );

  });

  it ( 'supports overriding the cache before creation', t => {

    class Cache extends Map {};

    lomemo.Cache = Cache;

    const fn = ( a, b ) => a + b;
    const mfn = lomemo ( fn );

    lomemo.Cache = Map;

    const mfn2 = lomemo ( fn );

    t.is ( mfn ( 1, 2 ), 3 );
    t.is ( mfn ( 1, 5 ), 3 );

    t.is ( fn ( 1, 2 ), 3 );
    t.is ( fn ( 1, 5 ), 6 );

    t.true ( mfn.cache instanceof Cache );
    t.true ( mfn2.cache instanceof Map );

  });

});
