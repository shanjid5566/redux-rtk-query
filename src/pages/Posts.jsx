import React, { useState } from "react";
import { useGetAllPostsQuery, useDeletePostMutation, useUpdatePostMutation } from "../redux/services/posts/postsApi";
import { Link } from "react-router";

const Posts = () => {
  const { data, error, isLoading } = useGetAllPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId).unwrap();
        alert('Post deleted successfully!');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  const handleUpdate = async (postId) => {
    try {
      await updatePost({ id: postId, title: editTitle, body: editBody }).unwrap();
      alert('Post updated successfully!');
      setEditingId(null);
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
  };
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
            
            {editingId === post.id ? (
              // Edit mode
              <div className="space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Title"
                />
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  rows="3"
                  placeholder="Body"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(post.id)}
                    className="flex-1 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 px-3 py-1 bg-gray-500 text-white text-sm font-medium rounded hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600">{post.body}</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <Link
                    to={`/posts/${post.id}`}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
