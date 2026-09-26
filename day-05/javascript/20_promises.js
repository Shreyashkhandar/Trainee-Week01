const promiseExample = new Promise((resolve, reject) => {
  const isSuccess = true;

  if (isSuccess) {
    resolve("Promise succeeded!");
  } else {
    reject("Promise failed!");
  }
});

promiseExample
  .then((value) => console.log("Resolved:", value))
  .catch((error) => console.log("Rejected:", error));

const failedPromise = new Promise((resolve, reject) => {
  reject("This promise failed on purpose.");
});

failedPromise
  .then((value) => console.log("Unexpected success:", value))
  .catch((error) => console.log("Caught failure:", error));
