import { deleteComment } from "../Utils/utils.js";
import { useContext, useState, useEffect } from "react";
import { userContext } from "../Contexts/user.js";

export default function CommentCard({ comment, setComments }) {
  const { user } = useContext(userContext);
  const [deleteClicked, setDeleteClicked] = useState(false);
  return (
    <div className="comment-in-article">
      <p>
        <i>{comment.author}</i> | {comment.created_at.slice(8, 10)}/
        {comment.created_at.slice(5, 7)}/{comment.created_at.slice(0, 4)} at{" "}
        {comment.created_at.slice(11, 16)}
      </p>
      <p className="comment-body-in-article">{comment.body}</p>
      <p>
        {comment.votes < 0 ? (
          <p>
            Votes: <strong className="negative-votes">{comment.votes}</strong>
          </p>
        ) : (
          <p>
            Votes: <strong className="positive-votes">{comment.votes}</strong>
          </p>
        )}
      </p>
      {user.username === comment.author ? (
        deleteClicked ? (
          <div>
            <h3>Delete comment?</h3>
            <button
              className="do-delete-comment"
              onClick={() => {
                deleteComment(comment.comment_id).then(() => {
                  setComments([]);
                });
              }}
            >
              Yes
            </button>
            <button
              className="dont-delete-comment"
              onClick={() => {
                setDeleteClicked(false);
              }}
            >
              No
            </button>
          </div>
        ) : (
          <button
            className="delete-comment-button"
            onClick={() => {
              setDeleteClicked(true);
            }}
          >
            Delete
          </button>
        )
      ) : null}
    </div>
  );
}
