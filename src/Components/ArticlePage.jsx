import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  getSingleArticle,
  getComments,
  voteOnArticle,
  deleteArticle,
} from "../Utils/utils";
import { userContext } from "../Contexts/user.js";
import CommentCard from "./CommentCard.jsx";
import PostComment from "./PostComment.jsx";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [showClicked, setShowClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContext(userContext);

  useEffect(() => {
    getSingleArticle(article_id)
      .then((response) => {
        setArticle(response);
      })
      .catch(() => {
        setError(true);
      });
    getComments(article_id).then((response) => {
      setComments(response);
    });
  }, []);
  useEffect(() => {
    getSingleArticle(article_id).then((response) => {
      setArticle(response);
    });
    getComments(article_id).then((response) => {
      setComments(response);
    });
  }, [comments]);
  if (error) {
    return <h2>Article not found</h2>;
  } else if (deleted) {
    return <h2>Article deleted!</h2>;
  } else if (Object.keys(article).length === 0) {
    return <h2>Loading...</h2>;
  } else {
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
          {article.author === user.username ? (
            deleteClicked ? (
              <div>
                <h3>Delete article?</h3>
                <button
                  className="do-delete"
                  onClick={() => {
                    deleteArticle(article.article_id).then((response) => {
                      if (response === "done") {
                        setDeleted(true);
                      } else {
                        console.log(response);
                      }
                    });
                  }}
                >
                  Yes
                </button>
                <button
                  className="dont-delete"
                  onClick={() => {
                    setDeleteClicked(false);
                  }}
                >
                  No
                </button>
              </div>
            ) : (
              <button
                className="delete-button"
                onClick={() => {
                  setDeleteClicked(true);
                }}
              >
                Delete
              </button>
            )
          ) : (
            <div className="vote-button-div">
              <button
                className="vote-button"
                onClick={() => {
                  voteOnArticle(article_id, 1).then((response) => {
                    setArticle(response);
                  });
                }}
              >
                +
              </button>
              <button
                className="vote-button"
                onClick={() => {
                  voteOnArticle(article_id, -1).then((response) => {
                    setArticle(response);
                  });
                }}
              >
                -
              </button>
            </div>
          )}
          <hr className="line-before-comments" />
          <p
            className="comment-on-article"
            onClick={() => {
              setAddClicked(true);
            }}
          >
            Add comment
          </p>
          {addClicked ? (
            <PostComment
              article={article}
              user={user}
              setComments={setComments}
              setAddClicked={setAddClicked}
            />
          ) : null}
          <p
            className="comments-statement"
            onClick={() => {
              if (showClicked === false) {
                setShowClicked(true);
              } else {
                setShowClicked(false);
              }
            }}
          >
            {showClicked
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`}
          </p>
          {showClicked ? (
            <div className="comments-for-article">
              {comments.map((comment) => {
                return (
                  <CommentCard
                    setComments={setComments}
                    thisComment={comment}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </main>
    );
  }
}
