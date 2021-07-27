function NamedList(name, items) {
  let innerValues = items;

  return Object.freeze({
    name,
    [Symbol.iterator]: function * () {
      yield * innerValues;
    }
  })
}

let tens = new NamedList("byTens", [10, 20, 30]);

for (let num of tens) {
  console.log(num);
}