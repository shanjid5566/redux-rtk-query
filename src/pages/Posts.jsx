import React from "react";
import { useGetAllPostsQuery } from "../redux/services/posts/postsApi";

const Posts = () => {
  const { data, error, isLoading } = useGetAllPostsQuery();
  // console.log(data)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((post) => (
          <div
            key={post.id}
            className="p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 border"
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
