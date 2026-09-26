function processUser(name, callback) {
  console.log("Fetching user...");
  callback(name);
}

processUser("Nina", (userName) => {
  console.log(`Welcome ${userName}!`);
});
