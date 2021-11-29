import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../Utils/utils.js";

export default function ArticleList({ topic, sort, setSort, order, setOrder }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setSort("created_at");
    setOrder("DESC");
    if (document.getElementById("article-list-select"))
      document.getElementById("article-list-select").value = "created_at DESC";
    setLoading(false);
  }, []);
  useEffect(() => {
    setLoading(true);
    setSort("created_at");
    setOrder("DESC");
    if (document.getElementById("article-list-select"))
      document.getElementById("article-list-select").value = "created_at DESC";
    setLoading(false);
  }, [topic]);
  useEffect(() => {
    setLoading(true);
    getArticles(topic.slug, sort, order).then((response) => {
      setArticles(response);
    });
    setLoading(false);
  }, [topic, sort, order]);
  if (loading) return <h2>Loading...</h2>;
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
              <div className="article-card">
                <h3>{article.title}</h3>
                <p>
                  Written by <i>{article.author}</i>
                </p>
                <p>
                  Posted on {article.created_at.slice(8, 10)}/
                  {article.created_at.slice(5, 7)}/
                  {article.created_at.slice(0, 4)} at{" "}
                  {article.created_at.slice(11, 16)}
                </p>
                {article.votes < 0 ? (
                  <p>
                    Votes:{" "}
                    <strong className="negative-votes">{article.votes}</strong>
                  </p>
                ) : (
                  <p>
                    Votes:{" "}
                    <strong className="positive-votes">{article.votes}</strong>
                  </p>
                )}
                <p className="article-card-comments">
                  Comments: {article.comment_count}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
