async function updatePost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        title: "Updated title",
        body: "Updated body text",
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("PUT response:", data);
  } catch (error) {
    console.log("PUT fetch error:", error.message);
  }
}

updatePost();
