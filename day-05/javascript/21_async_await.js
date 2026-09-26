function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("User loaded successfully"), 1000);
  });
}

async function showUser() {
  const result = await fetchUser();
  console.log(result);
}

console.log("Before async call");
showUser();
console.log("After async call started");
