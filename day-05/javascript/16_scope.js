const globalValue = "I am global";

function showScope() {
  const functionValue = "I am inside a function";

  if (true) {
    const blockValue = "I am inside a block";
    console.log(globalValue);
    console.log(functionValue);
    console.log(blockValue);
  }

  console.log(globalValue);
  console.log(functionValue);
}

showScope();
console.log(globalValue);
