import React from 'react'
import { useParams } from 'react-router'
import { useGetPostDetailsQuery } from '../redux/services/posts/postsApi'

const PostDetails = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetPostDetailsQuery(id);
    console.log(data)
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching post details</div>;
  return (
    <div>
        <p>Post Details Page</p>
        <p>Post id: {data.id}</p>
        <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
        <p className="text-gray-600">{data.body}</p>
    </div>
  )
}

export default PostDetails
