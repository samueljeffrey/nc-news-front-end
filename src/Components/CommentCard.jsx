import { deleteComment, voteOnComment } from "../Utils/utils.js";
import { useContext, useState } from "react";
import { userContext } from "../Contexts/user.js";

export default function CommentCard({ thisComment, setComments }) {
  const { user } = useContext(userContext);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [comment, setComment] = useState(thisComment);
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
              className="do-delete"
              onClick={() => {
                deleteComment(comment.comment_id).then(() => {
                  setComments([]);
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
            className="vote-button comment-vote-button"
            onClick={() => {
              voteOnComment(comment.comment_id, 1).then((response) => {
                setComment(response);
              });
            }}
          >
            +
          </button>
          <button
            className="vote-button comment-vote-button"
            onClick={() => {
              voteOnComment(comment.comment_id, -1).then((response) => {
                setComment(response);
              });
            }}
          >
            -
          </button>
        </div>
      )}
    </div>
  );
}
