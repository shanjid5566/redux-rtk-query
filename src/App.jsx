import { Route, Routes } from "react-router";
import "./App.css";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import AddPost from "./pages/AddPost";

function App() {

  return <Routes>
    {/* Define your routes here */}
    <Route path="/" element={<Posts />} />
    <Route path="posts/:id" element={<PostDetails />} />
    <Route path="add-post" element={<AddPost />} />
  </Routes>;
}

export default App;
