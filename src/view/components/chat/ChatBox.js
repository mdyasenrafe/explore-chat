// import React from "react";

// export default function ChatBox({ selectedUser }) {
//   return (
//     <div>
//       {selectedUser ? (
//         <div>
//           <div className="sticky top-0 z-10 bg-white shadow">
//             <div className="flex items-center p-2">
//               <img
//                 className="w-[50px] h-[50px] rounded-full object-cover"
//                 src={selectedUser.photo}
//                 alt="avatar"
//               />
//               <p className="ml-2">{selectedUser.name}</p>
//             </div>
//           </div>
//           {/* messaage container new message will start from bottom */}
//           <div className="p-2 overflow-y-scroll h-[80vh] flex flex-col-reverse">

//           </div>
//           {/* message input */}
//           <div className="flex items-center p-2">
//             <input
//               type="text"
//               placeholder="Type a message"
//               className="flex-1 border border-[#e1e1e1] rounded-full py-2 px-4 focus:outline-none"
//             />
//             <button className="text-[#3c7fff]">Send</button>
//           </div>
//         </div>
//       ) : (
//         <div className="h-[100vh] flex items-center justify-center">
//           <p className="text-[#3c7fff] text-xl">Select a user to start chat</p>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";

const Chatbox = ({ selectedUser }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hello",
      sender: "user",
    },
    {
      text: "Hi",
      sender: "other",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
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
