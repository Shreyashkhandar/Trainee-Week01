async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("GET response:", data);
  } catch (error) {
    console.log("GET fetch error:", error.message);
  }
}

fetchPosts();
