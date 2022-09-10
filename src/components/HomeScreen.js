import { Announcement, Campaign, Circle, East } from "@mui/icons-material";
import { Avatar, Button, CircularProgress, InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chat from "./molecules/Chat";
import LoginModal from "./molecules/LoginModal";

const HomeScreen = ({ socket, setSocket, chats }) => {
  const [selectedChat, setSelectedChat] = useState(0);

  const [isLoading, setLoader] = useState(true);

  const [user, setUser] = useState(null);

  return (
    <div className="relative">
      <div className={isLoading && "blur-md"}>
        {chats.map(
          (item, index)=>(
            <div key={index} >
              <Chat
                initials={item.username.substr(0, 1)}
                userName={item.username}
                id={item.id}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                user_id={user && user.id }
              />
            </div>
          )
        )}
      </div>

      <div className=" absolute top-0 right-[50%]  ">
        {isLoading && user && (
          <CircularProgress thickness={1} sx={{ color: "teal" }} />
        )}
      </div>

      {isLoading && !user && (
        <LoginModal
          setSocket={setSocket}
          socket={socket}
          setUser={setUser}
          setLoader={setLoader}
        />
      )}
    </div>
  );
};

export default HomeScreen;

function getCookie(name) {
  var cname = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}
