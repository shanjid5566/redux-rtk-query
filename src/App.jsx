import { Route, Routes } from "react-router";
import "./App.css";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";

function App() {

  return <Routes>
    {/* Define your routes here */}
    <Route path="/" element={<Posts />} />
    <Route path="posts/:id" element={<PostDetails />} />
  </Routes>;
}

export default App;
