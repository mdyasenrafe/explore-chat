import React, { useEffect, useState } from "react";
import * as io from "socket.io-client";
import { baseUrl, fetchMessageApi, myProfileApi } from "../../../network/api";

const Chatbox = ({ selectedUser }) => {
  const [socket, setSocket] = useState(null);
  const [myProfile, setMyProfile] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");

  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const newSocket = io.connect(baseUrl);
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [userToken, selectedUser]);

  useEffect(() => {
    if (userToken) {
      fetchMyProfile();
    }
  }, [userToken]);

  const fetchMyProfile = async () => {
    const profileResponse = await myProfileApi();
    if (profileResponse.error) {
    } else {
      setMyProfile(profileResponse.data);
    }
  };

  const handleInputChange = (e) => {
    setNewMessageText(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessageText.trim() !== "") {
      socket.emit("sendMessage", {
        receiverEmail: selectedUser.email,
        text: newMessageText,
        senderId: myProfile._id,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: newMessageText,
          sender: "user",
        },
      ]);
      setNewMessageText("");
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (data) => {
      console.log("getMessage ", data);
      const newMessage = {
        text: data.text,
        sender: "other",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("getUsers", (data) => {
      console.log("getUsers ", data);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    if (selectedUser?._id) {
      socket.emit("addUser", selectedUser._id);
    }
  }, [socket, selectedUser]);

  useEffect(() => {
    if (!socket) return;
    if (myProfile?._id) {
      socket.emit("addUser", myProfile._id);
    }
  }, [socket, myProfile]);

  useEffect(() => {
    if (selectedUser && myProfile?._id) {
      fetchMessages();
    }
  }, [selectedUser, myProfile]);

  const fetchMessages = async () => {
    const response = await fetchMessageApi(selectedUser._id);
    if (response.error) {
    } else {
      const messages = response.messages.map((message) => ({
        text: message.text,
        sender: message.senderId === myProfile._id ? "user" : "other",
      }));
      setMessages(messages);
    }
  };

  return (
    <div>
      {selectedUser ? (
        <div className="w-full h-screen flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white shadow">
            <div className="flex items-center p-2">
              <img
                className="w-[50px] h-[50px] rounded-full object-cover"
                src={selectedUser.photo}
                alt="avatar"
              />
              <p className="ml-2">{selectedUser.name}</p>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 p-2   ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`rounded-lg inline-block p-2 ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-400"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="bg-gray-200 p-4">
            <div className="flex">
              <input
                type="text"
                className="flex-grow rounded-l-lg p-2 focus:outline-none h-[48px]"
                placeholder="Type a message..."
                value={newMessageText}
                onChange={handleInputChange}
              />
              <button
                className="bg-blue-500 text-white rounded-r-lg p-2 h-[48px] flex justify-center items-center"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[100vh] flex items-center justify-center">
          <p className="text-[#3c7fff] text-xl">Select a user to start chat</p>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
