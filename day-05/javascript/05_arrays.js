const fruits = ["Apple", "Banana", "Orange"];
console.log("Original array:", fruits);
console.log("First fruit:", fruits[0]);

fruits.push("Mango");
console.log("After push:", fruits);

fruits.pop();
console.log("After pop:", fruits);

fruits.unshift("Grapes");
console.log("After unshift:", fruits);

fruits.shift();
console.log("After shift:", fruits);
