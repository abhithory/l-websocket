import { useEffect, useState } from 'react';
import io from 'socket.io-client';


const socket = io('http://localhost:3001'); 
function App() {
  const [messages, setMessages] = useState([]);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log("sending msg");
    setMessages(prevMessages => [...prevMessages, "sent msg:: " + e.target.msg.value]);
    socket.emit("message-from-client", e.target.msg.value);
  }


  
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
      <form onSubmit={handleSendMessage}>

        <br />
        <h6>{socket?.id}</h6>
        <br />
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
