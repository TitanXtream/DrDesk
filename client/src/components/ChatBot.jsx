import React, { useRef, useState } from "react";
import "../styles/style.css";
import chatBotIcon from "../assets/chatbox-icon.svg";
import { IoChatbubbles } from "react-icons/io5";

const ChatBot = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const chatBoxRef = useRef(null);
  //   chatbox.display();

  const chatbox = new ChatboxClass();

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(chatBoxRef);
    chatbox.onSendButton();
  };

  return (
    <div className="container">
      <div className="chatbox">
        <div
          className={`chatbox__support ${isBoxOpen && "chatbox--active"}`}
          ref={chatBoxRef}
        >
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img
                src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                alt="header"
              />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">Dr.Desk</h4>
              <p className="chatbox__description--header">
                Hi. This is Dr.Desk . How can I help you?
              </p>
            </div>
          </div>
          <div className="chatbox__messages">
            <div></div>
          </div>
          <form className="chatbox__footer">
            <input type="text" placeholder="Write a message..." />
            <button
              className="chatbox__send--footer send__button"
              onClick={sendMessage}
            >
              Send
            </button>
          </form>
        </div>
        <div className="chatbox__button">
          <button onClick={() => setIsBoxOpen((state) => !state)}>
            {/* <img src={chatBotIcon} alt="" /> */}
            <IoChatbubbles />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

class ChatboxClass {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };

    this.state = false;
    this.messages = [];
  }

  onSendButton() {
    const chatbox = this.args.chatBox;
    console.log(chatbox);
    var textField = chatbox.querySelector("input");

    let text1 = textField.value;
    if (text1 === "") {
      return;
    }

    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    fetch(`${process.env.REACT_APP_CHAT_BOT_SERVICE_API_KEY}/predict`, {
      method: "POST",
      body: JSON.stringify({ message: text1 }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        let msg2 = { name: "Sam", message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = "";
        setTimeout(() => {}, [5000]);
      })
      .catch((error) => {
        console.error("Error:", error);
        this.updateChatText(chatbox);
        textField.value = "";
      });
  }

  updateChatText(chatbox) {
    var html = "";
    this.messages
      .slice()
      .reverse()
      .forEach(function (item, index) {
        if (item.name === "Sam") {
          html +=
            '<div class="messages__item messages__item--visitor">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }
      });

    const chatmessage = chatbox.querySelector(".chatbox__messages");
    chatmessage.innerHTML = html;
  }
}
