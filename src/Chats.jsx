import React,{useEffect, useState} from 'react'
import "./chat.css";
import ScrollTobBottom from "react-scroll-to-bottom"
const Chats = ({socket,name,room}) => {
    const [currentmsg,setCurrentMsg]=useState("")
    const [msglist,setMsgList]=useState([])
    const SendMsg=async()=>{
        if(currentmsg!==""){
            const data={
                room:room,
                name:name,
                currentmsg:currentmsg,
                time:new Date(Date.now()).getHours() + ":"+new Date(Date.now()).getMinutes() 
            }
            await socket.emit("send_msg",data)
            setMsgList((prev)=>([...prev,data]))
            setCurrentMsg("")
        }

    }
    useEffect(()=>{
        console.log("useeffcet")
      socket.on("msg",(data)=>{
        setMsgList((prev)=>{
            if(prev.includes(data)) return [...prev]
            else return [...prev,data]
        })
        console.log("recieve data",data)
      })
    },[socket])
  return (
    <div>
        <div className='chat-header'>
            Live Chat
        </div>
        <div className="chat-body">
            <ScrollTobBottom className='scroll-container'>
          {msglist&&msglist.map((item,i)=>{
            return (
                <div className='msg-container' id={item.name===name?"you":"others"} key={i}>
                    <div className='msg-content'>
                        <p>{item.currentmsg} </p>
                    </div>
                    <div className='msg-info'>
                        <p >{item.time}</p>
                        <p ><b>{item.name}</b></p>
                    </div>
                </div>
            )
          })}
          </ScrollTobBottom>
        </div>
        <div className="chat-footer">
            <input type="text" placeholder='enter msg..' value={currentmsg} onChange={(e)=>setCurrentMsg(e.target.value)} onKeyPress={(e)=>{e.key=="Enter" && SendMsg()}}/>
            <button onClick={SendMsg}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chats