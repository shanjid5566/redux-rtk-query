import React, { useState } from 'react';
// সুন্দর আইকনের জন্য lucide-react ইম্পোর্ট করা হচ্ছে
import { PlusCircle } from 'lucide-react';
import { useAddNewPostMutation } from '../redux/services/posts/postsApi';

// --- আপনার Redux Slice থেকে action import করুন ---
// অনুগ্রহ করে './features/posts/postsSlice' -কে আপনার সঠিক পাথ দিয়ে প্রতিস্থাপন করুন
// import { postAdded } from './features/posts/postsSlice'; 
// --- উদাহরণের জন্য একটি কাল্পনিক ফাংশন ---
// ---------------------------------------------

/**
 * AddPost Component
 * Redux ব্যবহার করে নতুন পোস্ট যোগ করার ফর্ম।
 */
export default function AddPost() {
  const [title, setTitle] = useState(''); // টাইটেলের জন্য নতুন state
  const [content, setContent] = useState('');
  const [message, setMessage] = useState(''); // একটি সফল বার্তা দেখানোর জন্য
  const [addNewPost] = useAddNewPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // টাইটেল বা কন্টেন্ট খালি থাকলে সাবমিট হবে না
    if (!title.trim() || !content.trim()) {
      setMessage('অনুগ্রহ করে টাইটেল এবং কন্টেন্ট উভয়ই লিখুন।');
      setTimeout(() => setMessage(''), 3000);
      return; 
    }

    // --- Redux Logic ---
    // Redux action dispatch করা হচ্ছে (টাইটেল সহ)
    // 'postAdded' -কে আপনার action creator দিয়ে প্রতিস্থাপন করুন
    try {
      // RTK Query mutation call
      await addNewPost({ title, body: content }).unwrap();
      setMessage('আপনার পোস্ট সফলভাবে জমা দেওয়া হয়েছে!');
      setTimeout(() => setMessage(''), 3000);
      setTitle(''); // টাইটেল রিসেট
      setContent(''); // কন্টেন্ট রিসেট
    } catch (error) {
      console.error('Error adding post:', error);
      setMessage('পোস্ট জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      setTimeout(() => setMessage(''), 3000);
    }
    // -------------------
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 md:p-12 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          পোস্ট তৈরি করুন
        </h1>

        {/* সফল বা ত্রুটি বার্তা দেখানোর জন্য কন্ডিশনাল রেন্ডারিং */}
        {message && (
          <div 
            className={`px-4 py-3 rounded-lg relative mb-6 ${
              message.includes('সফলভাবে') 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`} 
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">নতুন পোস্ট তৈরি করুন</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {/* --- নতুন টাইটেল ইনপুট ফিল্ড --- */}
            <div className="mb-4">
              <label htmlFor="postTitle" className="block text-lg font-medium text-gray-700 mb-2">
                পোস্ট টাইটেল
              </label>
              <input
                type="text"
                id="postTitle"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-200"
                placeholder="পোস্টের টাইটেল লিখুন..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* ------------------------------- */}

            <div className="mb-4">
              <label htmlFor="postContent" className="block text-lg font-medium text-gray-700 mb-2">
                পোস্ট কন্টেন্ট
              </label>
              <textarea
                id="postContent"
                rows="8"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-200"
                placeholder="আপনার পোস্ট এখানে লিখুন..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
              <PlusCircle size={20} />
              <span>পোস্ট জমা দিন</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

