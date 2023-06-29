import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your server URL

function App() {

  const handleConnectWebsocket = async () => {
    // socket.emit("connection", "my message from client")
  }

  return (
    <div >
      <button onClick={handleConnectWebsocket}>Connect to server using websocket</button>
    </div>
  );
}

export default App;
