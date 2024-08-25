"use client";
import React, { useEffect, useState } from "react";

export default function page() {
  const [posts, setPosts] = useState<any>();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <h1>Danh sách người dùng</h1>
      <ul>
        {posts?.map((user: any) => (
          <li>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
