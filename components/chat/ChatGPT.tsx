import React, { useState } from "react";
import axios from "axios";

const apiKey = "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";
const endpoint = "https://chat.openai.com/backend-api/moderations";

const sendMessageToChatGPT = async (message: string) => {
  try {
    const response = await axios.post(
      endpoint,
      {
        messages: [
          { role: "system", content: "You are a user" },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    console.log("ChatGPT reply:", reply);
  } catch (error) {
    console.error("Error:", error);
  }
};

const ChatComponent = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    sendMessageToChatGPT(inputText);
  };

  return (
    <div>
      <div>
        <h1>ChatGPT Demo</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputText} onChange={handleInputChange} />
          <button type="submit">Send</button>
        </form>
      </div>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatComponent;
