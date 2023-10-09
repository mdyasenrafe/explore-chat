import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usersApi } from "../../network/api";
import { HashLoaderSpinner } from "../components/common/HashLoaderSpinner";
import UsersList from "../components/chat/UsersList";
import ChatBox from "../components/chat/ChatBox";
import { Grid } from "@mui/material";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) window.location.href = "/login";
  }, [token]);

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await usersApi();
    if (response.error) {
      setIsLoading(false);
      window.location.href = "/login";
      localStorage.removeItem("token");
    } else {
      setIsLoading(false);
      setUsers(response.data);
    }
  };
  return (
    <div>
      {isLoading ? (
        <HashLoaderSpinner color={"#3c7fff"} loading={isLoading} />
      ) : (
        <Grid container>
          <Grid item xs={12} md={2}>
            {/* height would be window size */}
            <div className="border border-[#e1e1e1] p-2  overflow-y-scroll sticky top-0 md:h-[100vh]">
              <div>
                {users.map((user) => (
                  <UsersList
                    key={user._id}
                    user={user}
                    setSelectedUser={setSelectedUser}
                  />
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={10}>
            <ChatBox selectedUser={selectedUser} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
