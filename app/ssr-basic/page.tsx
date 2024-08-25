"use client";
import { link } from "fs";
import React, { useEffect, useState } from "react";

async function fetchData() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let data = await response.json();
  return data;
}

export default async function page() {
  let dataPost = await fetchData();
  return (
    <div>
      <ul>
        {dataPost.map((item: any) => {
          <li>
            <b>{item.title}</b>
            <p>{item.body.slice(0, 100)}</p>
          </li>;
        })}
      </ul>
    </div>
  );
}
