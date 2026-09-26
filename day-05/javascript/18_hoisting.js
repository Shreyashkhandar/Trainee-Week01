console.log("Before function declaration:", greet("Aman"));

function greet(name) {
  return `Hello ${name}!`;
}

console.log("Before variable declaration:");
console.log(message);
var message = "This is hoisted as undefined until assigned.";
console.log("After assignment:", message);
