import React from "react";
import Head from "next/head";

async function fetchUsersAndPosts() {
  const [usersRes, postsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts"),
  ]);

  if (!usersRes.ok || !postsRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const users = await usersRes.json();
  const posts = await postsRes.json();

  return { users, posts };
}

export default async function page() {
  const { users, posts } = await fetchUsersAndPosts();
  return (
    <div>
      <Head>
        <title>Dữ liệu từ Nhiều API (SSR)</title>
      </Head>
      <h1>Dữ liệu từ Nhiều API (SSR)</h1>

      <section className="mb-4">
        <h2>Danh Sách Người Dùng</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Danh Sách Bài Viết</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <b>{post.title}</b>
              <p>{post.body.slice(0, 100)}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
