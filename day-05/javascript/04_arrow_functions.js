function normalMultiply(a, b) {
  return a * b;
}

const arrowMultiply = (a, b) => a * b;

console.log("Normal function:", normalMultiply(4, 5));
console.log("Arrow function:", arrowMultiply(4, 5));

const square = number => number * number;
console.log("Square of 7:", square(7));
