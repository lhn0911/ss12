import React from "react";

async function postId(id: string) {
  let response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  let data = await response.json();
  return data;
}

export default async function page(params: { params: { id: string } }) {
  let data = await postId(params.params.id);
  return (
    <div>
      <h1>Chi tiết bài viết</h1>
      <b>{data.title}</b>
      <p>{data.body}</p>
    </div>
  );
}
