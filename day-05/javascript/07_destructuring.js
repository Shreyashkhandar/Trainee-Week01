const numbers = [10, 20, 30, 40];
const [first, second, ...rest] = numbers;

console.log("First:", first);
console.log("Second:", second);
console.log("Rest:", rest);

const person = {
  name: "Karan",
  age: 24,
  city: "Pune",
};

const { name, city } = person;
console.log("Name:", name);
console.log("City:", city);
