async function deletePost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    console.log("DELETE response status:", response.status);
    console.log("DELETE response ok:", response.ok);
  } catch (error) {
    console.log("DELETE fetch error:", error.message);
  }
}

deletePost();
