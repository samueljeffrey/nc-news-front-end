import { postArticle } from "../Utils/utils.js";
import { useState, useContext } from "react";
import { userContext } from "../Contexts/user.js";
import { Link } from "react-router-dom";

export default function PostArticle() {
  const { user } = useContext(userContext);
  const [topic, setTopic] = useState("coding");
  const [postClicked, setPostClicked] = useState(false);
  const [posted, setPosted] = useState(false);
  const [newArticleId, setNewArticleId] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  if (posted) {
    return (
      <div>
        <h2>Article posted!</h2>
        <Link className="react-link" to={`/articles/${newArticleId}`}>
          <button className="light-button">Go to article</button>
        </Link>
      </div>
    );
  } else {
    return (
      <main id="post-article-main">
        <h2>Create article</h2>
        <h3 className="article-field-labels" id="post-comment-title-label">
          Enter Title:
        </h3>
        {titleError ? (
          <p className="error-paragraph">Title cannot be empty</p>
        ) : null}
        {postClicked ? (
          <textarea
            id="new-article-title"
            className="input-line disabled-textarea"
            disabled
          />
        ) : (
          <textarea id="new-article-title" className="input-line" />
        )}
        <h3 className="article-field-labels" id="post-comment-topic-label">
          Choose Topic:
        </h3>
        <select
          id="new-article-topic"
          onChange={() => {
            setTopic(document.getElementById("new-article-topic").value);
          }}
        >
          <option value="coding">Coding</option>
          <option value="football">Football</option>
          <option value="cooking">Cooking</option>
        </select>
        <h3 className="article-field-labels" id="post-comment-body-label">
          Write Article:
        </h3>
        {bodyError ? (
          <p className="error-paragraph">Article cannot be empty</p>
        ) : null}
        {postClicked ? (
          <textarea
            id="new-article-body"
            className="input-box disabled-textarea"
            disabled
          />
        ) : (
          <textarea id="new-article-body" className="input-box" />
        )}
        {postClicked ? (
          <div>
            <h3>Post article?</h3>
            <button
              className="do-post-article"
              onClick={() => {
                postArticle(
                  document.getElementById("new-article-title").value,
                  document.getElementById("new-article-body").value,
                  topic,
                  user.username
                ).then((response) => {
                  if (response.article_id) {
                    setPosted(true);
                    setNewArticleId(response.article_id);
                  }
                });
              }}
            >
              Yes
            </button>
            <button
              className="dont-post-article"
              onClick={() => {
                setPostClicked(false);
              }}
            >
              No
            </button>
          </div>
        ) : (
          <p>
            <span
              className="post-button"
              onClick={() => {
                if (
                  document.getElementById("new-article-body").value !== "" &&
                  document.getElementById("new-article-title").value !== ""
                ) {
                  setPostClicked(true);
                  setTitleError(false);
                  setBodyError(false);
                } else if (
                  document.getElementById("new-article-body").value !== ""
                ) {
                  setTitleError(true);
                  setBodyError(false);
                } else if (
                  document.getElementById("new-article-title").value !== ""
                ) {
                  setTitleError(false);
                  setBodyError(true);
                } else {
                  setBodyError(true);
                  setTitleError(true);
                }
              }}
            >
              Post
            </span>
            <Link className="react-link" to="/">
              <span className="cancel-post-button">Cancel</span>
            </Link>
          </p>
        )}
      </main>
    );
  }
}
