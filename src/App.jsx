import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userContext } from "./Contexts/user.js";
import { getTopics } from "./Utils/utils.js";
import Header from "./Components/Header.jsx";
import ArticleList from "./Components/ArticleList.jsx";
import ArticlePage from "./Components/ArticlePage.jsx";
import ChooseUser from "./Components/ChooseUser.jsx";
import PostComment from "./Components/PostComment.jsx";

function App() {
  const [user, setUser] = useState({ username: "grumpy19" });
  const [topic, setTopic] = useState({
    slug: "all",
    description: "articles from all topics",
  });
  const [allTopics, setAllTopics] = useState([]);
  useEffect(() => {
    getTopics().then((response) => {
      setAllTopics(response);
    });
  }, []);

  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header topic={topic} setTopic={setTopic} allTopics={allTopics} />
          <Routes>
            <Route path="/" element={<ArticleList topic={topic} />} />
            <Route path="/users" element={<ChooseUser />} />
            {/* <Route path="/articles/:article_id" element={<ArticlePage />} />
            <Route
              path="/articles/:article_id/comment"
              element={<PostComment />}
            /> */}
          </Routes>
        </div>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
