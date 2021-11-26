import { useState, useEffect } from "react";
import { getUsers } from "../Utils/utils.js";
import UserCard from "./UserCard.jsx";

export default function ChooseUser() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUsers().then((response) => {
      setAllUsers(response);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <main>
        <h2>Choose User:</h2>
        <div id="choose-user-div">
          {allUsers.map((singleUser) => {
            return <UserCard singleUser={singleUser} />;
          })}
        </div>
      </main>
    );
  }
}
