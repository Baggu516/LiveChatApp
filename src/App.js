import './App.css';
import React,{useState} from "react"
import Chats from './Chats';
import io from "socket.io-client"
const socket=io.connect("http://localhost:3004")
function App() {
const [name,setName]=useState("")
const [room,setRoom]=useState("")
const [show,setShow]=useState(false)
const JoinRoom=()=>{
  setShow(true)
if(name!=="" && room!==""){
  socket.emit("join_room",name)
}
}
  return (
    <div className="App">
      {!show?(
      <div className='inputandbutton'>
      <h2>Join A Chat</h2>
      <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="text" placeholder="room Id"value={room} onChange={(e)=>setRoom(e.target.value)} />
      <button onClick={JoinRoom}>Join Chat</button>
      </div>)
         :(
      <div className='chat'>
      <Chats socket={socket} name={name} room={room}/>
      </div>
      )}
    </div>
  );
}

export default App;
