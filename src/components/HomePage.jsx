import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/blogposts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        There was an error loading the blog posts.
      </div>
    );
  }

  return (
    <div className="homepage container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 mt-8">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              by {post.author} on{" "}
              {new Date(post.date_published).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
            <Link
              to={`/post/${post.id}`}
              className="text-blue-500 font-bold hover:underline mt-2 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
