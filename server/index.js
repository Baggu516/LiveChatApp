const express=require("express")
const app =express()
const http=require("http")//coz to build server with socket.io
const cors=require("cors")
// ....
const {Server} =require("socket.io")
app.use(cors())

const server=http.createServer(app)
// ....
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3002",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
console.log(socket.id);

// ....joining room...
socket.on("join_room",(data)=>{
    socket.join(data)
    console.log("join_room",data)
})
socket.on("send_msg",(data)=>{
    console.log(data,typeof data.room)
    // io.to(data.room).emit("msg",data)
    socket.broadcast.emit("msg",data)
    // io.in(data.room).emit("msg",data)
})

socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id)
})
})




server.listen(3004,()=>{
    console.log("Server is runing....")
})