import * as lazy from './lazy.js'

export function range (from = 0, to = from) {
  return [...lazy.range(from, to)];
}

export function zipWith (zipper, ...iterables) {
  return [...lazy.zipWith(zipper, ...iterables)];
}
