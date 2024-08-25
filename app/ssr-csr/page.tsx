"use client";
import React, { useEffect, useState } from "react";

async function fetchPostsSSR() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let data = await response.json();
  return data;
}

export default function Page() {
  const [fetchType, setFetchType] = useState("ssr");
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      let data = await fetchPostsSSR();
      setPosts(data);
    };
    getData();
  }, []);

  const fetchUsersCSR = async () => {
    setFetchType("csr");
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      let data = await response.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={fetchUsersCSR} className="bg-gray-600 text-white p-1">
        Refresh
      </button>
      {fetchType === "ssr" ? (
        <ul>
          {posts?.map((post: any) => (
            <li key={post.id}>
              <b>{post.title}</b>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h1>Danh sách Bài viết với Refresh</h1>
          <ul>
            {posts?.map((post: any) => (
              <li key={post.id}>
                <b>{post.name}</b>
                <p>{post.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
