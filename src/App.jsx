import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userContext } from "./Contexts/user.js";
import { getTopics } from "./Utils/utils.js";
import Header from "./Components/Header.jsx";
import ArticleList from "./Components/ArticleList.jsx";
import ArticlePage from "./Components/ArticlePage.jsx";
import ChooseUser from "./Components/ChooseUser.jsx";
import PostArticle from "./Components/PostArticle.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";

function App() {
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("ASC");
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
          <Header
            topic={topic}
            setTopic={setTopic}
            allTopics={allTopics}
            setSort={setSort}
            setOrder={setOrder}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ArticleList
                  topic={topic}
                  sort={sort}
                  setSort={setSort}
                  order={order}
                  setOrder={setOrder}
                />
              }
            />
            <Route path="/users" element={<ChooseUser />} />
            <Route path="/articles/:article_id" element={<ArticlePage />} />
            <Route path="/articles/post-article" element={<PostArticle />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
