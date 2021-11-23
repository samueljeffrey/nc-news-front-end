import { useContext, useState, useEffect } from "react";
import { userContext } from "../Contexts/user.js";
import { getUsers } from "../Utils/utils.js";

export default function ChooseUser() {
  const { user, setUser } = useContext(userContext);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getUsers().then((response) => {
      setAllUsers(response);
    });
  }, []);
  return (
    <main>
      <h2>Choose User:</h2>
      <div id="choose-user-div">
        {allUsers.map((singleUser) => {
          if (singleUser.username === user.username) {
            return (
              <h3 className="user-option current-user">
                {singleUser.username}
              </h3>
            );
          } else {
            return (
              <h3
                onClick={() => {
                  setUser(singleUser);
                }}
                className="user-option"
              >
                {singleUser.username}
              </h3>
            );
          }
        })}
      </div>
    </main>
  );
}
