import { useEffect, useState } from 'react';
import io from 'socket.io-client';


const socket = io('http://localhost:3001');
function App() {
  const [messages, setMessages] = useState([]);
  const [socketId, setSocketId] = useState("")

  const [to, setTo] = useState("")


  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log("sending msg");
    setMessages(prevMessages => [...prevMessages, "sent msg:: " + e.target.msg.value]);
    socket.emit("message-from-client", e.target.msg.value, to);
  }

  useEffect(() => {
    // Listen for the 'connect' even
    console.log("aaa");
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      console.log('Socket ID:', socket.id);
      setSocketId(socket.id)
    });

  }, []);



  useEffect(() => {
    // setSocketId(socket.id)
    socket.on("message-from-server", (msg) => {
      setMessages(prevMessages => [...prevMessages, "received msg:: " + msg]);
    })
    return () => {
      socket.off('message-from-server')
    }
  },)


  return (
    <div>
      <h6>userid: {socketId}</h6>
      <span>receiver address</span>
      <input onChange={(e) => setTo(e.target.value)} type="text" placeholder='enter receiver address' />


      <form onSubmit={handleSendMessage}>

        <input id='msg' name='msg' type="text" placeholder='enter your message' />
        <button type='submit'>Connect to server using websocket</button>

        {messages && messages.map((msg, key) => {
          return (
            <div className="" key={key}>
              {msg}
            </div>
          )
        })}
      </form>
    </div>
  );
}

export default App;
