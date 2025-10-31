import React from "react";
import { useGetAllPostsQuery } from "../redux/services/posts/postsApi";
import { Link } from "react-router";

const Posts = () => {
  const { data, error, isLoading } = useGetAllPostsQuery();
  // console.log(data)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <Link 
          to={"./add-post"} 
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((post) => (
          <div
            key={post.id}
            className="p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 border"
          >
            <p className="text-sm text-gray-500 mb-2">Post ID: {post.id}</p>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.body}</p>
            <div className="mt-4">
              <Link
                to={`/posts/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
