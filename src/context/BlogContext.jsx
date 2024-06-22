// src/context/BlogContext.js
import React, { createContext, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing blog posts
  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/blogposts");
      setBlogPosts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Add a new blog post
  const addBlogPost = async (newPost) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/blogposts", newPost);
      setBlogPosts([...blogPosts, response.data]); // Update state with new post
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <BlogContext.Provider
      value={{ blogPosts, loading, error, fetchBlogPosts, addBlogPost }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
