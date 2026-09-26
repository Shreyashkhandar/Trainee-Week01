function printValue<T>(value: T): T {
  console.log("Value:", value);
  return value;
}

printValue<string>("Hello TypeScript");
printValue<number>(42);
