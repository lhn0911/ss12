import React from "react";

export default async function page() {
  let posts = null;
  let errorMessage;
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/nonexistent-url"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch the data.");
    }
    posts = await res.json();
  } catch (error) {
    errorMessage = "Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.";
  }
  return (
    <>
      <h1>Xử lý Lỗi với SSR</h1>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <ul>
          {posts &&
            posts.map((post: any) => <li key={post.id}>{post.title}</li>)}
        </ul>
      )}
    </>
  );
}
