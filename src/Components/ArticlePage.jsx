import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleArticle, getComments } from "../Utils/utils";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    getSingleArticle(article_id).then((response) => {
      setArticle(response);
    });
    getComments(article_id).then((response) => {
      setComments(response);
    });
  }, []);

  if (Object.keys(article).length > 0) {
    return (
      <main className="article-page">
        <div className="article-page-main">
          <h2 className="article-page-title">{article.title}</h2>
          <p>
            Written by <i>{article.author}</i> | Posted on{" "}
            {article.created_at.slice(8, 10)}/{article.created_at.slice(5, 7)}/
            {article.created_at.slice(0, 4)} at{" "}
            {article.created_at.slice(11, 16)}
          </p>
          <p className="article-body">{article.body}</p>
          {article.votes < 0 ? (
            <p>
              Votes: <strong className="negative-votes">{article.votes}</strong>
            </p>
          ) : (
            <p>
              Votes: <strong className="positive-votes">{article.votes}</strong>
            </p>
          )}
          <hr className="line-before-comments" />
          <p
            className="comments-statement"
            onClick={() => {
              if (clicked === false) {
                setClicked(true);
              } else {
                setClicked(false);
              }
            }}
          >
            {clicked
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`}
          </p>
          {clicked ? (
            <div className="comments-for-article">
              {comments.map((comment) => {
                return (
                  <div className="comment-in-article">
                    <p>
                      <i>{comment.author}</i> |{" "}
                      {comment.created_at.slice(8, 10)}/
                      {comment.created_at.slice(5, 7)}/
                      {comment.created_at.slice(0, 4)} at{" "}
                      {comment.created_at.slice(11, 16)}
                    </p>
                    <p className="comment-body-in-article">{comment.body}</p>
                    <p>
                      {comment.votes < 0 ? (
                        <p>
                          Votes:{" "}
                          <strong className="negative-votes">
                            {comment.votes}
                          </strong>
                        </p>
                      ) : (
                        <p>
                          Votes:{" "}
                          <strong className="positive-votes">
                            {comment.votes}
                          </strong>
                        </p>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </main>
    );
  } else {
    return <h2>Empty</h2>;
  }
}
