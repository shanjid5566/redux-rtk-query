import React from "react";
import { Link, useParams } from "react-router";
import { useGetPostDetailsQuery } from "../redux/services/posts/postsApi";

const PostDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetPostDetailsQuery(id);
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching post details</div>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Posts
      </Link>
      <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        <p className="text-sm text-gray-500 mb-2">Post ID: {data.id}</p>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {data.title}
        </h1>
        <p className="text-gray-600 leading-relaxed">{data.body}</p>
      </div>
    </div>
  );
};

export default PostDetails;
