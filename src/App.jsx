import { Route, Routes } from "react-router";
import "./App.css";
import Posts from "./pages/Posts";

function App() {

  return <Routes>
    {/* Define your routes here */}
    <Route path="/" element={<Posts />} />
  </Routes>;
}

export default App;
