export default function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <p>
        Written by <i>{article.author}</i>
      </p>
      <p>
        Posted on {article.created_at.slice(8, 10)}/
        {article.created_at.slice(5, 7)}/{article.created_at.slice(0, 4)} at{" "}
        {article.created_at.slice(11, 16)}
      </p>
      {article.votes < 0 ? (
        <p>
          Votes: <strong className="negative-votes">{article.votes}</strong>
        </p>
      ) : (
        <p>
          Votes: <strong className="positive-votes">{article.votes}</strong>
        </p>
      )}
      <p className="article-card-comments">Comments: {article.comment_count}</p>
    </div>
  );
}
