import { userContext } from "../Contexts/user.js";
import { useContext, useEffect, useState } from "react";
import { getSingleUser } from "../Utils/utils.js";

export default function UserCard({ singleUser }) {
  const { user, setUser } = useContext(userContext);
  const [thisUser, setThisUser] = useState({});

  useEffect(() => {
    getSingleUser(singleUser.username).then((response) => {
      setThisUser(response);
    });
  }, []);

  if (thisUser.username === user.username) {
    return (
      <div className="user-card-div current-user">
        <img className="img-user-card" src={thisUser.avatar_url} alt="avatar" />
        <p className="user-card-name">{thisUser.name}</p>
        <h3>{singleUser.username}</h3>
      </div>
    );
  } else {
    return (
      <div
        className="user-card-div"
        onClick={() => {
          setUser(singleUser);
        }}
      >
        <img className="img-user-card" src={thisUser.avatar_url} alt="avatar" />
        <p className="user-card-name">{thisUser.name}</p>
        <h3>{singleUser.username}</h3>
      </div>
    );
  }
}
