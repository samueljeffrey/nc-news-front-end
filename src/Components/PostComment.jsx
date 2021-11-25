import { postComment } from "../Utils/utils.js";

export default function PostComment({
  article,
  setComments,
  user,
  setAddClicked,
}) {
  return (
    <div id="add-comment-div">
      <h3>Write comment here:</h3>
      <textarea id="new-comment" className="input-box" />
      <p>
        <span
          className="post-button"
          onClick={() => {
            if (document.getElementById("new-comment").value !== "") {
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
