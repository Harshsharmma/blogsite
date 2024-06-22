import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/blogposts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        There was an error loading the blog post.
      </div>
    );
  }

  if (!post) {
    return <div className="text-center mt-4">Blog post not found.</div>;
  }

  return (
    <div className="blog-post container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        by {post.author} on {new Date(post.date_published).toLocaleDateString()}
      </p>
      <div className="content mb-4 text-lg leading-relaxed">{post.content}</div>
      <div className="social-share">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 text-blue-600 hover:text-blue-700"
        >
          Share on Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 text-blue-600 hover:text-blue-700"
        >
          Share on Twitter
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          Share on LinkedIn
        </a>
      </div>
    </div>
  );
};

export default BlogPost;
