import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import ChatScreen from "./components/ChatScreen";
import HomeScreen from "./components/HomeScreen";




const Main = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [chats, setChats] = useState([])


  const handleClickVariant = (variant)=>(msg) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  const [socket, setSocket] = useState(null)
  useEffect(() => {
    
    setSocket(io.connect('https://techkrab-socket-backend-production.up.railway.app'))
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('new_user',(data)=>{
        console.log(data)
        handleClickVariant('success')(data.username+' is online')()
        setChats(current=>[data,...current] )
      })
    }
  }, [socket]);
  
  return (
   
      
      <div className=" flex justify-center ">
      <div className="lg:w-[400px] w-full ">
        <div className=" bg-gray-200 h-[50px] text-center pt-2 mb-6">
          Teckrab's socket chat
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen socket={socket} setSocket={setSocket} chats={chats} />} />
            <Route path="/chat/:user/:guest" element={<ChatScreen socket={socket} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Main;
