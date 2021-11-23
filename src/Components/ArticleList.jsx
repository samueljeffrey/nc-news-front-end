import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../Utils/utils.js";

export default function ArticleList({ topic }) {
  const [articles, setArticles] = useState([]);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("ASC");
  useEffect(() => {
    setSort("created_at");
    setOrder("DESC");
    document.getElementById("articleListSelect").value = "created_at DESC";
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
        id="articleListSelect"
        onChange={() => {
          const values = document
            .getElementById("articleListSelect")
            .value.split(" ");
          setSort(values[0]);
          setOrder(values[1]);
        }}
      >
        <option value="created_at DESC">Newest</option>
        <option value="created_at ASC">Oldest</option>
        <option value="votes DESC">Most votes</option>
        <option value="votes ASC">Least votes</option>
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
                    <strong className="negative-article-votes">
                      {article.votes}
                    </strong>
                  </p>
                ) : (
                  <p>
                    Votes:{" "}
                    <strong className="positive-article-votes">
                      {article.votes}
                    </strong>
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
