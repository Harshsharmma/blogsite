import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Home
        </Link>
        <div>
          <Link
            to="/create-post"
            className="ml-4 px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700"
          >
            Create Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
