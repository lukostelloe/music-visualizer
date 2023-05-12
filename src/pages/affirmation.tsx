"use-client";
import React from "react";
import "../app/globals.css";
import useState from "react-usestateref";

enum Creator {
  Me = 0,
  Bot = 1,
}

interface MessageProps {
  text: string;
  from: Creator;
  key: number;
}

interface InputProps {
  onSend: (input: string) => void;
  disabled: boolean;
}

const ChatMessage = ({ text, from }: MessageProps) => {
  return (
    <div>
      {from == Creator.Me && (
        <div className="flex items-center  bg-white-100 whitespace-pre-wrap">
          <p className="bg-green-400 p-2 m-5 rounded-sm">User</p>
          <p>{text}</p>
        </div>
      )}
      {from == Creator.Bot && (
        <div className="flex items-center  bg-white-100 whitespace-pre-wrap">
          <p className="bg-blue-400 p-2 m-5 rounded-sm">ChatBot</p>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

const ChatInput = ({ onSend, disabled }: InputProps) => {
  const [input, setInput] = useState("");
  const sendInput = () => {
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      sendInput();
    }
  };

  return (
    <input
      value={input}
      onChange={(e: any) => setInput(e.target.value)}
      type="text"
      placeholder="ask me anything"
      disabled={disabled}
      onKeyDown={(e) => handleKeyDown(e)}
      className="text-black p-2 m-5 rounded-sm"
    />
  );
};

export default function Affirmation() {
  const [messages, setMessages, messagesRef] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (input: string) => {
    setLoading(true);

    const myMessage: MessageProps = {
      text: input,
      from: Creator.Me,
      key: new Date().getTime(),
    };

    setMessages([...messagesRef.current, myMessage]);
    const response = await fetch("/api/generate-answer", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    }).then((response) => response.json());
    setLoading(false);

    if (response.text) {
      const botMessage: MessageProps = {
        text: response.text,
        from: Creator.Bot,
        key: new Date().getTime(),
      };
      setMessages([...messagesRef.current, botMessage]);
    } else {
      //show error
    }
  };

  return (
    <div className="flex flex-col justify-center ">
      <h1>CHATBOT</h1>
      <div>
        <ChatInput onSend={(input) => callApi(input)} disabled={loading} />
      </div>
      <div>
        {messages.map((msg: MessageProps) => (
          <ChatMessage key={msg.key} text={msg.text} from={msg.from} />
        ))}
        {messages.length == 0 && <p>I am at your service</p>}
      </div>
    </div>
  );
}
