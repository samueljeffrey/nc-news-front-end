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
      <input type="text" id="new-comment" />
      <p>
        <span
          className="post-comment"
          onClick={() => {
            console.log(document.getElementById("new-comment").value);
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
          className="cancel-comment"
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
