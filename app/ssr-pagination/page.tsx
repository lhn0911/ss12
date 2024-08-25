"use client";
import React, { useEffect, useState } from "react";

export default function page() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const fetchPosts = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Tính tổng số trang
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Xử lý sự kiện chuyển trang
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <h1>Phân trang với CSR</h1>
      <div>
        <ul>
          {currentPosts.map((item) => (
            <li>
              <b>{item.title}</b>
              <p>{item.body.slice(0, 100)}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-3">
        <button
          className="border p-2"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Quay lại
        </button>
        <button
          className="border p-2"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Tiếp
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
      </div>
    </>
  );
}
