import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../Utils/utils.js";
import ArticleCard from "./ArticleCard.jsx";

export default function ArticleList({ topic, sort, setSort, order, setOrder }) {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    setSort("created_at");
    setOrder("DESC");
    document.getElementById("article-list-select").value = "created_at DESC";
  }, []);
  useEffect(() => {
    setSort("created_at");
    setOrder("DESC");
    document.getElementById("article-list-select").value = "created_at DESC";
  }, [topic]);
  useEffect(() => {
    getArticles(topic.slug, sort, order).then((response) => {
      setArticles(response);
    });
  }, [topic, sort, order]);
  return (
    <main>
      <h2 id="article-list-title">{topic.slug} articles:</h2>
      <select
        id="article-list-select"
        onChange={() => {
          const values = document
            .getElementById("article-list-select")
            .value.split(" ");
          setSort(values[0]);
          setOrder(values[1]);
        }}
      >
        <option value="created_at DESC">Newest</option>
        <option value="created_at ASC">Oldest</option>
        <option value="votes DESC">Most votes</option>
        <option value="votes ASC">Least votes</option>
        <option value="comment_count DESC">Most comments</option>
        <option value="comment_count ASC">Least comments</option>
        <option value="author ASC">Author A-Z</option>
        <option value="author DESC">Author Z-A</option>
      </select>
      <div id="article-list">
        {articles.map((article) => {
          return (
            <Link className="react-link" to={`/articles/${article.article_id}`}>
              <ArticleCard article={article} />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
