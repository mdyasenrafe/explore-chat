import React from "react";

export default function UsersList({ user, setSelectedUser }) {
  return (
    <div
      className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-[#f1f1f1] rounded-md 
    transition duration-200 ease-in-out"
      onClick={() => setSelectedUser(user)}
    >
      <img
        className="w-[50px] h-[50px] rounded-full object-cover"
        src={user.photo}
        alt="avatar"
      />
      <p>{user.name}</p>
    </div>
  );
}
