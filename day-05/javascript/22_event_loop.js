console.log("Start");

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise then callback");
});

console.log("End");
