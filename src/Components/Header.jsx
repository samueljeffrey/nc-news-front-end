import { useContext } from "react";
import { userContext } from "../Contexts/user.js";
import { Link } from "react-router-dom";

export default function Header({ allTopics, topic, setTopic }) {
  const { user } = useContext(userContext);
  return (
    <header>
      <div id="title-and-user-div">
        <Link className="react-link" to="/">
          <h1>NC News</h1>
        </Link>
        <Link className="react-link" to="/users">
          <button id="user-button">{user.username} | switch user</button>
        </Link>
      </div>
      <div id="topic-choices-div">
        <Link className="react-link" to="/">
          <button
            className="header-topic-button"
            key="all"
            onClick={() => {
              setTopic({
                slug: "all",
                description: "articles from all topics",
              });
            }}
          >
            All
          </button>
        </Link>
        {allTopics.map((singleTopic) => {
          return (
            <Link className="react-link" to="/">
              <button
                className="header-topic-button"
                key={singleTopic.slug}
                onClick={() => {
                  setTopic(singleTopic);
                }}
              >
                {singleTopic.slug.slice(0, 1).toUpperCase() +
                  singleTopic.slug.slice(1)}
              </button>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
