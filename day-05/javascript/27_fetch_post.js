async function createPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "JavaScript practice",
        body: "This post was created with fetch().",
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("POST response:", data);
  } catch (error) {
    console.log("POST fetch error:", error.message);
  }
}

createPost();
