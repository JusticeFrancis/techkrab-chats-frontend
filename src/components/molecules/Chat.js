import { Circle, East } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


const Chat = ({ selectedChat, setSelectedChat, userName, id, initials,user_id }) => {
  const navigate = useNavigate();
  return (
    <div
      className={selectedChat === id ? selectedMsgStyle : unSelectedMsgStyle}
      onClick={() => {
        setSelectedChat(id);
        navigate("/chat/"+ user_id+"/"+id);
      }}
    >
      <Avatar>{initials}</Avatar>
      <div className=" w-full ">
        <div className=" flex items-center justify-between w-full ">
          <div className=" text-[16px] "> {userName}</div>
          <div>
            <East
              id="icon1"
              sx={
                selectedChat === id
                  ? {
                      fontSize: "14px",
                      color: "teal",
                    }
                  : {
                      fontSize: "14px",
                      color: "gray",
                    }
              }
            />
          </div>
        </div>
        <div className=" text-sm flex items-center ">
          <div>
            {" "}
            <Circle
              sx={{
                color: "green",
                fontSize: "8px",
                position: "relative",
                bottom: 1,
                mr: "2px",
              }}
            />
          </div>
          <div>online</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

const unSelectedMsgStyle =
  "flex items-center space-x-2 w-full px-2 py-1 cursor-pointer hover:bg-gray-50 mb-2 ";
const selectedMsgStyle =
  "flex items-center space-x-2 w-full border-[1.5px] rounded-[8px] border-teal-500 px-2 py-1 cursor-pointer mb-2";
