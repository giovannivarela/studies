class Counter {
  #count = 0;
  constructor(initialValue) {
    this.#count = initialValue;
  }
  // #count = 0;

  increment(delta) {
    this.count += delta;
  }

  report() {
    return this.count;
  }
}

let counter = new Counter(10);
counter.increment(5);

let result1 = counter.report();
console.log(counter.count);