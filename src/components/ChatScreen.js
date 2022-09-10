import {
  Attachment,
  Close,
  FileDownload,
  Folder,
  Send,
} from "@mui/icons-material";
import { Avatar, Fade, InputBase, Slide } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as Message from "./molecules/Message";

const ChatScreen = ({ socket }) => {
  const [msg, setMsg] = useState("");
  const { user, guest } = useParams();
  const [file, setFile] = useState(null);
  const [msgs, setMsgs] = useState([
   
  ]);

  useEffect(() => {
    if (socket) {
      socket.on("new_message", (data) => {
        if (user === data.room_id[0] && guest === data.room_id[1] || guest === data.room_id[0] && user === data.room_id[1]) {
          let new_message = {
            type: Message.Guest,
            msg: data.message,
            has_file: false,
          };
          if (data.filename) {
            new_message = {
              type: Message.Guest,
              msg: data.message,
              filename: data.filename,
              file_extension: data.file_extension,
              has_file: true,
            };
          }

          console.log(new_message);
          setMsgs((current) => [...current, new_message]);
        }
      });
    }
  }, [socket]);

  const sendMessage = () => {
    console.log(msg);
    let data = {
      room_id: [user, guest],
      message: msg,
      file,
      file_extension: file && file.type,
    };

    console.log(data);
    socket.emit("new_message", data);

    let new_message = {
      type: Message.User,
      msg: data.message,
      has_file: false,
    };
    if (data.file) {
      new_message = {
        type: Message.User,
        msg: data.message,
        filename: data.filename,
        ext: data.file_extension,
        has_file: true,
        file: data.file,
      };
    }
    setMsgs((current) => [...current, new_message]);

    setMsg("");
    setFile(null);
    document.getElementById("file_input").value = "";
    myRef.current.scrollIntoView()
    
  };


  const myRef = useRef()

    // useEffect(() => {
    //   myRef.current.scrollIntoView()
    // }, [msgs])
  
  return (
    <div className=" h-[80vh] ">
      <div className=" h-[80%] ">
        <div className=" text-black  text-center flex justify-center ">
          <div className=" w-[40px] text-[12px] rounded-md bg-teal-600 text-white mb-5 ">
            chat
          </div>
        </div>

        <div id="messages" className=" overflow-y-auto  h-[90%]">
          {msgs.map((item, index) => (
            <div key={index}>
              <item.type data={item} />
            </div>
          ))}

            <div id='scroll_to_position' ref={myRef} className=''  ></div>
        </div>
      </div>

      <div className='h-[10%]' >
        {file && (
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <div>
              <div className="text-[16px] font-semibold text-teal-500 flex items-center justify-between ">
                <div> From Me </div>

                <div className="relative top-6 right-3  ">
                  <Close
                    sx={{ color: "red", fontSize: "14px" }}
                    onClick={() => {
                      setFile(null);
                      document.getElementById("file_input").value = "";
                    }}
                  />
                </div>
              </div>
              <div className=" flex items-center justify-center bg-gray-200 py-2 space-x-4 mb-1 ">
                {file.type.substr(0,4) === "image" ? (
                  <div>
                    {" "}
                    <img
                      src={URL.createObjectURL(file)}
                      className="  w-[50px] h-[50px] bg-white rounded-lg "
                    />{" "}
                  </div>
                ) : (
                  <Folder sx={{ fontSize: "35px", color: "black" }} />
                )}

                <div>
                  <div className=" text-[14px] text-blue-800 underline ">
                    {" "}
                    {file.name}{" "}
                  </div>

                  <div className=" text-[14px] text-blue-800 ">
                    {" "}
                    {(file.size / 1000).toFixed(0)}kb{" "}
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        )}
        <div className="flex items-center justify-between ">
          <div>
            <Attachment
              sx={{ fontSize: "30px", color: "purple", cursor: "pointer" }}
              onClick={() => {
                document.getElementById("file_input").click();
              }}
            />
            <input
              type="file"
              id="file_input"
              hidden
              onChange={(e) => {
                console.log(e.target.files[0]);
                setFile(e.target.files[0]);
              }}
            />
          </div>

          <div className=" w-[80%]">
            <InputBase
              multiline={true}
              sx={{
                width: "100%",
                border: "1px solid #e5e5e5",
                pl: "4px",
                fontSize: "14px",
                height: "35px",
              }}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>

          <div>
            <div
              className=" bg-teal-600 py-1 px-2 rounded-lg w-fit cursor-pointer "
              onClick={sendMessage}
            >
              <Send sx={{ color: "white" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
