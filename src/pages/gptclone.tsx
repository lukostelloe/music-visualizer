"use-client";
import React from "react";
import "../app/globals.css";
import useState from "react-usestateref";
import sendMessageIcon from "../../public/static/icons/sendMessageIcon.svg";
import Image from "next/image";
import gpt_User from "../../public/static/icons/gpt_User.png";
import gpt_AI from "../../public/static/icons/gpt_AI.png";
import copyIcon from "../../public/static/icons/copyIcon.svg";
import editIcon from "../../public/static/icons/editIcon.svg";
import thumbUpIcon from "../../public/static/icons/thumbUpIcon.svg";
import thumbDownIcon from "../../public/static/icons/thumbDownIcon.svg";

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

// const ChatMessage = ({ text, from }: MessageProps) => {
//   return (
//     <div>
//       {from == Creator.Me && (
//         <div className="flex items-center whitespace-pre-wrap bg-gpt-USER-message-area-gray">
//           <p className="bg-green-400 p-2 m-5 rounded-sm">
//             <Image src={gpt_User} alt="gpt_USER" width={40} height={40} />
//           </p>
//           <p>{text}</p>
//         </div>
//       )}
//       {from == Creator.Bot && (
//         <div className="flex items-center whitespace-pre-wrap bg-gpt-AI-message-area-gray">
//           <p className="bg-blue-400 p-2 m-5 rounded-sm">
//             <Image src={gpt_AI} alt="gpt_AI" width={40} height={40} />
//           </p>
//           <p>{text}</p>
//         </div>
//       )}
//     </div>
//   );
// };
const ChatMessageTest = () => {
  return (
    <div>
      {/* copy and paste this to make fake input */}
      <div className="flex items-center whitespace-pre-wrap bg-gpt-USER-message-area-gray p-5 px-20">
        <div className="w-full flex justify-start">
          <Image
            src={gpt_User}
            alt="gpt_USER"
            width={30}
            height={30}
            className="mr-6"
          />
          <div>
            <p>I am the user</p>
          </div>
        </div>
        <button className="p-1 hover:bg-gpt-AI-message-area-gray mr-10 rounded-md">
          <Image src={editIcon} alt="editIcon" width={17} height={17} />
        </button>
      </div>

      <div className="flex items-center whitespace-pre-wrap bg-gpt-AI-message-area-gray p-5 px-20">
        <div className="w-full flex justify-start">
          <Image
            src={gpt_AI}
            alt="gpt_AI"
            width={30}
            height={30}
            className="mr-6"
          />
          <p>I am the bot</p>
        </div>
        <button className="p-1 hover:bg-gpt-USER-message-area-gray hover: rounded-md">
          <Image src={copyIcon} alt="copyIcon" width={17} height={17} />
        </button>
        <button className="p-1 hover:bg-gpt-USER-message-area-gray rounded-md">
          <Image src={thumbUpIcon} alt="thumbUp" width={17} height={17} />
        </button>
        <button className="p-1 hover:bg-gpt-USER-message-area-gray rounded-md">
          <Image src={thumbDownIcon} alt="thumbDown" width={17} height={17} />
        </button>
      </div>
      {/* to here */}
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
    <div className="flex rounded-md w-full">
      <input
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
        type="text"
        placeholder="Send a message"
        disabled={disabled}
        onKeyDown={(e) => handleKeyDown(e)}
        className="text-black p-3 bg-gpt-message-box-gray outline-none flex-grow"
      />
      <div className="flex bg-gpt-message-box-gray justify-center items-center pr-2 cursor-pointer hover:">
        <button className="hover:bg-gpt-USER-message-area-gray rounded-md">
          <Image
            src={sendMessageIcon}
            alt="sendMessageIcon"
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  );
};

const SideBarNewChat = () => {
  return (
    <>
      <button className="border border-rgba-white-20 p-2 m-2 rounded-md hover:bg-gpt-AI-message-area-gray transition-all duration-30 ease-in">
        + new chat
      </button>
    </>
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
    <div className="flex flex-row justify-center ">
      <div className="h-screen w-1/4 bg-gpt-sidebar-dark-gray overflow-hidden">
        <SideBarNewChat />
      </div>
      <div
        className="h-scre
      en flex-1 overflow-y-auto"
      >
        <h3 className="flex  justify-center bg-gpt-message-box-gray p-2 text-gpt-info-text-gray">
          Model: Default (GPT-3.5)
        </h3>
        {/* <div>
          {messages.map((msg: MessageProps) => (
            <ChatMessage key={msg.key} text={msg.text} from={msg.from} />
          ))}
          {messages.length == 0 && <p>I am at your service</p>}
        </div> */}
        <div>
          <ChatMessageTest />
        </div>
        <div className="fixed inset-x-0 bottom-0 flex items-center justify-center p-8 pb-10">
          <ChatInput onSend={(input) => callApi(input)} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
