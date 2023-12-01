import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const Chat = () => {
  // State to store the messages
  const [messages, setMessages] = useState<any>([]);
  // State to store the current message
  const [currentMessage, setCurrentMessage] = useState("");
  const socketRef = useRef<any>();

  useEffect(() => {
    // Create a socket connection
    socketRef.current = io("http://localhost:3000");

    // Listen for incoming messages
    socketRef.current.on("recMessage", (message: any) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    // Clean up the socket connection on unmount
    return () => {
      socketRef.current.disconnect();
      socketRef.current.close();
    };
  }, []);

  const sendMessage = () => {
    // Send the message to the server
    socketRef.current.emit("sendMessage", currentMessage);
    // Clear the currentMessage state
    setCurrentMessage("");
  };

  return (
    <div>
      {/* Display the messages */}
      {messages.map((message: string, index: number) => (
        <p key={index}>{message}</p>
      ))}

      {/* Input field for sending new messages */}
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />

      {/* Button to submit the new message */}
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
