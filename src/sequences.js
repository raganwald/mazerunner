export function * take (numberToTake, iterable) {
  const iterator = iterable[Symbol.iterator]();

  for (let i = 0; i < numberToTake; ++i) {
    const { done, value } = iterator.next();
    if (!done) yield value;
  }
}

export function destructure (iterable) {
  const iterator = iterable[Symbol.iterator]();
  const { done, value } = iterator.next();

  if (!done) {
    return { first: value, rest: iterator }
  }
}

export function * range (from = 0, to = null) {
  let number = from;

  if (to == null) {
    while (true) {
      yield number++
    }
  }
  else {
    while (number <= to) {
      yield number++;
    }
  }
}

export function * zipWith (zipper, ...iterables) {
  const iterators = iterables.map(i => i[Symbol.iterator]());

  while (true) {
    const pairs = iterators.map(j => j.next()),
          dones = pairs.map(p => p.done),
          values = pairs.map(p => p.value);

    if (dones.indexOf(true) >= 0) break;
    yield zipper(...values);
  }
};
