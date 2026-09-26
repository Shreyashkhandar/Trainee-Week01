function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Cannot divide by zero.");
    }
    return a / b;
  } catch (error) {
    console.log("Caught error:", error.message);
    return null;
  } finally {
    console.log("This always runs.");
  }
}

console.log("Result:", divide(10, 2));
console.log("Result:", divide(10, 0));
