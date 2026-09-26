function printLength(value: string | number) {
  if (typeof value === "string") {
    console.log("String length:", value.length);
    return;
  }

  console.log("Number value:", value);
}

printLength("hello");
printLength(25);
