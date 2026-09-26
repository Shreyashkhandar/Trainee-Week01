function greetUser(name, city = "Bangalore") {
  return `Hello ${name}! Welcome to ${city}.`;
}

console.log(greetUser("Nisha"));
console.log(greetUser("Sam", "Hyderabad"));

function addNumbers(a, b) {
  return a + b;
}

console.log("Sum:", addNumbers(10, 25));
