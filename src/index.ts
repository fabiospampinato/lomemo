
/* IMPORT */

import type {FN} from './types';

/* MAIN */

const memoize = <Arguments extends unknown[], Return> ( fn: FN<Arguments, Return>, resolver?: FN<Arguments, unknown> ): FN<Arguments, Return> & { cache: Map<unknown, unknown> } => {

  const memoized = function ( this: unknown, ...args: Arguments ): Return {

    const key = resolver ? resolver.apply ( this, args ) : args[0];
    const cache = memoized.cache;
    const cached = cache.get ( key );

    if ( cached !== undefined || cache.has ( key ) ) return cached;

    const result = fn.apply ( this, args );

    memoized.cache = cache.set ( key, result ) || cache;

    return result;

  };

  memoized.cache = new (memoize.Cache || Map)();

  return memoized;

};

/* UTILITIES */

memoize.Cache = Map;

/* EXPORT */

export default memoize;
