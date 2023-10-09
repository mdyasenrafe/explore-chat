import React, { useEffect, useState } from "react";
import * as io from "socket.io-client";
import { baseUrl, myProfileApi } from "../../../network/api";

const socket = io.connect("http://localhost:8080");

const Chatbox = ({ selectedUser }) => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      fetchMyProfile();
    }
  }, [token]);

  const fetchMyProfile = async () => {
    const response = await myProfileApi();
    if (response.error) {
    } else {
      setMyself(response.data);
    }
  };
  const [myself, setMyself] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("addUser", selectedUser._id);
      socket.emit("sendMessage", {
        receiverEmail: selectedUser.email,
        text: newMessage,
      });

      // Use the functional form of setMessages to update messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: newMessage,
          sender: "user",
        },
      ]);

      setNewMessage("");
    }
  };

  useEffect(() => {
    socket.on("getMessage", (data) => {
      const newMessage = {
        text: data.text,
        sender: "other",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("getUsers", (data) => {
      console.log("getUsers ", data);
    });
  }, [socket]);

  useEffect(() => {
    if (myself?._id) {
      socket.emit("addUser", myself._id);
    }
  }, [socket, myself]);

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
                value={newMessage}
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
