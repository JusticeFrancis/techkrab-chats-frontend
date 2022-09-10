import { Campaign } from '@mui/icons-material'
import { Button, InputBase } from '@mui/material'
import React, { useState } from 'react'
import SnackbarLog from './SnackbarLog'
import { io } from "socket.io-client";
import {v4 as uuidv4} from 'uuid'

const LoginModal = ({setSocket, socket, setUser,setLoader}) => {
    const [log, setLog] = useState({})
    const [open, setOpen] = useState(false);

    const login = (username) => {
        console.log(username)
        let user_id = uuidv4()
        if(username.length > 3 ){
            let data = {
                username,
                id: user_id
            }

            socket.emit('new_user', data )

            setOpen(true)

            setLog({
                severity: 'success',
                msg: 'logged in as: '+username
            } )

            setUser({
                username,
                id: user_id
            })
            setLoader(false)

            return


        }

        setOpen(true)

        setLog({
            severity: 'error',
            msg: 'username is invalid: must be greater than 3 characters '
        } )
    }


  return (
    <div className="bg-white h-[230px] h-fu border-2 border-[#e5e5e5] w-full px-6 pt-9 rounded-lg  shadow-lg shadow-bg-[#e5e5e5] absolute top-0 ">
        <SnackbarLog open={open} setOpen={setOpen} log={log}  />
    <div className="text-[12px] italic text-gray-400 leading-[4px] mb-4  " >
      <Campaign sx={{ color:'hsla(27,90%,55%,1)' }} />
      to begin chat please add a username and ask a friend to do same .... so both of you can test it out
    </div>
    <div className="text-[14px] font-semibold mb-1 ">
      {" "}
      Enter a Username{" "}
    </div>
    <InputBase
    id='username'
      sx={{
        width: "100%",
        fontSize: "14px",
        border: "1px solid #e5e5e5",
        pl: 2,
        fontWeight: 500,
        borderRadius: "5px",
      }}
    />

    <div>
      <Button
        sx={{
          bgcolor: "#00ccbb",
          color: "white",
          float: "right",
          width: "100px",
          mt: 3,
          ":hover": {
            bgcolor: "#00ccbb",
            color: "white",
          },
        }}

    onClick={ ()=> login(document.getElementById('username').value) }
      >
        Send
      </Button>
    </div>
  </div>
  )
}

export default LoginModal