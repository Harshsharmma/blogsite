import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = { title, author, date_published: datePublished, content };

    axiosInstance
      .post("/blogposts", newPost)
      .then((response) => {
        console.log("Post created successfully:", response.data);
        // Optionally, redirect to the homepage or clear the form
      })
      .catch((error) => {
        console.error("There was an error creating the blog post!", error);
      });
  };

  return (
    <div className="mx-auto max-w-2xl p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">Date Published:</label>
          <input
            type="date"
            value={datePublished}
            onChange={(e) => setDatePublished(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="6"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
