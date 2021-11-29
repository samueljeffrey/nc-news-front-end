import { postComment } from "../Utils/utils.js";
import { useState } from "react";

export default function PostComment({
  article,
  setComments,
  user,
  setAddClicked,
}) {
  const [error, setError] = useState(false);
  return (
    <div id="add-comment-div">
      <h3>Write comment here:</h3>
      {error ? <p className="error-paragraph">{error}</p> : null}
      <textarea id="new-comment" className="input-box" />
      <p>
        <span
          className="post-button"
          onClick={() => {
            if (document.getElementById("new-comment").value.length > 1000) {
              setError("Comments are limited to 1000 characters");
            } else if (document.getElementById("new-comment").value === "") {
              setError("Comments cannot be empty");
            } else {
              setError(false);
              postComment(
                article.article_id,
                user.username,
                document.getElementById("new-comment").value
              ).then(() => {
                setComments([]);
                setAddClicked(false);
              });
            }
          }}
        >
          Post
        </span>
        <span
          className="cancel-post-button"
          onClick={() => {
            setAddClicked(false);
          }}
        >
          Cancel
        </span>
      </p>
    </div>
  );
}
